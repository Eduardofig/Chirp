import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { api } from "~/utils/api"

export function CreatePostWizard() {
    const { user } = useUser()
    const [content, setContent] = useState("")
    const [btnText, setBtnText] = useState("Send Post")
    const postMutation = api.posts.sendTweet.useMutation()

    if(!user) {
        return <div>Something went wrong</div>
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
        <div className="flex w-full gap-3">
            <img src={ user.profileImageUrl }
                alt="Profile Image"
                className="w-14 self-center h-14 rounded-full"
            />
            <form 
                className="flex w-screen gap-3"
                onSubmit={ () => handlePost(user.id) }
            >
                <input 
                    onChange={ (e) => setContent(e.target.value) }
                    onSubmit={ () => handlePost(user.id) }
                    placeholder="Say Something!"
                    className="p-5 w-16 grow outline-none bg-gray-900 hover:bg-gray-800 focus:bg-gray-800 rounded-lg"
                />
                <button 
                    type="submit"
                    className="p-1 bg-red-950 rounded-lg hover:bg-red-900"
                >
                    { btnText }
                </button>
            </form>
        </div>
    )
}
