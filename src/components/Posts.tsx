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
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <span>{ post.content }</span>
                            </div>
                            <div className="flex gap-2">
                                <span>
                                    {`@${author.username} - ${post.createdAt.toLocaleDateString()}`}
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
