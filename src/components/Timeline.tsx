import Head from "next/head"
import { useState } from "react"
import { CreatePostWizard } from "~/components/CreatePostWizard"
import { DataStateContext } from "~/components/DataStateContext"
import { Posts } from "~/components/Posts"
import type { UserData } from "~/utils/UserData"

export function Timeline({data}: {data: UserData[]}) {

    // Hooks
    const [dataState, setDataState] = useState(data)

    return (
        <>
            <Head>
                <title>Meu aplicativo</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex justify-center h-full w-full">
                <DataStateContext.Provider value={{dataState, setDataState}}>
                    <div className="h-full w-full md:max-w-4xl border-x border-slate-40">
                        <div className="p-4 border-b border-slate-400 w-full">
                            <CreatePostWizard/>
                        </div>
                        <Posts/>
                    </div>
                </DataStateContext.Provider>
            </main>
        </>
    )
}
