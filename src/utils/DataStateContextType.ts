import type { Post } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

export type DataStateContextType = {
    dataState: Post[];
    setDataState: Dispatch<SetStateAction<Post[]>>;
}
