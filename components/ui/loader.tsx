import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const Loader = ({ className, size = 'md', ...props }: LoaderProps) => {
  const sizeClass = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4'
  }[size]

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-b-transparent border-primary",
        sizeClass,
        className
      )}
      {...props}
    />
  )
}

export { Loader }
