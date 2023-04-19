import { Timeline } from "~/components/Timeline"
import { api } from "~/utils/api"

function Home() {

    // Hooks
    const { data, isLoading } = api.posts.getAll.useQuery()

    if(isLoading) {
        return <div>Loading!</div>
    }

    if(!data) {
        return <div>Something went wrong!</div>
    }

    return <Timeline data={data}/>
}

export default Home
