import type { dataFields } from "./types";
import {
  FINSCANN_TEST_API,
  ORGANIZATIONNAME,
  PASSWORD,
  USERNAME,
} from "~/constants";

export async function processData(data: string | File): Promise<any> {
  let result = [];
  if (typeof data === "string") {
    result = await checkNameFinscan(data);
  } else {
    let namesArray = [];
    if (data.type === "text/csv") {
      namesArray = processCSVFile(data);
    } else if (data.type === "text/xml") {
      namesArray = processXMLFile(data);
    } else {
      namesArray = processDTAFile(data);
    }

    namesArray.forEach(async (name) => {
      const res = await checkNameFinscan(name);
      result.push(res);
    });
  }
  return result;
}

function processCSVFile(File: File): Array<string> {
  return [];
}

function processXMLFile(File: File): Array<string> {
  return [];
}

function processDTAFile(File: File): Array<string> {
  return [];
}

async function checkNameFinscan(nameLine: string): Promise<any> {
  const clientId =
    "WEB-" +
    new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);

  const userName = USERNAME;
  const password = PASSWORD;
  const organizationName = ORGANIZATIONNAME;

  const data: Partial<dataFields> = {
    clientId,
    nameLine,
    userName,
    password,
    organizationName,
  };

  const dataJSON = JSON.stringify(data);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(FINSCANN_TEST_API, {
    method: "POST",
    headers: myHeaders,
    body: dataJSON,
  });

  console.log(await response.json());
  return null;
}
