import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export async function GET(request) {
  const url = request.url.startsWith("http")
    ? new URL(request.url)
    : new URL(request.url, "http://localhost");
  const search = url.searchParams.get("search");
  const category = url.searchParams.get("category");

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category) {
    const categories = category
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (categories.length > 1) {
      query.category = { $in: categories };
    } else if (categories.length === 1) {
      query.category = categories[0];
    }
  }

  await client.connect();
  const recips = await db.collection("recips").find(query).toArray();

  return Response.json(recips);
}
