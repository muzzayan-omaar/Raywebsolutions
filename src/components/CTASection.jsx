import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative py-20 px-6 md:px-16 flex justify-center items-center mt-20 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={{
          background: "linear-gradient(270deg, #0a2540, #163d66, #0a2540)",
          backgroundSize: "600% 600%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating abstract circles */}
<motion.div
  className="absolute inset-0 -z-10"
>
  {[...Array(8)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-white/20 blur-3xl"
      style={{
        width: `${80 + i * 20}px`,
        height: `${80 + i * 20}px`,
        top: `${i * 10 + 10}%`,
        left: `${i * 15 + 5}%`,
      }}
      animate={{
        x: [0, 20, -20, 0],
        y: [0, -15, 15, 0],
      }}
      transition={{
        duration: 25 + i * 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    ></motion.div>
  ))}
</motion.div>


      {/* CTA content */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl w-full max-w-4xl text-center px-6 py-16 shadow-lg relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-white mb-4"
        >
          Let’s Create Your Digital Presence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-300 max-w-xl mx-auto mb-8"
        >
          Looking for a website that speaks modern design and real results? Let’s team up and build something powerful.
        </motion.p>

        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full text-sm md:text-base transition duration-300 shadow-md"
        >
          Start a Project
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;
