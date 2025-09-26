import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// Fix marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

// Expanded coverage
const coverageLocations = [
  { name: "Abu Dhabi", coords: [24.4539, 54.3773] },
  { name: "Dubai", coords: [25.276987, 55.296249] },
  { name: "Sharjah", coords: [25.3463, 55.4209] },
  // Uganda
  { name: "Kampala", coords: [0.3476, 32.5825] },
  { name: "Entebbe", coords: [0.0510, 32.4609] },
  { name: "Gulu", coords: [2.7724, 32.2881] },
  // Europe
  { name: "London", coords: [51.5074, -0.1278] },
  { name: "Paris", coords: [48.8566, 2.3522] },
  { name: "Berlin", coords: [52.5200, 13.4050] },
];

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "email-raywebsolutions",
        "template_qt942y3",
        formRef.current,
        "bJ9wpm7S0nRz4CjZq"
      )
      .then(() => {
        toast.success("✅ Message sent successfully!");
        formRef.current.reset();
      })
      .catch(() => {
        toast.error("❌ Failed to send message. Try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="pt-28 pb-20 px-6 md:px-16 bg-dark text-white">
      <motion.div
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Contact Form */}
        <div className="space-y-6 bg-[#0f1115] p-8 rounded-2xl shadow-lg border border-white/10">
          <h2 className="text-3xl font-bold mb-4 text-white">Let’s Work Together</h2>
          <p className="text-gray-400 mb-6">
            Got a project in mind or just want to say hello? Drop a message below or reach out through our socials.
          </p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
              <textarea
                rows="5"
                name="message"
                required
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
            </motion.div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-sky-400 text-black font-medium px-6 py-3 rounded-full transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map + Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-2">Our Coverage</h3>
          <MapContainer
            center={[24.4539, 54.3773]} // Abu Dhabi
            zoom={2}
            scrollWheelZoom={false}
            className="h-96 w-full rounded-xl overflow-hidden border border-white/10 shadow-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {coverageLocations.map((loc, i) => (
              <Marker key={i} position={loc.coords}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="text-sm text-gray-400 space-y-1">
            <p>Email:{" "}
              <a href="mailto:support@raywebsolutions.com" className="text-primary hover:underline">
                support@raywebsolutions.com
              </a>
            </p>
            <p>Phone: +971 52 494 7730</p>
            <p>
              Areas: Abu Dhabi, Dubai, Sharjah, Kampala, Entebbe, Gulu, London, Paris, Berlin
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
