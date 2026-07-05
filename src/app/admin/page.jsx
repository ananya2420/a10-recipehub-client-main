import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";
import AdminDashboard from "../components/AdminDashboard";

const client = new MongoClient(process.env.MONGO_DB_URI);

async function getUserCollection() {
  if (!process.env.MONGO_DB_URI) return null;

  try {
    await client.connect();
    const db = client.db(process.env.AUTH_DB_NAME || "recipehub_db");
    const collections = new Set(
      (await db.listCollections({}, { nameOnly: true }).toArray()).map((item) => item.name)
    );

    for (const name of ["users", "user"]) {
      if (collections.has(name)) {
        return db.collection(name);
      }
    }

    return null;
  } catch (error) {
    console.error("Admin user collection error:", error);
    return null;
  }
}

async function getAdminStats() {
  if (!process.env.MONGO_DB_URI) {
    return {
      totalUsers: 0,
      totalRecipes: 0,
      premiumMembers: 0,
      pendingReports: 0,
      transactions: 0,
    };
  }

  try {
    await client.connect();
    const db = client.db(process.env.AUTH_DB_NAME || "recipehub_db");
    const collections = new Set(
      (await db.listCollections({}, { nameOnly: true }).toArray()).map((item) => item.name)
    );

    const getCollection = (candidateNames) => {
      for (const name of candidateNames) {
        if (collections.has(name)) {
          return db.collection(name);
        }
      }
      return null;
    };

    const userCollection = getCollection(["users", "user"]);
    const recipeCollection = getCollection(["recips", "recipes"]);
    const reportCollection = getCollection(["reports", "report"]);
    const transactionCollection = getCollection(["transactions", "transaction"]);

    const totalUsers = userCollection ? await userCollection.countDocuments({}) : 0;
    const premiumMembers = userCollection ? await userCollection.countDocuments({ isPremium: true }) : 0;
    const totalRecipes = recipeCollection ? await recipeCollection.countDocuments({}) : 0;
    const pendingReports = reportCollection ? await reportCollection.countDocuments({ status: { $in: [null, "pending", "open"] } }) : 0;
    const transactions = transactionCollection ? await transactionCollection.countDocuments({}) : 0;

    return {
      totalUsers,
      totalRecipes,
      premiumMembers,
      pendingReports,
      transactions,
    };
  } catch (error) {
    console.error("Admin stats fetch error:", error);
    return {
      totalUsers: 0,
      totalRecipes: 0,
      premiumMembers: 0,
      pendingReports: 0,
      transactions: 0,
    };
  }
}

export default async function AdminPage() {
  try {
    const nextHeaders = await headers();
    const headersObject = {};

    if (typeof nextHeaders.entries === "function") {
      for (const [key, value] of nextHeaders.entries()) {
        headersObject[key] = value;
      }
    } else if (typeof nextHeaders.forEach === "function") {
      nextHeaders.forEach((value, key) => {
        headersObject[key] = value;
      });
    }

    const session = await auth.api.getSession({ headers: headersObject });
    const email = session?.user?.email;
    const userCollection = await getUserCollection();
    let isAdmin = session?.user?.role === "admin";

    if (!isAdmin && email && userCollection) {
      const adminUser = await userCollection.findOne({ email });
      isAdmin = adminUser?.role === "admin";
    }

    const stats = await getAdminStats();
    return <AdminDashboard stats={stats} isAdmin={isAdmin} />;
  } catch (error) {
    console.error("Admin page error:", error);
    const stats = await getAdminStats();
    return <AdminDashboard stats={stats} isAdmin={false} />;
  }
}