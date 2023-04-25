import { useContext } from "react"
import { DataStateContext } from "./DataStateContext"
import dayjs from "dayjs"
import Image from "next/image"

export function Posts() {

    const { dataState } = useContext(DataStateContext)

    if(!dataState) {
        return <div>Loading!</div>
    }

    return <div>
        {
            dataState
            .map(({post, author}) => {
                return (
                    <div key={ post.id } className="flex gap-3 p-2 m-1 rounded-md border-2 shadow-md bg-gray-500 border-slate-400 mx-auto w-[96%]">
                        <Image
                            src= {author.profileImageUrl}
                            className="w-7 h-7 rounded-full self-center"
                            alt={`@${author.username} profile picture`}
                            width={56}
                            height={56}
                        />
                        <div className="flex flex-col w-full">
                            <div className="flex gap-2">
                                <span>{ post.content }</span>
                            </div>
                            <div className="flex gap-2 w-full text-xs">
                                <span className="flex">
                                    {`@${author.username}`}
                                </span>
                                <span className="flex gap-2 ml-auto">
                                    {dayjs(post.createdAt).fromNow()}
                                </span>
                            </div>
                        </div>
                    </div> 
                )
            })
            .reverse() 
        }
    </div>
}
