import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative py-20 px-6 md:px-16 flex justify-center items-center mt-20">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl w-full max-w-4xl text-center px-6 py-16 shadow-lg">

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
          href="#contact"
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
