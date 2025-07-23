import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";

import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("email-raywebsolutions", "template_qt942y3", formRef.current, "bJ9wpm7S0nRz4CjZq")
      .then(
        () => {
          toast.success("Message sent successfully!");
          formRef.current.reset();
        },
        () => {
          toast.error("Failed to send message. Please try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="pt-28 pb-20 px-6 md:px-16 bg-dark text-white">
      {/* Toast */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-4 text-white">Let’s Work Together</h2>
          <p className="text-gray-400 mb-6">
            Got a project in mind or just want to say hello? Drop a message below or reach out through our socials.
          </p>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
              <textarea
                rows="5"
                name="message"
                required
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
            </div>

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
            zoom={8}
            scrollWheelZoom={false}
            className="h-96 w-full rounded-xl overflow-hidden border border-white/10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[24.4539, 54.3773]}>
              <Popup>Abu Dhabi</Popup>
            </Marker>
            <Marker position={[25.276987, 55.296249]}>
              <Popup>Dubai</Popup>
            </Marker>
            <Marker position={[25.3463, 55.4209]}>
              <Popup>Sharjah</Popup>
            </Marker>
          </MapContainer>

          <div className="text-sm text-gray-400">
            <p>Email: <a href="mailto:raywebsolutionss@gmail.com" className="text-primary hover:underline">support@raywebsolutions.com</a></p>
            <p>Phone: +971 52 494 7730</p>
            <p>Areas: Abu Dhabi, Dubai, Sharjah</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
