import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="bg-[#0e0f11] py-20 px-4 md:px-12 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-white">
        What Our Clients Say
      </h2>

      <div className="max-w-3xl mx-auto text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1c21] rounded-3xl p-8 shadow-lg flex flex-col items-center space-y-6"
          >
            {/* Client Image */}
            <img
              src={current.image}
              alt={current.name}
              className="w-24 h-24 rounded-full border-2 border-white/20 shadow-md object-cover"
            />

            {/* Quote */}
            <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed">
              “{current.quote}”
            </p>

            {/* Star Ratings */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={22}
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
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:bg-gray-800 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:bg-gray-800 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
