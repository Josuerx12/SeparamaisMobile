export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      requestDetails: {
        request: IRequest;
      };
    }
  }
}
