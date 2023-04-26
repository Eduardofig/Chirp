import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useState } from "react"
import { api } from "~/utils/api"

export function CreatePostWizard() {
    const { user } = useUser()
    const [content, setContent] = useState("")
    const [btnText, setBtnText] = useState("Send Post")
    const postMutation = api.posts.sendTweet.useMutation()

    if(!user) {
        return <p 
            className="absolute h-full w-full bg-slate-950 grid place-items-center align-middle text-sky-100 font-bold"
        >
            Something went wrong
        </p>
    }

    console.log(user)

    const handlePost = (userName: string | null) => {

        if(!userName) {
            return
        }

        const newPost = {
            content,
            authorId: userName,
        }

        setBtnText("Sending")

        postMutation.mutateAsync(newPost)
            .then(() => {

                setBtnText("Send Post")
            })
            .catch(() => alert("Something went wrong"))
    }

    return (
        <div className="flex w-full mx-auto border-2 py-2 px-2 rounded-lg gap-3 bg-slate-800 border-transparent">
            <Image
                src= { user.profileImageUrl }
                className="w-14 self-center h-14 rounded-full"
                alt={`@${ user.username || "Unidentified" } profile picture`}
                width={56}
                height={56}
            />
            <form 
                className="flex w-screen gap-3"
                onSubmit={ () => handlePost(user.id) }
            >
                <input 
                    onChange={ (e) => setContent(e.target.value) }
                    onSubmit={ () => handlePost(user.id) }
                    placeholder="Say Something!"
                    className="p-5 text-sky-200 w-16 grow outline-none bg-slate-800 hover:bg-gray-800 focus:bg-gray-800 rounded-lg"
                />
                <button 
                    type="submit"
                    className="p-1 bg-red-950 rounded-lg hover:bg-red-900 text-sky-200"
                >
                    { btnText }
                </button>
            </form>
        </div>
    )
}
