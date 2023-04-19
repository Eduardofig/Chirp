import { useUser } from "@clerk/nextjs"
import { useContext, useState } from "react"
import { api } from "~/utils/api"
import { DataStateContext } from "./DataStateContext"
import type { Post } from "@prisma/client"

export function CreatePostWizard() {
    const { user } = useUser()
    const [content, setContent] = useState("")
    const postMutation = api.posts.sendTweet.useMutation()
    const { dataState, setDataState } = useContext(DataStateContext)

    if(!user || !user.username) {
        return <div>Something went wrong</div>
    }

    const handleClick = (userName: string | null) => {

        if(!userName) {
            return
        }

        const newPost = {
            content,
            authorId: userName,
        }

        postMutation.mutateAsync(newPost)
            .then(() => {
                if(dataState && setDataState) {
                    setDataState([
                        ...dataState,
                        {content, authorId: userName, id: "", createdAt: new Date()} as Post,
                    ])
                }
            })
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
                placeholder="Say Something!"
                className="p-5 grow outline-none bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 rounded-lg"
            />
            <button 
                onClick={ () => handleClick(user.username) }
                className="p-1 bg-red-950 rounded-lg hover:bg-red-900"
            >
                Send Post
            </button>
        </div>
    )
}
