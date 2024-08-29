export interface ClaimType {
  totalClaims: number;
  totalAdvances: number;
  claimdata: ClaimData[];
  advancedata: AdvanceData[];
  recentClaims: RecentClaim[];
  recentAdvances: RecentAdvance[];
}

interface ClaimData {
  status: number;
  statusName: string | null;
  currencyCode: string;
  currencyName: string;
  totalAmount: number;
  totalCount: number;
  totalClaimableAmount: number;
  expensesCount: number;
  mileagesCount: number;
  advancesCount: number;
  perDiemsCount: number;
  expensesAmount: number;
  mileagesAmount: number;
  advancesAmount: number;
  perDiemsAmount: number;
}

interface AdvanceData {
  status: number;
  statusName: string | null;
  currencyCode: string;
  currencyName: string;
  totalAmount: number;
  totalCount: number;
}

interface RecentClaim {
  id: number;
  startDate: string;
  endDate: string;
  currencyCode: string;
  name: string;
  purpose: string;
  costCentreId: number;
  costCentreName: string | null;
  overBudget: any;
  overBudgetReason: any;
  unaccountedAdvances: any;
  status: number;
  submittedOn: string;
  displaySubmittedOn: string;
  expenses: Expense[];
  perDiems: any[];
  mileages: any[];
  advances: any[];
  approvalSteps: any[];
  totalReceipts: number;
  totalExpenseAmount: number;
  totalPerDiemAmount: number;
  totalMileageAmount: number;
  totalAdvanceAmount: number;
  totalCardAmount: number;
  totalSpentAmount: number;
  totalAmount: number;
  totalClaimableAmount: number;
  createdByUser: User;
  displayCreatedOn: string;
  displayLastModifiedOn: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
}

interface Expense {
  expenseId: number;
  expenseTypeID: number;
  expenseTypeName: string | null;
  expenseSubTypeID: number;
  expenseSubTypeName: string | null;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  natureofExpense: any;
  natureofExpenseReason: any;
  currencyCode: string;
  currencyName: string | null;
  vendorCategory: any;
  notes: string;
  amount: number;
  date: string;
  displayDate: string;
  receiptPath: string;
  paymentMethod: number;
  cardId: any;
  supplier: any;
  invoiceNumber: any;
  tax: number;
  listOfParticipants: any;
  foreignCurrencyCode: any;
  foreignAmount: any;
  exchangeRate: any;
}

interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  employeeID: string;
  departmentID: number;
  departmentName: string | null;
  gradeID: number;
  gradeName: string | null;
  companyID: number;
  companyName: string | null;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  costCentreId: number;
  costCentreName: string | null;
  designation: string;
  countryCode: string;
  currencyCode: string;
  picturePath: string | null;
  pictureBase64: string | null;
  role: any;
  isActive: boolean;
}

interface RecentAdvance {
  advanceId: number;
  advanceType: number;
  paymentMethod: number;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  costCentreId: number;
  costCentreName: string | null;
  currencyCode: string;
  currencyName: string | null;
  purpose: string;
  notes: string;
  amount: number;
  date: string;
  displayDate: string;
  receiptPath: string;
  status: number;
  cardId: any;
  corporateCard: any;
  approvalSteps: any[];
  tripId: any;
  createdBy: string;
  createdByUser: User;
  createdOn: string;
  displayCreatedOn: string;
  foreignCurrencyCode: any;
  foreignAmount: any;
  exchangeRate: any;
}

export interface IAMUser {
  BrandID: string;
  BrandName: string;
  ComapnyName: string;
  CompanyID: string;
  CostCentreId: string;
  CostCentreName: string;
  CountryCode: string;
  CountryName: string;
  CurrencyCode: string;
  DepartmentID: string;
  Designation: string;
  GmtOffset: string;
  GradeID: string;
  GradeName: string;
  ImageUrl: string;
  ProdCatID: string;
  ProdCatName: string;
  StoreID: string;
  StoreName: string;
  aud: string;
  email: string;
  exp: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  ip: string;
  iss: string;
  nbf: number;
  roles: string;
  uid: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
}

