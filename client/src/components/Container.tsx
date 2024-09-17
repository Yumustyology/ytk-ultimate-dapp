import cn from "@/utils/cn";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}
const Container = ({ children, className, wide }: ContainerProps) => {
  return (
    <div
      className={cn(
        wide ? "lg:max-w-[120rem]" : "lg:max-w-[100rem]",
        "mx-auto w-full overflow-x-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
