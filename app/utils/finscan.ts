import { parse } from "csv-parse/sync";
import type { APIResponse, DataFields } from "./types";
import {
  APPLICATIONID,
  FINSCANN_TEST_API,
  ORGANIZATIONNAME,
  PASSWORD,
  USERNAME,
} from "~/constants";

export async function processData(
  data: string | File
): Promise<Partial<APIResponse> | Array<Partial<APIResponse>> | null> {
  if (typeof data === "string") {
    return await checkNameFinscan(data);
  } else {
    if (data.type === "text/csv") {
      const searchNames = await processCSVFile(data);
      let results: Array<Partial<APIResponse>> = [];
      const dataCollectionPromises = searchNames.map(async (searchName) => {
        const data: Partial<APIResponse> = await checkNameFinscan(searchName);
        results.push(data);
      });
      await Promise.allSettled(dataCollectionPromises);
      return results;
    }
  }
  return null;
}

async function processCSVFile(file: File): Promise<Array<string>> {
  const fileContent = await file.text();
  const names = parse(fileContent, {
    delimiter: ";",
    from_line: 1,
  });

  const namesColumnData: string[] = names.map((name: string[]) => name[2]);

  return namesColumnData;
}

function extractSpecificData(apiResponse: APIResponse): Partial<APIResponse> {
  const extractedData = {
    status: apiResponse.status,
    message: apiResponse.message,
    returned: apiResponse.returned,
    searchResults: apiResponse?.searchResults.map((result) => ({
      searchName: result.searchName,
      clientId: result.clientId,
      clientName: result.clientName,
      searchMatches: result?.searchMatches?.map((match) => ({
        listName: match.listName,
        displayLine: match.displayLine,
        dynamicFields: {
          listParentSingleStringName:
            match?.dynamicFields?.listParentSingleStringName,
          listSingleStringType: match?.dynamicFields?.listSingleStringType,
          listGender: match?.dynamicFields?.listGender,
          listAliases: match?.dynamicFields?.listAliases,
          listCategory: match?.dynamicFields?.listCategory,
          listPEPCategory: match?.dynamicFields?.listPEPCategory,
          listCountries: match?.dynamicFields?.listCountries,
          listCitizenships: match?.dynamicFields?.listCitizenships,
          listDOBs: match?.dynamicFields?.listDOBs,
        },
        fnsCategories: match.fnsCategories,
      })),
    })),
  };

  return extractedData;
}

export async function checkNameFinscan(
  nameLine: string
): Promise<Partial<APIResponse>> {
  const clientId =
    "WEB-" +
    new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14) +
    Math.random();

  const userName = USERNAME;
  const password = PASSWORD;
  const organizationName = ORGANIZATIONNAME;
  const applicationId = APPLICATIONID;

  const data: DataFields = {
    clientId,
    nameLine,
    userName,
    password,
    organizationName,
    applicationId,
    lists: [],
    searchType: 4,
    clientStatus: 0,
    gender: "",
    alternateNames: [],
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    addressLine4: "",
    addressLine5: "",
    addressLine6: "",
    addressLine7: "",
    specificElement: "",
    clientSearchCode: 0,
    returnComplianceRecords: 0,
    addClient: 0,
    sendToReview: 1,
    userFieldsSearch: [],
    updateUserFields: 0,
    userField1Label: "",
    userField1Value: "",
    userField2Label: "",
    userField2Value: "",
    userField3Label: "",
    userField3Value: "",
    userField4Label: "",
    userField4Value: "",
    userField5Label: "",
    userField5Value: "",
    userField6Label: "",
    userField6Value: "",
    userField7Label: "",
    userField7Value: "",
    userField8Label: "",
    userField8Value: "",
    comment: "",
    passthrough: "",
    customStatus: [],
    returnCategory: 0,
    returnSourceLists: 0,
    generateclientId: 0,
    skipSearch: 0,
    processUBO: 0,
    UBO_Id: "",
  };

  const dataJSON = JSON.stringify(data);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(FINSCANN_TEST_API, {
    method: "POST",
    headers: myHeaders,
    body: dataJSON,
  });

  const responseData = (await response.json()) as APIResponse;

  const results = extractSpecificData(responseData);

  if (responseData.status === 0 && responseData.returned === 0)
    return {
      clientId: nameLine,
      status: responseData.status,
      message: responseData.message,
      returned: responseData.status,
    };
  //Lookup PASSED, No Records Found
  else return results; // Lookup PASSED, Records are in the Database
}
