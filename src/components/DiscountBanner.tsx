import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface DiscountBannerProps {
  discount: {
    title: string;
    description: string;
    expiryDate?: Date;
    code?: string;
  };
}

export default function DiscountBanner({ discount }: DiscountBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!discount.expiryDate) return;

    const calculateTimeLeft = () => {
      const difference =
        new Date(discount.expiryDate!).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [discount.expiryDate]);

  if (dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4 relative">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
          <p className="font-bold">{discount.title}</p>
          <p className="text-sm">{discount.description}</p>
        </div>

        <div className="flex items-center space-x-4">
          {discount.expiryDate && (
            <div className="text-sm">
              <span className="font-medium">Ends in: </span>
              <span className="font-bold">{timeLeft}</span>
            </div>
          )}

          {discount.code && (
            <div className="bg-white text-primary px-3 py-1 rounded font-mono font-bold text-sm">
              {discount.code}
            </div>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 text-primary-foreground/80 hover:text-primary-foreground"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
