import { SignInButton, useUser } from "@clerk/nextjs"
import { type NextPage } from "next"
import Head from "next/head"
import { useRef, useState } from "react"
import { api } from "~/utils/api"

const CreatePostWizard = () => {
    const { user } = useUser()
    const [content, setContent] = useState("")
    const postMutation = api.posts.sendTweet.useMutation()

    if(!user || !user.username) {
        return <div>Something went wrong</div>
    }

    const handleClick = (userName: string | null) => {

        if(!userName) {
            return
        }

        const tweet = {
            content,
            authorId: userName,
        }

        postMutation.mutateAsync(tweet)
            .then(() => window.location.reload())
            .catch(() => alert("Something went wrong"))
    }

    return (
        <div className="flex w-full gap-3">
            <img src={ user.profileImageUrl }
                alt="Profile Image"
                className="w-14 h-14 rounded-full"
            />
            <input 
                onChange={ (e) => setContent(e.target.value) }
                placeholder="Tweet Something"
                className="grow outline-none bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 rounded-lg"
            />
            <button 
                onClick={ () => handleClick(user.username) }
                className="bg-red-950 rounded-lg hover:bg-red-900"
            >
                Send Post
            </button>
        </div>
    )
}

const Home: NextPage = () => {

    // Hooks
    const user = useUser()
    const { data, isLoading } = api.posts.getAll.useQuery()

    if(isLoading) {
        return <div>Loading</div>
    }

    if(!data) {
        return <div>Error</div>
    }


    return (
        <>
            <Head>
                <title>Meu aplicativo</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex justify-center h-full">
                <div className="h-full w-full md:max-w-2xl border-x border-slate-400">
                    <div className="p-4 border-b border-slate-400">
                        { user.isSignedIn? <CreatePostWizard/>: <SignInButton/> } 
                    </div>
                    <div>
                        { data.map((post) => {
                            return (
                                <div key={ post.id } className="p-8 border-b border-slate-400">
                                    <h1>@{ post.authorId }</h1>
                                    <p>{ post.content }</p>
                                </div> 
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )

}

export default Home
