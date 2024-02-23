// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; 
import { SESSION_SECRET } from "~/constants";

export type SessionData = {
    login: number,
    loginUsername: string,
    profile:string,
    user:string,
    error:null|string

};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>(
    {
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge:  60 * 60 * 24 * 60,
        path: "/",
        sameSite: "lax",
        secrets:[SESSION_SECRET],
        secure: true,
        
      },
    }
  );


export { getSession, commitSession, destroySession };