export interface IPaginationQuery {
  _page: number;
  _per_page: number;
}
export interface IPostResponse {
  data: IPost[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

type IPerDiem = {
  perDiemID: number;
  transportMode: number;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  fromLocation: string;
  fromLocationName: string | null;
  toLocation: string;
  toLocationName: string | null;
  fromDateAndTime: string;
  toDateAndTime: string;
  currencyCode: string;
  currencyName: string | null;
  meals: number[];
  perDiemPercent: number;
  noofDays: number;
  receiptPath: string | null;
  perdiemType: number;
  amountPerDay: number;
  giftReceived: string | null;
  giftReceivedReason: string | null;
  delayedFlight: string | null;
  delayedFlightReason: string | null;
  missedFlight: string | null;
  missedFlightReason: string | null;
  extensionTrip: string | null;
  extensionTripReason: string | null;
  totalAmount: number;
  stayHours: string;
  displayFromDateAndTime: string;
  displayToDateAndTime: string;
  foreignCurrencyCode: string | null;
  foreignAmount: string | null;
  exchangeRate: string | null;
};

type IExpense = {
  expenseId: number;
  expenseTypeID: number;
  expenseTypeName: string | null;
  expenseSubTypeID: string | null;
  expenseSubTypeName: string | null;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  natureofExpense: string | null;
  natureofExpenseReason: string | null;
  currencyCode: string;
  currencyName: string | null;
  vendorCategory: string | null;
  notes: string;
  amount: number;
  date: string;
  displayDate: string;
  receiptPath: string;
  paymentMethod: number;
  cardId: string | null;
  supplier: string | null;
  invoiceNumber: string | null;
  tax: number;
  listOfParticipants: string | null;
  foreignCurrencyCode: string | null;
  foreignAmount: string | null;
  exchangeRate: string | null;
};

type IMileage = {
  mileageId: number;
  vehicleType: number;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  fromPlaceId: string;
  toPlaceId: string;
  fromLocation: string | null;
  toLocation: string | null;
  distance: number;
  travelDate: string;
  displayTravelDate: string;
  currencyCode: string;
  currencyName: string | null;
  amount: number;
  receiptPath: string | null;
  paymentMethod: number;
  cardId: string | null;
  corporateCard: string | null;
};

type IAdvance = {
  advanceId: number;
  advanceType: number;
  storeID: number;
  storeName: string | null;
  brandID: number;
  brandName: string | null;
  prodCatID: number;
  prodCatName: string | null;
  costCentreId: number;
  costCentreName: string | null;
  paymentMethod: number;
  currencyCode: string;
  purpose: string;
  notes: string;
  amount: number;
  date: string;
  displayDate: string;
  receiptPath: string;
  status: number;
  cardId: string | null;
  foreignCurrencyCode: string;
  foreignAmount: number;
  exchangeRate: number;
};

export type IClaim = {
  id: number;
  startDate: string;
  endDate: string;
  currencyCode: string;
  name: string;
  purpose: string;
  costCentreId: number;
  costCentreName: string | null;
  overBudget: string | null;
  overBudgetReason: string | null;
  unaccountedAdvances: string | null;
  status: number;
  submittedOn: string;
  displaySubmittedOn: string;
  approvalSteps: any[];
  totalReceipts: number;
  totalExpenseAmount: number;
  totalPerDiemAmount: number;
  totalMileageAmount: number;
  totalAdvanceAmount: number;
  totalCardAmount: number;
  totalSpentAmount: number;
  totalAmount: number;
  totalClaimableAmount: number;
  createdByUser: string | null;
  displayLastModifiedOn: string;
  createdBy: string;
  createdOn: string;
  lastModifiedBy: string;
  lastModifiedOn: string;
  pagination?: Pagination;
};
export type Pagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
};
