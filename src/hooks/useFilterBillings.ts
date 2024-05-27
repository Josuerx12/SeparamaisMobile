import { useMemo } from "react";
import { IBilling } from "../interfaces/Billing";

export const useFilterBillings = (billing?: IBilling[]) => {
  const waitingToCollectBillings = useMemo(
    () => billing?.filter((r) => r.state == 1),
    [billing]
  );
  const inQuarantineBillings = useMemo(
    () => billing?.filter((r) => r.state == 2),
    [billing]
  );
  const collectedBillings = useMemo(
    () => billing?.filter((r) => r.state == 5 && r.collected),
    [billing]
  );
  const stockedBillings = useMemo(
    () => billing?.filter((r) => r.state == 4),
    [billing]
  );

  return {
    waitingToCollectBillings,
    inQuarantineBillings,
    collectedBillings,
    stockedBillings,
  };
};
