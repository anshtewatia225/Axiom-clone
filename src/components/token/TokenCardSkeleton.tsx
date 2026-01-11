
import { Skeleton } from "@/components/ui/skeleton"

export function TokenCardSkeleton() {
    return (
        <div className="w-full h-[116px] flex bg-[#101114] border-b border-[#22242D] p-3 gap-3">
            {/* Icon Skeleton */}
            <Skeleton className="w-[68px] h-[68px] rounded-[1px] bg-[#22242D]" />

            {/* Middle Content Skeleton */}
            <div className="flex flex-col flex-1 gap-2 py-1">
                <Skeleton className="h-4 w-24 bg-[#22242D]" />
                <Skeleton className="h-3 w-16 bg-[#22242D]" />
                <div className="mt-auto flex gap-2">
                    <Skeleton className="h-5 w-12 rounded-full bg-[#22242D]" />
                    <Skeleton className="h-5 w-12 rounded-full bg-[#22242D]" />
                </div>
            </div>

            {/* Right Content Skeleton */}
            <div className="flex flex-col items-end gap-2 py-1">
                <Skeleton className="h-4 w-20 bg-[#22242D]" />
                <Skeleton className="h-4 w-16 bg-[#22242D]" />
                <Skeleton className="h-6 w-16 rounded-full bg-[#22242D] mt-2" />
            </div>
        </div>
    )
}
