import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Homeowner",
    content:
      "The craftsmanship of our new mahogany front door is exceptional. It's become the focal point of our home's exterior and we've received countless compliments from neighbors.",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Interior Designer",
    content:
      "As a designer, I'm extremely particular about details. The custom barn doors I ordered exceeded my expectations in both quality and aesthetic appeal. My clients are thrilled!",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Contractor",
    content:
      "I've worked with many door suppliers over the years, but none match the quality and reliability I've experienced with this company. Their doors are consistently excellent.",
    rating: 4,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Homeowner",
    content:
      "The custom glass panel door we ordered transformed our living space, bringing in beautiful natural light while maintaining privacy. Worth every penny!",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "5",
    name: "Olivia Parker",
    role: "Architect",
    content:
      "The attention to detail and precision in the custom doors I specified for my client's luxury home renovation was impeccable. The installation team was equally professional.",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
];

export default function TestimonialsSection() {
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

        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-full md:basis-1/2 lg:basis-1/3 p-2"
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 text-primary">
                      <Quote size={24} className="opacity-50" />
                    </div>

                    <p className="text-gray-700 mb-4 flex-grow">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center mt-4">
                      {testimonial.avatarUrl && (
                        <div className="mr-4">
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < testimonial.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
