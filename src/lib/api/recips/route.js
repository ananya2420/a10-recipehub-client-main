export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    // Fetch from MongoDB
    const recips = await db.collection("recips").find(query).toArray();
    return Response.json(recips);
}