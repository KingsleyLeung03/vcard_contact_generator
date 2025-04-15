export function ContactCardSkeleton() {
  return (
    <div className="h-150 md:h-100 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 animate-pulse mb-8">
      {/* Image Placeholder */}
      <div className="w-32 h-32 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
      
      {/* Text Placeholder */}
      <div className="flex-1 space-y-4 py-1 w-full md:w-auto">
        {/* Name Placeholder */}
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
        {/* Title Placeholder */}
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6"></div>

        <div className="mt-4 space-y-3">
          {/* Detail Placeholders */}
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/6"></div>
        </div>
      </div>
    </div>
  );
}
