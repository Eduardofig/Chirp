import { type Dispatch, type SetStateAction, createContext } from 'react'
import type { DataStateContextType } from '~/utils/DataStateContextType'
import type { UserData } from '~/utils/UserData'

export const DataStateContext = createContext<DataStateContextType>({
    dataState: [] as UserData[],
    setDataState: (() =>
        console.log('Dudu: Initializing DataStateContext')) as Dispatch<
        SetStateAction<UserData[]>
    >,
})
