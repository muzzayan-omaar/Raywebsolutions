import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const AdminPricing = () => {
  const [packages, setPackages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [formerPrice, setFormerPrice] = useState("");
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [popular, setPopular] = useState(false);
  const [openFeatureIndex, setOpenFeatureIndex] = useState(null);

  // Fetch existing packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("/api/admin/packages");
        setPackages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Name and Price are required");
    const pkg = { name, price, formerPrice, features, popular };
    try {
      const res = await axios.post("/api/admin/packages", pkg);
      setPackages([...packages, res.data]);
      // Reset form
      setName("");
      setPrice("");
      setFormerPrice("");
      setFeatures([]);
      setPopular(false);
    } catch (err) {
      console.error(err);
      alert("Error creating package");
    }
  };

  return (
    <div className="p-6 bg-dark min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Packages</h2>

      {/* Package Creation Form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Package Name"
            className="p-2 rounded bg-gray-800 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price (AED)"
            className="p-2 rounded bg-gray-800 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Former Price (Optional)"
            className="p-2 rounded bg-gray-800 w-full"
            value={formerPrice}
            onChange={(e) => setFormerPrice(e.target.value)}
          />
        </div>

        {/* Popular Radio */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={popular === true}
              onChange={() => setPopular(true)}
            />
            Popular
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={popular === false}
              onChange={() => setPopular(false)}
            />
            Normal
          </label>
        </div>

        {/* Features input */}
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Feature"
              className="p-2 rounded bg-gray-800 flex-1"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            />
            <button
              type="button"
              onClick={addFeature}
              className="bg-primary px-4 rounded font-semibold"
            >
              Add
            </button>
          </div>
          {/* Features list with scroll */}
          <div className="max-h-40 overflow-y-auto mt-2 border border-gray-700 rounded p-2 space-y-1">
            {features.map((feat, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-800 p-1 rounded"
              >
                <span>{feat}</span>
                <button onClick={() => removeFeature(i)}>
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-black px-6 py-2 rounded font-semibold mt-2 hover:bg-sky-400 transition"
        >
          Create Package
        </button>
      </form>

      {/* Display Existing Packages */}
      <h3 className="text-xl font-semibold mb-4">Existing Packages</h3>
      <div className="flex flex-wrap gap-6">
        {packages.map((pkg, index) => {
          const mainFeatures = pkg.features.slice(0, 4);
          const otherFeatures = pkg.features.slice(4);
          const savings =
            pkg.formerPrice && pkg.price
              ? `Save AED ${parseInt(pkg.formerPrice) - parseInt(pkg.price)}`
              : null;

          return (
            <div
              key={pkg._id}
              className={`relative w-full md:w-[300px] ${
                pkg.popular ? "md:w-[340px] scale-105 z-10" : ""
              } bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-semibold shadow">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>

              {pkg.formerPrice && (
                <div className="text-sm text-gray-400 line-through mb-1">{`AED ${pkg.formerPrice}`}</div>
              )}
              <p className="text-3xl font-bold text-primary mb-2">{`AED ${pkg.price}`}</p>
              {savings && (
                <div className="inline-block bg-green-500 text-black px-2 py-1 rounded-full text-xs font-semibold mb-4">
                  {savings}
                </div>
              )}

              {/* Main Features */}
              <div className="max-h-40 overflow-y-auto space-y-2 text-sm">
                {mainFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    {f}
                  </div>
                ))}
              </div>

              {/* Collapsible Other Features */}
              {otherFeatures.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() =>
                      setOpenFeatureIndex(openFeatureIndex === index ? null : index)
                    }
                    className="flex items-center gap-1 text-primary hover:underline text-sm mt-2"
                  >
                    {openFeatureIndex === index ? "Hide Other Features" : "Show Other Features"}
                    {openFeatureIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openFeatureIndex === index && (
                    <div className="mt-2 text-sm space-y-1 text-gray-300 max-h-36 overflow-y-auto">
                      {otherFeatures.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-blue-400" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPricing;
