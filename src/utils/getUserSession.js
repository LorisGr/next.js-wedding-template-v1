export default async function getUserSession(client, session) {
  const dbUserAccount = client.db(process.env.NEXT_PUBLIC_USER_ACCOUNT_DB_NAME);
  const sessionCollection = dbUserAccount.collection(
    process.env.NEXT_PUBLIC_SESSION_COLLECTION_NAME
  );

  const userSession = await sessionCollection.findOne({ sessionId: session });

  if (!userSession || userSession.sessionId !== session) {
    throw new Error(
      "User session not found or session ID does not match cookie."
    );
  }

  return userSession;
}
