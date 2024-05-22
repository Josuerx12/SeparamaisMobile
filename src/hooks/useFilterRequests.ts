import { useMemo } from "react";
import { IRequest } from "../interfaces/Request";

export const useFilterReq = (req?: IRequest[]) => {
  const newReq = useMemo(
    () => req?.filter((r) => r.status === "Aguardando Separação"),
    [req]
  );
  const inSeparationReq = useMemo(
    () => req?.filter((r) => r.status === "Em Separação"),
    [req]
  );
  const waitingToCollectReq = useMemo(
    () => req?.filter((r) => r.status === "Aguardando Coleta"),
    [req]
  );
  const collectedReq = useMemo(
    () => req?.filter((r) => r.status === "Coletado"),
    [req]
  );

  const canceledReq = useMemo(
    () => req?.filter((r) => r.status === "Solicitação Cancelada"),
    [req]
  );
  const reqToCancelReq = useMemo(
    () => req?.filter((r) => r.status === "Aguardando Cancelamento"),
    [req]
  );

  return {
    newReq,
    inSeparationReq,
    waitingToCollectReq,
    collectedReq,
    canceledReq,
    reqToCancelReq,
  };
};
