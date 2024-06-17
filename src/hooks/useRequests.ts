import {
  IPaginatedAndFilteredRequest,
  IRequest,
  TNewReqCredentials,
} from "../interfaces/Request";
import { api } from "../services/api";

export const useRequests = () => {
  async function fetchUserRequests(): Promise<IRequest[]> {
    try {
      const res = await api.get("/user/requests");

      return res.data.payload;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchAllRequests(): Promise<IRequest[]> {
    try {
      const res = await api.get("/requests/all");

      return res.data.payload;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function fetchRequestsWithFilters({
    exitID,
    itemsPerPage = 10,
    page = 1,
    startAt,
    status,
    endAt,
  }: {
    exitID?: string | number;
    itemsPerPage: string | number;
    page: string | number;
    status: string;
    startAt?: string | Date;
    endAt?: string | Date;
  }): Promise<IPaginatedAndFilteredRequest> {
    const params = new URLSearchParams();

    params.append("itemsPerPage", String(itemsPerPage));
    {
      exitID && params.append("exitID", String(exitID));
    }
    params.append("page", String(page));
    params.append("status", String(status));
    {
      startAt && params.append("startAt", new Date(startAt).toISOString());
    }
    {
      endAt && params.append("endAt", new Date(endAt).toISOString());
    }
    try {
      const res = await api.get("/requests/paginatedReq", { params });
      return res.data.payload;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function newReq(credentials: TNewReqCredentials) {
    try {
      const newCredentials = {
        exitID: Number(credentials.exitID),
        collectorPhone: credentials.collectorPhone,
        collectForecast: credentials.collectForecast
          .toISOString()
          .split("T")[0],
        desc: credentials.desc,
      };

      const res = await api.post("/requests/new", newCredentials);
      return res.data;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  async function requestCancelReq({
    id,
    reason,
  }: {
    id: string;
    reason: string;
  }) {
    try {
      const res = await api.put(`/requests/requestCancel/${id}`, { reason });
      return res.data;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function cancelReq(id: string) {
    try {
      const res = await api.put(`/requests/cancel/${id}`);
      return res.data;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function deleteReq(id: string) {
    try {
      const res = await api.delete(`/requests/${id}`);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }

  async function startSeparation(id: string) {
    try {
      await api.put(`/requests/inSeparation/${id}`);
    } catch (error: any) {
      throw error.message;
    }
  }

  async function awaitingCollection(id: string) {
    try {
      await api.put(`/requests/separated/${id}`);
    } catch (error: any) {
      throw error.message;
    }
  }

  async function collected({
    id,
    collectorCredentials,
  }: {
    id: string;
    collectorCredentials: { name: string; document: string };
  }) {
    try {
      await api.post(`/requests/collected/${id}`, collectorCredentials);
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  return {
    fetchUserRequests,
    fetchAllRequests,
    newReq,
    requestCancelReq,
    cancelReq,
    deleteReq,
    fetchRequestsWithFilters,
    startSeparation,
    awaitingCollection,
    collected,
  };
};
