import { IBilling } from "./src/interfaces/Billing";

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      requestDetails: {
        request: IRequest;
      };
      billingDetails: {
        billing: IBilling;
      };
      editUser;
      requests;
      settings;
      filterRequests;
      filterBillings;
      cancelledRequestsAlmox;
      almox;
    }
  }
}
