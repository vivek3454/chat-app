import { Skeleton } from '../ui/skeleton'

const ChatSkeleton = () => {
    return (
        <div className='flex flex-col'>
            {Array(9).fill("").map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-2">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>))}
        </div>
    )
}

export default ChatSkeleton