import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { step?: number }
>(({ className, value = [0], max = 10, step = 1, ...props }, ref) => {
  const percentage = (value[0] / max) * 100; // Увеличиваем максимальное значение до 100

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      value={value}
      max={max}
      step={step} // Добавлено свойство step
      {...props}
    >
      <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-neutral-900/20 dark:bg-neutral-50/20">
        <SliderPrimitive.Range
          className={`absolute h-full bg-gradient-to-r ${
            percentage < 33.3
              ? "from-red-500 to-orange-500"
              : percentage < 66.6
              ? "from-orange-500 to-yellow-500"
              : "from-lime-600 to-green-800"
          } `}
          style={{ width: `${percentage}%` }} // Применяем ширину градиента
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-neutral-200 border-neutral-900/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:border-neutral-50/50 dark:bg-neutral-950 dark:focus-visible:ring-neutral-300" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
