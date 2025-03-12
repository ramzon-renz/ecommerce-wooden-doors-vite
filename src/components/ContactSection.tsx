import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    isSubmitting: false,
    isSubmitted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, isSubmitting: true }));

    // Simulate API call for email sending
    try {
      // In a real application, you would use EmailJS or a similar service here
      // Example with EmailJS would be:
      // await emailjs.send('service_id', 'template_id', formData, 'user_id');

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormData((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
      }));

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          isSubmitting: false,
          isSubmitted: false,
        });
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setFormData((prev) => ({ ...prev, isSubmitting: false }));
      alert("Failed to send your message. Please try again.");
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-serif dark:text-white">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about our wooden doors or need a custom solution? Our
            team is here to help you find the perfect door for your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              Get in Touch
            </h3>

            {formData.isSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                <div className="text-green-600 dark:text-green-400 mb-4">
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
                <h4 className="text-xl font-medium mb-2 dark:text-white">
                  Message Sent!
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="dark:text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="dark:text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your email"
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="dark:text-white">
                    Phone (Optional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Your phone number"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message" className="dark:text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={formData.isSubmitting}
                >
                  {formData.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary dark:text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    (123) 456-7890
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Mon-Fri, 9am-5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary dark:text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    info@woodendoors.example
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    support@woodendoors.example
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary dark:text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">WhatsApp</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    +1 (123) 456-7890
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() =>
                      window.open("https://wa.me/1234567890", "_blank")
                    }
                  >
                    Chat Now
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary dark:text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">Showroom</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Woodcraft Avenue
                    <br />
                    Doorville, CA 90210
                    <br />
                    United States
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    <strong>Hours:</strong> Monday-Saturday, 10am-6pm
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-4 dark:text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-primary dark:text-primary-foreground" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary dark:text-primary-foreground" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-primary dark:text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
