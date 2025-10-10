import { useState, useEffect } from "react";
import axios from "axios";

const AdminPricing = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    formerPrice: "",
    features: [""],
    extraFeatures: [],
    popular: false,
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Unified fetch
  const fetchPackages = async () => {
    try {
      const res = await axios.get("https://rayweb-backend.onrender.com/api/admin/packages");
      const data = Array.isArray(res.data) ? res.data : res.data.packages;
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setPackages([]);
    }
  };

  // ✅ Single useEffect
  useEffect(() => {
    fetchPackages();
  }, []);

  // Handle input changes
  const handleChange = (e, index, type) => {
    if (type === "feature") {
      const updated = [...formData.features];
      updated[index] = e.target.value;
      setFormData({ ...formData, features: updated });
    } else if (type === "extra") {
      const updated = [...formData.extraFeatures];
      updated[index] = e.target.value;
      setFormData({ ...formData, extraFeatures: updated });
    } else if (type === "radio") {
      setFormData({ ...formData, popular: e.target.value === "true" });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Add new feature input
  const addFeature = (type) => {
    if (type === "feature") {
      setFormData({ ...formData, features: [...formData.features, ""] });
    } else {
      setFormData({ ...formData, extraFeatures: [...formData.extraFeatures, ""] });
    }
  };

  // Remove feature input
  const removeFeature = (index, type) => {
    if (type === "feature") {
      const updated = [...formData.features];
      updated.splice(index, 1);
      setFormData({ ...formData, features: updated });
    } else {
      const updated = [...formData.extraFeatures];
      updated.splice(index, 1);
      setFormData({ ...formData, extraFeatures: updated });
    }
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      formerPrice: formData.formerPrice ? parseFloat(formData.formerPrice) : null,
      features: formData.features.filter((f) => f.trim() !== ""),
      extraFeatures: formData.extraFeatures.filter((f) => f.trim() !== ""),
      popular: formData.popular,
    };

    try {
      if (editingId) {
        await axios.put(
          `https://rayweb-backend.onrender.com/api/admin/packages/${editingId}`,
          payload
        );
      } else {
        await axios.post(
          "https://rayweb-backend.onrender.com/api/admin/packages",
          payload
        );
      }

      setFormData({
        name: "",
        price: "",
        formerPrice: "",
        features: [""],
        extraFeatures: [],
        popular: false,
      });
      setEditingId(null);
      fetchPackages();
    } catch (err) {
      console.error("Error saving package:", err);
    }
  };

  // Delete package
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await axios.delete(`https://rayweb-backend.onrender.com/api/admin/packages/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  // Edit package
  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      formerPrice: pkg.formerPrice || "",
      features: pkg.features || [""],
      extraFeatures: pkg.extraFeatures || [],
      popular: pkg.popular || false,
    });
  };

  const getSavings = (pkg) => {
    if (pkg.formerPrice) return pkg.formerPrice - pkg.price;
    return 0;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Packages</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 border border-gray-700 p-4 rounded space-y-4 bg-gray-900"
      >
        <div>
          <label className="block mb-1">Package Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Former Price</label>
            <input
              type="number"
              name="formerPrice"
              value={formData.formerPrice}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800"
            />
          </div>
        </div>

        {/* Popular Badge */}
        <div className="flex gap-4 items-center">
          <span>Popular Badge:</span>
          <label>
            <input
              type="radio"
              name="popular"
              value={true}
              checked={formData.popular === true}
              onChange={(e) => handleChange(e, null, "radio")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="popular"
              value={false}
              checked={formData.popular === false}
              onChange={(e) => handleChange(e, null, "radio")}
            />{" "}
            No
          </label>
        </div>

        {/* Features */}
        <div>
          <label className="block mb-1">Features (max 4 visible)</label>
          <div className="max-h-40 overflow-y-auto border border-gray-700 rounded p-2 space-y-1">
            {formData.features.map((feat, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleChange(e, idx, "feature")}
                  className="flex-1 p-1 rounded bg-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx, "feature")}
                  className="px-2 bg-red-500 rounded"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addFeature("feature")}
            className="mt-2 px-3 py-1 bg-green-500 rounded"
          >
            + Add Feature
          </button>
        </div>

        {/* Extra Features */}
        <div>
          <label className="block mb-1">Extra Features (collapsible in frontend)</label>
          <div className="max-h-40 overflow-y-auto border border-gray-700 rounded p-2 space-y-1">
            {formData.extraFeatures.map((feat, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleChange(e, idx, "extra")}
                  className="flex-1 p-1 rounded bg-gray-800"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx, "extra")}
                  className="px-2 bg-red-500 rounded"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addFeature("extra")}
            className="mt-2 px-3 py-1 bg-green-500 rounded"
          >
            + Add Extra Feature
          </button>
        </div>

        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          {editingId ? "Update Package" : "Create Package"}
        </button>
      </form>

      {/* Package List */}
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="p-4 bg-gray-800 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">
                {pkg.name}{" "}
                {pkg.popular && <span className="text-yellow-400">★ Popular</span>}
              </h3>
              <p>
                Price: AED {pkg.price}{" "}
                {pkg.formerPrice && (
                  <>
                    <span className="line-through text-gray-400 ml-2">
                      {pkg.formerPrice}
                    </span>{" "}
                    <span className="text-green-400 ml-2">
                      Save AED {getSavings(pkg)}
                    </span>
                  </>
                )}
              </p>
              <p>
                Features: {pkg.features.join(", ")}
                {pkg.extraFeatures && pkg.extraFeatures.length > 0 && " + more..."}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="px-3 py-1 bg-yellow-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="px-3 py-1 bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPricing;
