
import { motion } from "framer-motion";
import type { StepProps } from "../types";

export const Step1 = ({ data, setData }: StepProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
  <h2 className="text-2xl font-bold mb-4">{"Let's Start with Your Child"}</h2>
    <label className="block mb-4">
  <span className="text-gray-400">{"What is your child's name?"}</span>
      <input
        type="text"
        value={data.childName}
        onChange={(e) => setData({ ...data, childName: e.target.value })}
        className="w-full mt-2 p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </label>
  </motion.div>
);
