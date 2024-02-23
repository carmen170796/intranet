import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession, destroySession } from './sessions';

export async function action({ request }: ActionArgs) {
  console.log('here')
  const session = await getSession(
    request.headers.get("Cookie")
);

  if (session.has("login") && session.get("login") != null ) {
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session)
      },
    })   
  }
  
}

export async function loader () {
  return redirect("/login")
}