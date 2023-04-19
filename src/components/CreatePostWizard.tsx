import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { api } from "~/utils/api"

export function CreatePostWizard() {
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
