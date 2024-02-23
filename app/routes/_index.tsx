import Filters from '~/components/Filters';
import { type V2_MetaFunction, type LoaderArgs, redirect} from '@remix-run/node';
import { Form,   useRouteError, isRouteErrorResponse, useLoaderData} from "@remix-run/react";
import { getSession} from './sessions';
import LogoutButton  from '~/components/LogoutButton';
import { getEmployees} from "~/utils/claims";

export async function loader({ request} : LoaderArgs) {

    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (!session.has("login")) {
        console.log("No cookie")
        return redirect('/login');        
    }

    else {
        let employees = null
        if (session.has("profile") && session.get("profile") === "999"){
        employees = await getEmployees()
        } 
        let profile = session.get("profile")
        let user = session.get("user")
        let error = session.get("error")
        
        return {
            profil: profile,
            user: user,
            data : {
                error: error,
                workers: employees 
            }
        }
        
    }
    

}


export const meta: V2_MetaFunction = () => [{ title: "Akten Pro Mitarbeiter" }];

export default function Dashboard() {
    const data =  useLoaderData<typeof loader>()
    return(
        <>       
                 <LogoutButton/>     
                 <Form method='GET' action='/results'>
                    <Filters data={data}/>
                 </Form>
                

        </>
          
    )
}


export function ErrorBoundary() {
    const error = useRouteError();
if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }
}
