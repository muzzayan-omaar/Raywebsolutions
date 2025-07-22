import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import FeaturedIntro from "./components/FeaturedIntro";
import Testimonial from "./components/Testimonial";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import WhatsAppFloatingButton from "./components/WhatsAppEmailFloatingButtons";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Templates from "./pages/Templates";
import RegisterProject from "./pages/RegisterProject";

function App() {
  return (
    <Router>
      <div className="bg-dark text-white min-h-screen">
        <Navbar />
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
          <Route path="/templates/:plan" element={<Templates />} />
          <Route path="/register-project" element={<RegisterProject />} />

        </Routes>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </Router>
  );
}

export default App;
