import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "The craftsmanship of our new mahogany front door is exceptional. It's become the focal point of our home's exterior and we've received countless compliments from neighbors.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Interior Designer",
    company: "Modern Spaces",
    content:
      "As a designer, I'm extremely particular about details. The custom barn doors I ordered exceeded my expectations in both quality and aesthetic appeal. My clients are thrilled!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Contractor",
    company: "Elite Renovations",
    content:
      "I've worked with many door suppliers over the years, but none match the quality and reliability I've experienced with this company. Their doors are consistently excellent.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Homeowner",
    content:
      "The custom glass panel door we ordered transformed our living space, bringing in beautiful natural light while maintaining privacy. Worth every penny!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: "5",
    name: "Olivia Parker",
    role: "Architect",
    company: "Parker & Associates",
    content:
      "The attention to detail and precision in the custom doors I specified for my client's luxury home renovation was impeccable. The installation team was equally professional.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-serif">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about our wooden doors and service.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <Carousel
            opts={{
              loop: true,
              align: "center",
            }}
            className="w-full"
            onSelect={(api) => {
              if (api) {
                setCurrentIndex(api.selectedScrollSnap());
              }
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center p-6 h-full"
                  >
                    <div className="mb-6 text-amber-600">
                      <Quote size={36} />
                    </div>

                    <p className="text-gray-700 mb-6 italic text-lg">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-amber-600 w-4" : "bg-gray-300"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
