import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Timeline } from '~/components/Timeline'
import { api } from '~/utils/api'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LoadingSpinner } from '~/components/Loading'

dayjs.extend(relativeTime)

function Home(): JSX.Element {
    // Hooks
    const user = useUser()

    const { data, isLoading } = api.posts.getAll.useQuery()

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!data) {
        return (
            <p className="absolute grid h-full w-full place-items-center bg-slate-950 align-middle font-bold text-sky-100">
                Something went wrong
            </p>
        )
    }

    console.log('Hello Laurinha')

    return (
        <div className="h-full w-full bg-slate-950">
            {user.isSignedIn ? (
                <>
                    <Timeline data={data} />
                    <SignOutButton />
                </>
            ) : (
                <SignInButton />
            )}
        </div>
    )
}

export default Home
