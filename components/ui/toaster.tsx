"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-card border border-border">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-foreground">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-muted-foreground">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-foreground hover:text-foreground/80" />
          </Toast>
        );
      })}
      <ToastViewport className="p-6" />
    </ToastProvider>
  );
}