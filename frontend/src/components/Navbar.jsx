import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-50">
      <nav className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between text-white">

        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          Ray<span className="text-primary">Websolutions&reg;</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li><a href="/" className="hover:text-primary transition">Home</a></li>
          <li>
            <Link to="/pricing" className="hover:text-primary transition">
              Pricing
            </Link>
          </li>
          <li><a href="#projects" className="hover:text-primary transition">Projects</a></li>
          <li>
            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-block bg-primary text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-400 transition"
        >
          Subscribe
        </Link>

        {/* Mobile Menu Icon */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/5 backdrop-blur-lg border border-white/10 shadow-md rounded-xl text-white text-sm font-medium p-4 space-y-2">
          <a href="#about" className="block hover:text-primary">About</a>
          <Link to="/pricing" className="block hover:text-primary">Pricing</Link>
          <a href="#projects" className="block hover:text-primary">Projects</a>
          <Link to="/contact" className="block hover:text-primary">Contact</Link>
          <Link
            to="/contact"
            className="block mt-2 bg-primary text-black px-4 py-2 rounded-full text-center"
          >
            Get In Touch
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
