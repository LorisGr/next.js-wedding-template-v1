import connectPromise from "../../lib/mongodb";

export default async function connectToMongoDB() {
  // Connect with MongoDB
  const client = await connectPromise;
  const isConnected = await client.isConnected();

  if (!isConnected) {
    console.log("MongoDB client is not connected");
    throw new Error(
      "Oops! Something went wrong with Database. Please try again later."
    );
  }

  return client;
}
