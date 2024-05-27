import { IBilling } from "../interfaces/Billing";
import { api } from "../services/api";

export const useBillings = () => {
  async function fetchBillings(): Promise<IBilling[]> {
    try {
      const allOrders = (await api.get("/orderTracking/user")).data.payload;

      return allOrders;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  return { fetchBillings };
};
