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

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  customization: ProductCustomization | null;
}

export default function QuoteRequestForm({
  isOpen,
  onClose,
  customization,
}: QuoteRequestFormProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {formData.isSubmitted ? "Quote Request Sent!" : "Request a Quote"}
          </DialogTitle>
        </DialogHeader>

        {formData.isSubmitted ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mb-2">Thank you for your request!</p>
            <p className="text-sm text-gray-600">
              We'll get back to you with a quote shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {customization && (
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="font-medium mb-2">
                  Selected Door Specifications
                </h3>
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="font-medium">Product:</span>{" "}
                    {customization.productName}
                  </li>
                  <li>
                    <span className="font-medium">Material:</span>{" "}
                    {getMaterialName(customization.materialType)}
                  </li>
                  <li>
                    <span className="font-medium">Finish:</span>{" "}
                    {getFinishName(customization.colorFinish)}
                  </li>
                  <li>
                    <span className="font-medium">Glass:</span>{" "}
                    {getGlassName(customization.glassPanel)}
                  </li>
                  <li>
                    <span className="font-medium">Dimensions:</span>
                    {customization.dimensions.isCustom
                      ? `${customization.dimensions.width}" × ${customization.dimensions.height}" (Custom)`
                      : '36" × 80" (Standard)'}
                  </li>
                  <li>
                    <span className="font-medium">Estimated Price:</span> $
                    {customization.totalPrice.toFixed(2)}
                  </li>
                </ul>
              </div>
            )}

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

            {formData.error && (
              <p className="text-red-500 text-sm">{formData.error}</p>
            )}

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={formData.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={formData.isSubmitting}>
                {formData.isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
