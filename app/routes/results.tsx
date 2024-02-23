import {
  
  type LoaderArgs,
  type V2_MetaFunction,
  redirect, json
} from "@remix-run/node";
import { getSession } from "./sessions";
import ResultTable from "~/components/ResultTable";
import { getEditedClaims, getNewClaims } from "~/utils/claims";
import { useLoaderData } from "@remix-run/react";
import RetryButton from "~/components/RetryButton";
import LogoutButton from "~/components/LogoutButton";
import { Card, Text, CardBody,Box, Center } from '@chakra-ui/react' 
function formatDate(date: string) {
  let newDate = date.split("-");
  return `${newDate[2]}.${newDate[1]}.${newDate[0]}`;
}

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("login")) {
    return redirect("/login");
  }

  let url = new URL(request.url);
  let searchParams = url.searchParams;

  if (
    searchParams.has("process") &&
    searchParams.has("status") &&
    searchParams.has("product") &&
    searchParams.has("startDate") &&
    searchParams.has("endDate") &&
    searchParams.has("type") &&
    searchParams.has("ma")
  ){ 
    let process = url.searchParams.get("process") as string;
    let status = url.searchParams.get("status") as string;
    let startDate = url.searchParams.get("startDate") as string;
    let endDate = url.searchParams.get("endDate") as string;
    let type = url.searchParams.get("type") as string;
    let product = url.searchParams.get("product") as string;
    let ma = url.searchParams.get("ma") as string;
    let login = session.get("user") as string;
    product = '%' + product + '%';

    startDate ? (startDate = formatDate(startDate)) : (startDate = "");
    endDate ? (endDate = formatDate(endDate)) : (endDate = "");

    try {
    let response;
    if (process === "0") {
      response = await getEditedClaims({login, status, type, startDate, endDate, product,ma});
    } else {
      response = await getNewClaims({login, status, type, startDate, endDate, product,ma});
    }
    console.log("here:", response);
    return response;
        
      } catch (err: any) {
       throw json({ message: "Sorry we could not process your search." });
      }
    }

  return null;
}

export const meta: V2_MetaFunction = () => [{ title: "Akten data" }];

export default function Results() {
  const data = useLoaderData<typeof loader>();
  console.log("last step", data);
  return (
    <>
      <Box pl="5rem" pr="5rem" pt="1rem">
      <LogoutButton />
      <RetryButton />
      {Array.isArray(data) ? (
        <ResultTable claims={data}></ResultTable>
      ) : (
        <Box pl="7rem" pr="7rem" pt="4rem">
            <Card>
                <CardBody>
                    <Center>
                        <Text fontSize='xl'>{data}</Text>
                    </Center>
                </CardBody>
            </Card>
        </Box>
      )}
      </Box>
    </>
  );
}
