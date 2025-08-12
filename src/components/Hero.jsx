import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const offersData = [
  {
    title: "Web Development Offer",
    desc: "Get 20% off all website packages this week only.",
    icon: "💻",
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
  },
  {
    title: "App Development Offer",
    desc: "Custom mobile apps at a discounted rate for a limited time.",
    icon: "📱",
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours from now
  },
  {
    title: "CCTV Installation Offer",
    desc: "Free site survey + 10% discount on CCTV systems.",
    icon: "🎥",
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  // Update carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offersData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const endTime = offersData[activeIndex].endTime.getTime();
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeOffer = offersData[activeIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-dark overflow-hidden pt-20">
      {/* Glow background curve */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150vw] h-[150vw] bg-gradient-radial from-accent/40 to-transparent rounded-full -z-10 blur-2xl opacity-40" />

      {/* Branding Line */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-sm tracking-widest uppercase bg-[#111] text-gray-300 px-4 py-1 rounded-full border border-gray-700"
      >
        <strong className="text-white">RayWebSolutions</strong> — Digital Design & Development
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl text-white"
      >
        Empowering Brands with <span className="text-primary">Modern Design</span>
        <br />& Smart Development
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-gray-400 max-w-md"
      >
        Crafting high-impact websites, apps, and strategies for businesses in the UAE and beyond.
      </motion.p>

      {/* Carousel Offers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 w-full max-w-lg bg-[#111] border border-gray-700 rounded-lg p-4 text-white"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{activeOffer.icon}</span>
          <div className="text-left">
            <h3 className="text-lg font-bold">{activeOffer.title}</h3>
            <p className="text-gray-400 text-sm">{activeOffer.desc}</p>
            <p className="mt-2 text-primary font-semibold">⏳ {timeLeft}</p>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8"
      >

      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 flex flex-col items-center text-gray-500 text-xs animate-bounce"
      >
        <span>Scroll Down</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
};

export default Hero;
