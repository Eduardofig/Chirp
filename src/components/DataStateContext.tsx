import { createContext } from "react";
import { DataStateContextType } from "~/utils/DataStateContextType";

export const DataStateContext = createContext<DataStateContextType>({
    dataState: undefined,
    setDataState: undefined
})
