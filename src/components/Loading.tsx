export function LoadingSpinner() {
    return <div 
        className="grid place-items-center absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 bg-slate-950 h-full w-full"
    >
    <div className="border-t-transparent border-solid animate-spin rounded-full border-red-900 border-8 h-64 w-64"></div>
</div>
}

