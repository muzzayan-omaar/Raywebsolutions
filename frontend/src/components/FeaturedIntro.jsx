import React from "react";
import { motion } from "framer-motion";

const FeaturedIntro = () => {
  return (
    <section className="relative z-10 mt-20 flex justify-center px-4">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl max-w-4xl w-full px-8 py-6 text-center">
        
        {/* 👇 Text Motion Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            We build elegant digital experiences that drive business growth
          </h2>
          <p className="text-sm md:text-base text-gray-300 mt-3">
            ✦ Web Design · UI/UX · SEO Optimization · Strategy
          </p>
        </motion.div>

        {/* 👇 Image Motion Section */}
        <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
          <motion.img
            src="/assets/featured-mashup.png"
            alt="Digital Services Mashup"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedIntro;
