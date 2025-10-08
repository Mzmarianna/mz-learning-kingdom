
import { motion } from "framer-motion";

export const Step7 = ({ data, setData }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 className="text-2xl font-bold mb-4">Your Information</h2>
    <p className="text-gray-400 mb-4">This allows us to send you the personalized plan.</p>
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-400">Your Name</span>
        <input
          type="text"
          value={data.parentName}
          onChange={(e) => setData({ ...data, parentName: e.target.value })}
          className="w-full mt-2 p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
      <label className="block">
        <span className="text-gray-400">Your Email</span>
        <input
          type="email"
          value={data.parentEmail}
          onChange={(e) => setData({ ...data, parentEmail: e.target.value })}
          className="w-full mt-2 p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
      <label className="block">
        <span className="text-gray-400">Your Phone Number</span>
        <input
          type="tel"
          value={data.parentPhone}
          onChange={(e) => setData({ ...data, parentPhone: e.target.value })}
          className="w-full mt-2 p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
    </div>
  </motion.div>
);
