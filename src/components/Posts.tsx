import { useContext } from 'react'
import { DataStateContext } from './DataStateContext'
import dayjs from 'dayjs'
import Image from 'next/image'
import { LoadingSpinner } from './Loading'

export function Posts(): JSX.Element {
    const { dataState } = useContext(DataStateContext)

    if (!dataState) {
        return <LoadingSpinner />
    }

    return (
        <div>
            {dataState
                .map(({ post, author }) => {
                    return (
                        <div
                            key={post.id}
                            className="m-1 mx-auto flex w-[96%] gap-3 rounded-md border-2 border-transparent bg-slate-800 p-2 text-sky-200 shadow-md"
                        >
                            <Image
                                src={author.profileImageUrl}
                                className="h-7 w-7 self-center rounded-full"
                                alt={`@${author.username} profile picture`}
                                width={56}
                                height={56}
                            />
                            <div className="flex w-full flex-col">
                                <div className="flex gap-2">
                                    <span>{post.content}</span>
                                </div>
                                <div className="flex w-full gap-2 text-xs">
                                    <span className="flex">
                                        {`@${author.username}`}
                                    </span>
                                    <span className="ml-auto flex gap-2">
                                        {dayjs(post.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
                .reverse()}
        </div>
    )
}
