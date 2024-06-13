import { ReactNode, createContext, useContext, useState } from "react";
import { useQueryClient } from "react-query";

export type FilterRequestProps = {
  exitID: string;
  startAt: Date | string;
  endAt: Date | string;
};

type FilterContextProps = {
  filterRequests(filtersFromFilter: FilterRequestProps): void;
  filters: FilterRequestProps;
};

const FilterContext = createContext({} as FilterContextProps);

export const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState<FilterRequestProps>({
    exitID: "",
    startAt: "",
    endAt: "",
  });

  function filterRequests(filtersFromFilter: FilterRequestProps) {
    setFilters(filtersFromFilter);
  }

  return (
    <FilterContext.Provider value={{ filters, filterRequests }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterRequests = () => {
  if (!FilterContext) {
    throw new Error("Nenhum contexto informado!");
  }
  return useContext(FilterContext);
};
