import connectPromise from "../../lib/mongodb";
import { deleteCookie } from "cookies-next";

export default async function handler(req, res) {

  try {
    // Connect with MongoDB
    const client = await connectPromise;
    const isConnected = client.isConnected();

    const { username, sessionId } = req.body;

    console.log(username, sessionId);

    if (!isConnected) {
      throw new Error("MongoDB client is not connected");
    }

    const db = client.db("userAccount");

    const sessionCollection = db.collection("session");


    // Check sessionsId exists
    const existingSession = await sessionCollection.findOne({ sessionId });

    if (!existingSession) {
      return res
        .status(401)
        .json({ success: false, message: "Session not found" });
    }

    const successDeleteSession = await sessionCollection.deleteOne({
      sessionId,
    });

    if (successDeleteSession) {
      console.log("DeleteSession success");
    }
    

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
