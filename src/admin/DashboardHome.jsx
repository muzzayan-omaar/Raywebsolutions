import React from "react";
import { motion } from "framer-motion";

const DashboardHome = () => {
  return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-gray-800 rounded-xl shadow-lg">
    <p className="text-gray-400">Total Posts</p>
    <h2 className="text-white font-bold text-xl">5</h2>
  </motion.div>
  ...
</div>

  );
};

export default DashboardHome;
