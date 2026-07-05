import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export async function GET(request, { params }) {
  const { id } = params;

  await client.connect();
  const recipe = await db.collection("recips").findOne({ _id: new ObjectId(id) });

  if (!recipe) {
    return new Response(JSON.stringify({ error: "Recipe not found" }), { status: 404 });
  }

  return Response.json(recipe);
}
