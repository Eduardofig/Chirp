export function LoadingSpinner() {
    return (
        <div className="absolute bottom-1/2 right-1/2 grid h-full  w-full translate-x-1/2 translate-y-1/2 transform place-items-center bg-slate-950">
            <div className="h-64 w-64 animate-spin rounded-full border-8 border-solid border-red-900 border-t-transparent"></div>
        </div>
    )
}
