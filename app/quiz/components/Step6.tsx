
import { motion } from "framer-motion";

export const Step6 = ({ data, setData }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 className="text-2xl font-bold mb-4">Availability & Challenges</h2>
    <label className="block mb-4">
      <span className="text-gray-400">How many hours per week can your child dedicate to tutoring?</span>
      <input
        type="text"
        value={data.availability}
        onChange={(e) => setData({ ...data, availability: e.target.value })}
        className="w-full mt-2 p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </label>
    <label className="block mt-6">
      <span className="text-gray-400">What are the biggest challenges your child is facing right now?</span>
      <textarea
        value={data.challenges}
        onChange={(e) => setData({ ...data, challenges: e.target.value })}
        className="w-full mt-2 p-3 bg-gray-700 rounded-md border border-gray-600 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
      ></textarea>
    </label>
  </motion.div>
);
