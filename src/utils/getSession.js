import { getCookie } from "cookies-next";

export default function getSession(req, res) {
  const session = getCookie("session", { req, res });

  if (!session) {
    // If no session found, redirect to login page
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
  }

  console.log("session", session);

  return session;
}
