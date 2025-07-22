import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-dark overflow-hidden">

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

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <a 
          href="/pricing" 
          className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-sky-400 transition"
        >
          Get Started!
          <ArrowRight size={16} />
        </a>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 flex flex-col items-center text-gray-500 text-xs animate-bounce"
      >
        <span>Scroll Down</span>
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
};

export default Hero;
