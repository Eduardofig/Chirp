import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'
import { api } from '~/utils/api'

export function CreatePostWizard(): JSX.Element {
    const { user } = useUser()
    const [content, setContent] = useState('')

    const [btnText, setBtnText] = useState('Send Post')
    const postMutation = api.posts.sendTweet.useMutation()

    if (!user) {
        return (
            <p className="absolute grid h-full w-full place-items-center bg-slate-950 align-middle font-bold text-sky-100">
                Something went wrong
            </p>
        )
    }

    console.log(user)

    const handlePost = (userName: string | null) => {
        if (!userName) {
            return
        }

        const newPost = {
            content,
            authorId: userName,
        }

        setBtnText('Sending')

        postMutation
            .mutateAsync(newPost)
            .then(() => {
                setBtnText('Send Post')
            })
            .catch(() => alert('Something went wrong'))
    }

    return (
        <div className="mx-auto flex w-full gap-3 rounded-lg border-2 border-transparent bg-slate-800 px-2 py-2">
            <Image
                src={user.profileImageUrl}
                className="h-14 w-14 self-center rounded-full"
                alt={`@${user.username || 'Unidentified'} profile picture`}
                width={56}
                height={56}
            />
            <form
                className="flex w-screen gap-3"
                onSubmit={() => handlePost(user.id)}
            >
                <input
                    onChange={(e) => setContent(e.target.value)}
                    onSubmit={() => handlePost(user.id)}
                    placeholder="Say Something!"
                    className="w-16 grow rounded-lg bg-slate-800 p-5 text-sky-200 outline-none hover:bg-gray-800 focus:bg-gray-800"
                />
                <button
                    type="submit"
                    className="rounded-lg bg-red-950 p-1 text-sky-200 hover:bg-red-900"
                >
                    {btnText}
                </button>
            </form>
        </div>
    )
}
