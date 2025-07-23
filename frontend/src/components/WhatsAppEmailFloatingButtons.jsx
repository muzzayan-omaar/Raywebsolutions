import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const WhatsAppEmailFloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Email Button */}
      <a
        href="mailto:raywebsolutionss@gmail.com"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title="Email Us"
      >
        <FaEnvelope size={20} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+971582469913"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </a>
    </div>
  );
};

export default WhatsAppEmailFloatingButtons;
