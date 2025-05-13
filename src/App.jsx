import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import FeaturedIntro from "./components/FeaturedIntro";
import Testimonial from "./components/Testimonial";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import WhatsAppFloatingButton from "./components/WhatsAppEmailFloatingButtons";
import Contact from "./pages/Contact";

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
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </Router>
  );
}

export default App;
