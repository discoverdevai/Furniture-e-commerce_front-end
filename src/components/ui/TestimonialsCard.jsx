import React from "react";
import { cn } from "../../lib/utils";

const TestimonialsCard = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...rest}
    />
  );
});
TestimonialsCard.displayName = "TestimonialsCard";

const TestimonialsCardHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...rest}
    />
  );
});
TestimonialsCardHeader.displayName = "TestimonialsCardHeader";

const TestimonialsCardTitle = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...rest}
    />
  );
});
TestimonialsCardTitle.displayName = "TestimonialsCardTitle";

const TestimonialsCardDescription = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
});
TestimonialsCardDescription.displayName = "TestimonialsCardDescription";

const TestimonialsCardContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...rest} />
  );
});
TestimonialsCardContent.displayName = "TestimonialsCardContent";

const TestimonialsCardFooter = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...rest}
    />
  );
});
TestimonialsCardFooter.displayName = "TestimonialsCardFooter";

export {
  TestimonialsCard,
  TestimonialsCardHeader,
  TestimonialsCardFooter,
  TestimonialsCardTitle,
  TestimonialsCardDescription,
  TestimonialsCardContent,
};
