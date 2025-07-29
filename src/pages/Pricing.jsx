import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



const packages = [
  {
    title: "Starter",
    price: "AED 799",
    features: ["1 Page Website", "Mobile Friendly", "Basic SEO", "Delivery in 3 days"],
    collapsible: ["1 Contact Form", "1 Revision"],
  },
  {
    title: "Professional",
    price: "AED 1499",
    features: [
      "Multi-Page Website",
      "Animations + Scroll Effects",
      "Advanced SEO Setup",
      "WhatsApp Integration",
      "Delivery in 5 days",
    ],
    collapsible: ["2 Revisions", "Free Support for 14 Days"],
    popular: true,
  },
  {
    title: "eCommerce",
    price: "AED 2499",
    features: [
      "Online Store (Up to 30 Products)",
      "Cart + Checkout",
      "Payment Gateway",
      "Shopify or Custom",
      "Inventory System",
    ],
    collapsible: ["Training Video", "Free Support for 30 Days"],
  },
];

const faqs = [
  {
    question: "Can I upgrade my package later?",
    answer: "Yes! You can always upgrade your plan. We'll adjust pricing based on what's already been delivered.",
  },
  {
    question: "What platforms do you build with?",
    answer: "We use modern stacks like React and Next.js. For eCommerce, we offer Shopify or a custom CMS-based store.",
  },
  {
    question: "How do I request a custom plan?",
    answer: "Click the 'Request Custom Plan' button above or contact us directly through the contact page.",
  },
  {
    question: "Do I own the website after delivery?",
    answer: "Absolutely. Once it's delivered, it's 100% yours including the code and content.",
  },
];

const Pricing = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 md:px-10 bg-dark text-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Pricing Packages</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose a package that fits your business needs. All packages include responsive design, fast delivery, and premium support.
        </p>
      </motion.div>

      {/* Packages */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 flex-wrap">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative w-full md:w-[300px] ${
              pkg.popular ? "md:w-[340px] scale-105 z-10" : ""
            } bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-105`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-semibold shadow">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
            <p className="text-3xl font-bold text-primary mb-4">{pkg.price}</p>
            <ul className="space-y-2 text-sm">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Collapsible */}
            <div className="mt-4">
              <button
                onClick={() => toggleCollapse(index)}
                className="flex items-center gap-1 text-primary hover:underline text-sm mt-2"
              >
                {openIndex === index ? "Hide Extras" : "Show Extras"}
                {openIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openIndex === index && (
                <ul className="mt-2 text-sm space-y-1 text-gray-300">
                  {pkg.collapsible.map((extra, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-blue-400" />
                      {extra}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              to={`/templates/${pkg.title.toLowerCase()}`}
              className="w-full inline-block mt-6 bg-primary text-black py-2 rounded-full text-center font-semibold hover:bg-sky-400 transition"
            >
              View Templates
            </Link>
          </motion.div>
        ))}

        {/* Custom Plan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full md:w-[300px] bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 rounded-2xl p-6 shadow-xl text-center"
        >
          <h3 className="text-xl font-semibold mb-2 text-white">Need Something Custom?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Not sure which package fits your business? Let's create a custom plan tailored to your needs.
          </p>
          <button className="w-full mt-4 bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Request Custom Plan
          </button>
        </motion.div>
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-20 overflow-x-auto"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Compare Packages</h3>
        <table className="w-full text-sm text-left text-gray-300 border border-white/10">
          <thead className="bg-white/5 text-white">
            <tr>
              <th className="px-4 py-2">Feature</th>
              <th className="px-4 py-2 text-center">Starter</th>
              <th className="px-4 py-2 text-center">Professional</th>
              <th className="px-4 py-2 text-center">eCommerce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {[
              ["Pages", "1", "5+", "10+"],
              ["Animations", "✖️", "✅", "✅"],
              ["Mobile Responsive", "✅", "✅", "✅"],
              ["Online Store", "✖️", "✖️", "✅"],
              ["Payment Integration", "✖️", "✖️", "✅"],
              ["Delivery", "3 Days", "5 Days", "7 Days"],
            ].map(([feature, s, p, e], idx) => (
              <tr key={idx}>
                <td className="px-4 py-3">{feature}</td>
                <td className="text-center">{s}</td>
                <td className="text-center">{p}</td>
                <td className="text-center">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">FAQs</h3>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === `faq-${idx}`;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-white/10 py-4 cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : `faq-${idx}`)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">{faq.question}</h4>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {isOpen && <p className="text-sm text-gray-400 mt-2">{faq.answer}</p>}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Pricing;
