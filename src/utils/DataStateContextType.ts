import { Post } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type DataStateContextType = {
    dataState: Post[] | undefined;
    setDataState: Dispatch<SetStateAction<Post[] | undefined>> | undefined;
}
