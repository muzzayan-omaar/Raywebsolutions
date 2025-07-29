import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with RayWebSolutions was a game-changer. The site was sleek, fast, and exactly what our business needed.",
    name: "Ali Mansoor",
    role: "Founder, BlueWave Tech",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    quote:
      "They truly understand modern design. Clean code, clean UI, and great communication.",
    name: "Sarah El Zayed",
    role: "Marketing Head, Glow Beauty",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
  },
  {
    quote:
      "The process was smooth and the results were beyond expectations. Highly recommended!",
    name: "Mohammed Qasim",
    role: "Operations Manager, UAE Logistics",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
    rating: 5,
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <div className="bg-[#0e0f11] mt-7 text-white py-20 px-4 md:px-12 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
        What Our Clients Say
      </h2>

      <div className="max-w-3xl mx-auto text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Client Image */}
            <div className="flex justify-center">
              <img
                src={current.image}
                alt={current.name}
                className="w-20 h-20 rounded-full border-2 border-white shadow-md object-cover"
              />
            </div>

            {/* Quote */}
            <p className="text-xl leading-relaxed text-gray-300 italic">
              “{current.quote}”
            </p>

            {/* Star Ratings */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < current.rating ? "text-yellow-400" : "text-gray-600"
                  }`}
                  fill={i < current.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            {/* Name and Role */}
            <div className="text-sm uppercase tracking-wide text-gray-400">
              {current.name} — {current.role}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-gray-600 hover:bg-gray-800 transition"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-600 hover:bg-gray-800 transition"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
