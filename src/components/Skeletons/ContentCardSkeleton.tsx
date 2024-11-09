import { Skeleton } from "../ui/shadcn/skeleton";

const ContentCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 center">
      <Skeleton className="flex flex-col w-[230px] h-[320px] gap-2 relative text-center cursor-pointer mx-auto"></Skeleton>
      <Skeleton className="h-4 w-[220px]"> </Skeleton>
    </div>
  );
};

export default ContentCardSkeleton;
