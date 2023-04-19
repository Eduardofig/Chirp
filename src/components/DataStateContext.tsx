import { type Post } from "@prisma/client";
import { type Dispatch, type SetStateAction, createContext } from "react";
import { type DataStateContextType } from "~/utils/DataStateContextType";

export const DataStateContext = createContext<DataStateContextType>({
    dataState: [] as Post[],
    setDataState: (() => console.log("Dudu: Initializing DataStateContext")) as Dispatch<SetStateAction<Post[]>> ,
})
