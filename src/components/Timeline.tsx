import type { Post } from "@prisma/client"
import Head from "next/head"
import { useState } from "react"
import { CreatePostWizard } from "~/components/CreatePostWizard"
import { DataStateContext } from "~/components/DataStateContext"
import { Posts } from "~/components/Posts"

export function Timeline({data}: {data: Post[]}) {

    // Hooks
    const [dataState, setDataState] = useState(data)

    return (
        <>
            <Head>
                <title>Meu aplicativo</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex justify-center h-full">
                <DataStateContext.Provider value={{dataState, setDataState}}>
                    <div className="h-full w-full md:max-w-2xl border-x border-slate-40">
                        <div className="p-4 border-b border-slate-400">
                            <CreatePostWizard/>
                        </div>
                        <Posts/>
                    </div>
                </DataStateContext.Provider>
            </main>
        </>
    )
}
