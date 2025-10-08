
import { motion } from "framer-motion";

export const Step8 = ({ data }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
    <div className="space-y-4 text-gray-300">
      <p><strong>Child's Name:</strong> {data.childName}</p>
      <p><strong>Grade:</strong> {data.grade}</p>
      <p><strong>Subjects:</strong> {data.subjects.join(", ")}</p>
      <p><strong>Learning Style:</strong> {data.learningStyle}</p>
      <p><strong>Motivation:</strong> {data.motivation}</p>
      <p><strong>Availability:</strong> {data.availability}</p>
      <p><strong>Challenges:</strong> {data.challenges}</p>
      <p><strong>Your Name:</strong> {data.parentName}</p>
      <p><strong>Your Email:</strong> {data.parentEmail}</p>
      <p><strong>Your Phone:</strong> {data.parentPhone}</p>
    </div>
  </motion.div>
);
