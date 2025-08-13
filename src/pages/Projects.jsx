import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Web Development Expertise",
    tagline: "Building fast and scalable web apps with React & Node.js.",
    image: "https://unsplash.com/photos/black-flat-screen-computer-monitor-EZrVFJUysLkauto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Modern UI/UX Design",
    tagline: "Creating clean, user-friendly interfaces and experiences.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Surveillance & Networking",
    tagline: "Integrated security and network solutions for homes and businesses.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Projects() {
  return (
    <>
      {/* Full width carousel */}
      <div className="w-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            hideOnClick: true,
            enabled: true,
          }}
          breakpoints={{
            0: { navigation: false },
            768: { navigation: true },
          }}
          style={{ width: "100vw", height: "400px" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-full flex flex-col justify-center items-center text-center text-white px-4"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                }}
              >
                <div className="max-w-6xl mx-auto">
                  <h2
                    className="text-4xl sm:text-3xl xs:text-2xl font-bold mb-2 drop-shadow-lg"
                    style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="text-lg sm:text-base xs:text-sm drop-shadow-md"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                  >
                    {slide.tagline}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main page content constrained */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Placeholder: Stats Section */}
        <div id="stats" className="mb-16">
          {/* TODO: Add animated stats here */}
        </div>

        {/* Placeholder: Slidable Projects Grid */}
        <div id="project-grid" className="mb-16">
          {/* TODO: Add 2 by 1 slidable project grid here */}
        </div>

        {/* Placeholder: Blog Section */}
        <div id="blog-section" className="mb-16">
          {/* TODO: Add blog previews here */}
        </div>
      </section>
    </>
  );
}
