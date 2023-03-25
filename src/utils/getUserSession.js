export default async function getUserSession(client, session) {
  const dbUserAccount = client.db(process.env.NEXT_PUBLIC_USER_ACCOUNT_DB_NAME);
  const sessionCollection = dbUserAccount.collection(
    process.env.NEXT_PUBLIC_SESSION_COLLECTION_NAME
  );

  const userSession = await sessionCollection.findOne({ sessionId: session });

  if (!userSession || userSession.sessionId !== session) {
    console.log(
      "User session not found or session ID does not match cookie."
    );
    throw new Error(
        "Oops! We were unable to find your. Please try logging in again."
    );
  }

  return userSession;
}
