"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { useTranslation } from "react-i18next";

export function Drawer({ children, open, onOpenChange }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // 👇 dynamically set direction
  const direction = isArabic ? "left" : "right";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { direction })
          : child
      )}
    </Dialog.Root>
  );
}

export const DrawerTrigger = Dialog.Trigger;

export function DrawerContent({ children, className, direction = "right", ...props }) {
  return (
    <Dialog.Portal>
      {/* Overlay background */}
      <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

      {/* Drawer content */}
      <Dialog.Content
        {...props}
        className={cn(
          "fixed top-0 bottom-0 w-72 bg-white shadow-lg z-50 transition-transform duration-300 ease-out",
          direction === "left"
            ? "data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full left-0"
            : "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full right-0",
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
