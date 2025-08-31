import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/contexts/theme-context";

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
