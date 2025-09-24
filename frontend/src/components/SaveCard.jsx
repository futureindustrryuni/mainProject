import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SaveCard({ ...project }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* تصویر پروژه */}
      <div className="h-40 w-full overflow-hidden">
       <Link  to={`/ProductDetails/${project.id}`}>
        <img
          src={project?.image || "/placeholder.jpg"}
          alt={project.title}
          className="h-full w-full object-cover cursor-pointer"
        />
       </Link>
      </div>

      {/* جزئیات */}
      <div className="p-4 flex flex-col gap-2">
        <Link to={`/ProductDetails/${project.id}`} className="font-bold text-lg text-gray-800 line-clamp-1">
          {project.title}
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2">
          {project.description || "بدون توضیحات"}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-semibold">
            {project.price ? `${project.price.toLocaleString()} تومان` : "رایگان"}
          </span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-lg">
            {project.technologies}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
