import { Skeleton } from "@/components/ui/skeleton";

interface AdvocatesTableSkeletonProps {
  rows?: number;
}

export function AdvocatesTableSkeleton({
  rows = 5,
}: AdvocatesTableSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full max-w-sm rounded-lg" />
        <Skeleton className="h-4 w-28 rounded-full" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
