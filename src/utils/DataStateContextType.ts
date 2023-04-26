import type { Dispatch, SetStateAction } from 'react'
import type { UserData } from './UserData'

export type DataStateContextType = {
    dataState: UserData[]
    setDataState: Dispatch<SetStateAction<UserData[]>>
}
