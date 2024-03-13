export type DataFields = {
  organizationName: string | null | undefined;
  userName: string | null | undefined;
  password: string | null | undefined;
  applicationId: string | null | undefined;
  lists: Array<any> | null | undefined;
  searchType: number | null | undefined;
  clientId: string | null | undefined;
  clientStatus: number | null | undefined;
  gender: string | null | undefined;
  nameLine: string | null | undefined;
  alternateNames: Array<any> | null | undefined;
  addressLine1: string | null | undefined;
  addressLine2: string | null | undefined;
  addressLine3: string | null | undefined;
  addressLine4: string | null | undefined;
  addressLine5: string | null | undefined;
  addressLine6: string | null | undefined;
  addressLine7: string | null | undefined;
  specificElement: string | null | undefined;
  clientSearchCode: number | null | undefined;
  returnComplianceRecords: number | null | undefined;
  addClient: number | null | undefined;
  sendToReview: number | null | undefined;
  userFieldsSearch: Array<any> | null | undefined;
  updateUserFields: number | null | undefined;
  userField1Label: string | null | undefined;
  userField1Value: string | null | undefined;
  userField2Label: string | null | undefined;
  userField2Value: string | null | undefined;
  userField3Label: string | null | undefined;
  userField3Value: string | null | undefined;
  userField4Label: string | null | undefined;
  userField4Value: string | null | undefined;
  userField5Label: string | null | undefined;
  userField5Value: string | null | undefined;
  userField6Label: string | null | undefined;
  userField6Value: string | null | undefined;
  userField7Label: string | null | undefined;
  userField7Value: string | null | undefined;
  userField8Label: string | null | undefined;
  userField8Value: string | null | undefined;
  comment: string | null | undefined;
  passthrough: string | null | undefined;
  customStatus: Array<any> | null | undefined;
  returnCategory: number | null | undefined;
  returnSourceLists: number | null | undefined;
  generateclientId: number | null | undefined;
  skipSearch: number | null | undefined;
  processUBO: number | null | undefined;
  UBO_Id: string | null | undefined;
};

export type ComplianceRecord = {
  pairStatus: string;
  pairReason: string;
  pairComments: string;
  applicationDisplayName: string;
  applicationId: string;
  clientId: string;
  clientKey: number;
  clientFullName: string;
  listKey: string;
  listName: string;
  listId: string;
  listVersion: string;
  listModifyDate: string;
  listProfileId: string;
  listProfileKey: number;
  linkSingleStringName: string;
  listParentSingleStringName: string;
  listCategory: string;
  listPEPCategory: string;
  listDOBs: string;
  listCountries: string;
  rankString: string;
  rankScore: number;
  ranktype: string;
  rankweight: string;
  pairLoadDate: string;
  eAddressTo: string;
  eAddressCC: string;
  origin: string;
  secondsviewed: string;
  initialUser: string;
  isPairParentFlag: number;
  pairMetSearchCriteriaFlag: number;
  editableDueToAssignmentFlag: number;
  modifyDate: string;
  modifiedByUser: string;
  pairReportType: number;
  finscanCategory: null;
  wrapperStatus: number;
  sourceLists: null;
  listRecordDetail: null;
};

export type DynamicFields = {
  listParentSingleStringName: string;
  listSingleStringType: string;
  listGender: string;
  listAliases: string;
  listCategory: string;
  listPEPCategory: string;
  listDOBs: string;
  listCountries: string;
  listCitizenships: string;
  listNationalIds: string;
  listPassports: string;
};

export type SearchMatch = {
  displayOrder: string;
  listId: string;
  listName: string;
  version: string;
  loadDateTime: string;
  listProfileKey: number;
  listProfileId: string;
  recordType: string;
  displayLine: string;
  isParentFlag: number;
  dynamicFields: DynamicFields | Partial<DynamicFields>;
  fnsCategories: string;
  rankString: string;
  rankScore: number;
  rankType: number;
  rankLabelKey: number;
  rankLabel1: string;
  rankLabel1FieldName: string;
  rankLabel2: string;
  rankLabel2FieldName: string;
  rankLabel3: string;
  rankLabel3FieldName: string;
  rankLabel4: string;
  rankLabel4FieldName: string;
  rankLabel5: string;
  rankLabel5FieldName: string;
  rankLabel6: string;
  rankLabel6FieldName: string;
  rankLabel7: string;
  rankLabel7FieldName: string;
  rankLabel8: string;
  rankLabel8FieldName: string;
  rankLabel9: string;
  rankLabel9FieldName: string;
  rankLabel10: string;
  rankLabel10FieldName: string;
  rankValue: string;
  reviewStatus: string;
  reviewReason: string;
  reviewComment: string;
};

export type SearchResult = {
  searchName: string;
  clientId: string;
  clientName: string;
  returned: number;
  notReturned: number;
  sequenceNumber: number;
  searchDateTime: string;
  searchMatches: Array<SearchMatch | Partial<SearchMatch>>;
};

export type APIResponse = {
  status: number;
  message: string;
  returned: number;
  notReturned: number;
  resultsCount: number;
  hitCount: number;
  pendingCount: number;
  safeCount: number;
  complianceRecords: Array<ComplianceRecord>;
  clientId: string;
  clientKey: number;
  version: string;
  isiReserved: string;
  searchResults: Array<SearchResult | Partial<SearchResult>>;
  uboResults: null;
};
