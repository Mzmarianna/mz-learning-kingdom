
import { motion } from "framer-motion";
import type { StepProps } from "../types";

export const Step3 = ({ data, setData }: StepProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 className="text-2xl font-bold mb-4">Subjects of Focus</h2>
    <p className="text-gray-400 mb-4">Select all that apply.</p>
    <div className="grid grid-cols-2 gap-4">
      {["Reading", "Writing", "Math", "Science", "History", "Executive Functions"].map((subject) => (
        <label key={subject} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600">
          <input
            type="checkbox"
            checked={data.subjects.includes(subject)}
            onChange={(e) => {
              const newSubjects = e.target.checked
                ? [...data.subjects, subject]
                : data.subjects.filter((s) => s !== subject);
              setData({ ...data, subjects: newSubjects });
            }}
            className="form-checkbox h-5 w-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
          />
          <span className="text-white">{subject}</span>
        </label>
      ))}
    </div>
  </motion.div>
);
