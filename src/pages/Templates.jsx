import { useParams } from "react-router-dom";
import templates from "../data/templatesData";
import { motion } from "framer-motion";
import { useState } from "react";
import TemplateSelectionModal from "../components/TemplateSelectionModal";

const Templates = () => {
  const { plan } = useParams();
  const isFilterable = plan === "starter" || plan === "professional";

  // Filter templates for the current plan
  const templatesForPlan = templates.filter(
    (tpl) => tpl.category.toLowerCase() === plan.toLowerCase()
  );

  // Extract unique subcategories
  const categories = Array.from(
    new Set(templatesForPlan.map((tpl) => tpl.subCategory || "Other"))
  ).sort();

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filteredTemplates =
    activeCategory === "all"
      ? templatesForPlan
      : templatesForPlan.filter(
          (tpl) => (tpl.subCategory || "Other") === activeCategory
        );

  const handleSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <section className="pt-28 pb-16 px-6 md:px-16 bg-dark text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 capitalize">
          {plan} Plan Templates
        </h2>

        {/* Filter Bar */}
        {isFilterable && categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              className={`px-4 py-1.5 rounded-full text-sm border ${
                activeCategory === "all"
                  ? "bg-white text-black"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
              onClick={() => setActiveCategory("all")}
            >
              Show All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm border ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Template Cards */}
        {filteredTemplates.length === 0 ? (
          <p>No templates available for this plan yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredTemplates.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={tpl.image}
                  alt={tpl.title}
                  className="w-full h-64 object-cover transition-all duration-300 group-hover:blur-sm"
                />

                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={tpl.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black text-sm px-4 py-2 rounded shadow hover:bg-gray-200"
                  >
                    View Demo
                  </a>
                  <button
                    onClick={() => handleSelect(tpl)}
                    className="bg-primary text-black text-sm px-4 py-2 rounded shadow hover:bg-sky-400"
                  >
                    Use This
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Template Selection Modal */}
      {selectedTemplate && (
        <TemplateSelectionModal
          isOpen={!!selectedTemplate}
          template={selectedTemplate}
          plan={plan}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Templates;
