import { FaInstagram, FaLinkedin, FaBehance, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0D1117] text-gray-400 px-6 md:px-16 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Copyright */}
        <div>
          <h1 className="text-white text-xl font-semibold mb-2">RayWebSolutions</h1>
          <p className="text-sm">Empowering brands with bold digital solutions.</p>
          <p className="mt-2 text-xs text-gray-600">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Navigation & Socials */}
        <div className="flex flex-col md:items-end gap-4">
          <div className="flex gap-6 text-lg">
            <a href="https://instagram.com/ssekateraymond/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/muzzayan-omaar/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a>
          </div>
          <a href="#top" className="text-sm text-blue-400 hover:text-white transition">Back to Top ↑</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
