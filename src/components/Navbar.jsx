import { Menu } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const formRef = useRef();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter a valid email.");
    }

    const templateParams = {
      user_email: email,
    };

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_PUBLIC_KEY")
      .then(() => {
        toast.success("Subscribed successfully!");
        setEmail("");
        setShowNewsletter(false);
      })
      .catch(() => {
        toast.error("Subscription failed. Try again.");
      });
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-50">
      <nav className="relative backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between text-white">

        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          Ray<span className="text-primary">Websolutions®</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li><Link to="/" className="block hover:text-primary">Home</Link></li>
          <li><Link to="/pricing" className="hover:text-primary transition">Packages</Link></li>
          <li><Link to="/projects" className="block hover:text-primary">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
        </ul>

{/* CTA: Toggle newsletter */}
<button
  onClick={() => setShowNewsletter(!showNewsletter)}
  className="hidden md:inline-block bg-[#0a2540] border border-[#1e4b7a] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#163d66] hover:border-[#3a7bbf] transition"
>
  {showNewsletter ? "Close" : "Subscribe"}
</button>


        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <Menu size={24} />
        </button>

        {/* Floating Newsletter Form */}
        <AnimatePresence>
          {showNewsletter && (
            <motion.form
              onSubmit={handleNewsletterSubmit}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full right-0 mt-2 bg-dark border border-white/10 rounded-xl shadow-lg p-4 w-72 z-50"
              ref={formRef}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white border border-white/10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
<button
  type="submit"
  className="mt-3 w-full bg-[#0a2540] border border-[#1e4b7a] text-white font-medium px-4 py-2 rounded-full hover:bg-[#163d66] hover:border-[#3a7bbf] transition"
>
  Subscribe
</button>

            </motion.form>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/5 backdrop-blur-lg border border-white/10 shadow-md rounded-xl text-white text-sm font-medium p-4 space-y-2">
          <Link to="/" className="block hover:text-primary">Home</Link>
          <Link to="/pricing" className="block hover:text-primary">Packages</Link>
          <Link to="/projects" className="block hover:text-primary">Blog</Link>
          <Link to="/contact" className="block hover:text-primary">Contact</Link>
<button
  type="submit"
  className="mt-3 w-full bg-[#0a2540] border border-[#1e4b7a] text-white font-medium px-4 py-2 rounded-full hover:bg-[#163d66] hover:border-[#3a7bbf] transition"
>
  Subscribe
</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
