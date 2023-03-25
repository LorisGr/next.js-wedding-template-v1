export default async function fetchData(client) {
  // Fetch data from MongoDB
  const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);
  const collection = db.collection(process.env.NEXT_PUBLIC_COLLECTION_NAME);
  const data = await collection.find({}).toArray();

  if (!data || data.length === 0) {
    console.error("Data not found");
    throw new Error(
      "Oops! Something went wrong. Data not found Please try again later."
    );
  }

  // fix error serialized to JSON, MongoDB return _id property as object not STRING
  const jsonData = data.map((item) => {
    item._id = item._id.toString();
    return item;
  });

  return jsonData;
}
