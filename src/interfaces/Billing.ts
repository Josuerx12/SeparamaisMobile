import { ActionBy } from "./Request";

export interface IBilling {
  id: string;
  idDeCompra: string;
  receptor: ActionBy;
  state: number;
  owner: ActionBy;
  message: string;
  collected: boolean;
  createdAt: string;
  updatedAt: string;
}
