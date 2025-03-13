import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductCustomization } from "./CustomizationPanel";
import { Check, Mail } from "lucide-react";

interface QuoteSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ProductCustomization[];
  onClearCart: () => void;
}

export default function QuoteSummary({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}: QuoteSummaryProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    isSubmitting: false,
    isSubmitted: false,
    error: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormData((prev) => ({ ...prev, isSubmitting: true, error: "" }));

    try {
      // In a real application, you would send this data to your server
      // or use a service like EmailJS to send the email

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormData((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
      }));

      // Reset form after 3 seconds and close dialog
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          isSubmitting: false,
          isSubmitted: false,
          error: "",
        });
        onClearCart();
        onClose();
      }, 3000);
    } catch (error) {
      setFormData((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Failed to send your request. Please try again.",
      }));
    }
  };

  const getMaterialName = (id: string) => {
    const materials: Record<string, string> = {
      mahogany: "Mahogany",
      narra: "Narra",
      oak: "Oak",
      pine: "Pine",
      teak: "Teak",
    };
    return materials[id] || id;
  };

  const getFinishName = (id: string) => {
    const finishes: Record<string, string> = {
      natural: "Natural Wood",
      walnut: "Walnut",
      white: "White",
      black: "Black",
      custom: "Custom Stain",
    };
    return finishes[id] || id;
  };

  const getGlassName = (id: string) => {
    const glasses: Record<string, string> = {
      none: "No Glass",
      clear: "Clear Glass",
      frosted: "Frosted Glass",
      stained: "Stained Glass",
    };
    return glasses[id] || id;
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {formData.isSubmitted ? "Quote Request Sent!" : "Request a Quote"}
          </DialogTitle>
        </DialogHeader>

        {formData.isSubmitted ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-green-600">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                <Check className="h-10 w-10" />
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">
              Thank you for your request!
            </h3>
            <p className="text-gray-600 mb-4">
              We'll get back to you with a detailed quote shortly.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 max-w-md mx-auto">
              <p className="text-sm text-amber-800">
                A confirmation email has been sent to {formData.email}. Please
                check your inbox.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg border-b pb-2">
                  Your Information
                </h3>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific requirements or questions?"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg border-b pb-2 mb-4">
                  Order Summary
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0"
                    >
                      <h4 className="font-medium">{item.productName}</h4>
                      <div className="mt-2 text-sm text-gray-600 space-y-1">
                        <p>Material: {getMaterialName(item.materialType)}</p>
                        <p>Finish: {getFinishName(item.colorFinish)}</p>
                        <p>Glass: {getGlassName(item.glassPanel)}</p>
                        <p>
                          Size:
                          {item.dimensions.isCustom
                            ? `${item.dimensions.width}" × ${item.dimensions.height}" (Custom)`
                            : '36" × 80" (Standard)'}
                        </p>
                        <p className="font-medium text-primary">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Estimate:</span>
                    <span className="text-xl font-bold text-primary">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * This is an estimated price. Our team will review your
                    request and provide a final quote.
                  </p>
                </div>
              </div>
            </div>

            {formData.error && (
              <p className="text-red-500 text-sm">{formData.error}</p>
            )}

            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={formData.isSubmitting}
                className="sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={formData.isSubmitting}
                className="sm:order-2 gap-2"
              >
                {formData.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Mail size={16} />
                    Send Quote Request
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
