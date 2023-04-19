import { useContext } from "react"
import { DataStateContext } from "./DataStateContext"

export function Posts() {

    const { dataState: PostsList } = useContext(DataStateContext)

    if(!PostsList) {
        return <div>Loading!</div>
    }

    return <div>
        {
            PostsList
            .map((post) => {
                return (
                    <div key={ post.id } className="p-8 border-b border-slate-400">
                        <h1>@{ post.authorId }</h1>
                        <p>{ post.content }</p>
                    </div> 
                )
            })
            .reverse() 
        }
    </div>
}
