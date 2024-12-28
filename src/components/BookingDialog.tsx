import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

interface BookingDialogProps {
  children: React.ReactNode;
}

const BookingDialog = ({ children }: BookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (isOpen && !scriptRef.current) {
      // Remove any existing TidyCal scripts first
      const existingScript = document.querySelector('script[src*="tidycal"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and load TidyCal script
      const script = document.createElement("script");
      script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      
      // Add error handling
      script.onerror = (error) => {
        console.error("Error loading TidyCal script:", error);
      };

      // Initialize TidyCal after a short delay to ensure proper loading
      script.onload = () => {
        setTimeout(() => {
          if (window.TidyCal) {
            try {
              window.TidyCal.init();
            } catch (error) {
              console.error("Error initializing TidyCal:", error);
            }
          }
        }, 100);
      };

      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Choose a time that works best for you to discuss your project.
          </DialogDescription>
        </DialogHeader>
        <div 
          className="tidycal-embed h-[600px] w-full" 
          data-path="denis5/15-minute-meeting"
        />
      </DialogContent>
    </Dialog>
  );
};

// Add TypeScript type for TidyCal
declare global {
  interface Window {
    TidyCal?: {
      init: () => void;
    };
  }
}

export default BookingDialog;