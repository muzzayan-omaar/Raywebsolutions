import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import FeaturedIntro from "./components/FeaturedIntro";
import Testimonial from "./components/Testimonial";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import WhatsAppFloatingButton from "./components/WhatsAppEmailFloatingButtons";
import AssistantWidget from "./components/AssistantWidget"; // 👈 new import

import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import RegisterProject from "./pages/RegisterProject";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="bg-dark text-white min-h-screen">
        <Navbar />

        {/* Toast notification handler */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0b1120",
              color: "#fff",
              border: "1px solid #1e293b",
            },
          }}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeaturedIntro />
                <Testimonial />
                <CTASection />
                <SpeedInsights />
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/templates/:plan" element={<Templates />} />
          <Route path="/register-project" element={<RegisterProject />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>

        <Footer />
        <WhatsAppFloatingButton />
        <AssistantWidget /> {/* 👈 floating assistant added */}
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
