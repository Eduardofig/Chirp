import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { Timeline } from "~/components/Timeline"
import { api } from "~/utils/api"


function Home() {

    // Hooks
    const user  = useUser()
    const { data, isLoading } = api.posts.getAll.useQuery()

    if(isLoading) {
        return <div>Loading!</div>
    }

    if(!data) {
        return <div>Something went wrong!</div>
    }

    return (
        <div className="h-full w-full">
            {
                user.isSignedIn?
                    <>
                        <Timeline data={data}/>
                        <SignOutButton/>
                    </>
                    :
                    <SignInButton/>
            }
        </div>

    )
}

export default Home
