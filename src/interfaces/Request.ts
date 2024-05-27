export type ActionBy = {
  id?: string;
  name?: string;
  login?: string;
  phone?: string;
  email?: string;
};

type CollectedBy = {
  name?: string;
  document?: string;
};

export interface IRequest {
  _id: string;
  requestedBy: ActionBy;
  status: string;
  exitID: number;
  desc: string;
  collectForecast: string;
  separetedBy?: ActionBy;
  separetedAt?: string;
  dispatchedBy?: ActionBy;
  collectedBy?: CollectedBy;
  canceledBy?: ActionBy;
  collectedAt?: string;
  createdAt: string;
  updatedAt: string;
  reason?: string;
}

export type TNewReqCredentials = {
  exitID?: number | string;
  collectorPhone?: string;
  collectForecast: Date;
  desc?: string;
};
