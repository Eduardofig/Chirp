import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";

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
        <div className="flex gap-3">
            <img src={ user.profileImageUrl }
                alt="Profile Image"
                className="w-16 h-16 rounded-full"
            />
            <input onChange={ (e) => setContent(e.target.value) } placeholder="type some emojis" className="bg-transparent"/>
            <button onClick={ () => handleClick(user.username) }>Send Post</button>
        </div>
    )
}


const Home: NextPage = () => {

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
            <main className="flex justify-center h-screen">
                <div className="h-full w-full md:max-w-2xl border-x border-slate-400">
                    <div> { user.isSignedIn? "Hello User": "Sign in to continue" } </div>
                    <div> { user.isSignedIn? <CreatePostWizard/>: <SignInButton/> } </div>
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
            </main>
        </>
    );
};

export default Home;
