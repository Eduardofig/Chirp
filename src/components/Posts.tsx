import { useContext } from "react"
import { DataStateContext } from "./DataStateContext"

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
                    <div key={ post.id } className="flex gap-3 p-4 border-b border-slate-400 w-full">
                        <img src={ author.profileImageUrl }
                            alt="Profile Image"
                            className="w-7 h-7 rounded-full"
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
                                    {`${post.createdAt.toLocaleDateString()} - ${post.createdAt.toLocaleTimeString()}`}
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
