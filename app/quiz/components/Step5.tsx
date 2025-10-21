
import { motion } from "framer-motion";

export const Step5 = ({ data, setData }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 className="text-2xl font-bold mb-4">Motivation</h2>
    <p className="text-gray-400 mb-4">What motivates your child the most?</p>
    <div className="space-y-4">
      {["Competition", "Rewards", "Praise", "Seeing Progress"].map((motivation) => (
        <label key={motivation} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600">
          <input
            type="radio"
            name="motivation"
            value={motivation}
            checked={data.motivation === motivation}
            onChange={(e) => setData({ ...data, motivation: e.target.value })}
            className="form-radio h-5 w-5 text-purple-600 bg-gray-800 border-gray-600 focus:ring-purple-500"
          />
          <span className="text-white">{motivation}</span>
        </label>
      ))}
    </div>
  </motion.div>
);
