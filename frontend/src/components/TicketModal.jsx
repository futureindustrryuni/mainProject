import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TicketModal({ ticket, open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay با افکت بلور */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Modal مینیمال */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.7, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center w-full">
                متن تیکت
              </h2>
            </div>

            <p className="text-gray-700 text-justify dark:text-gray-300 mt-4">
              {ticket}
            </p>

            <div className="mt-6 text-center">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 bg-red-500 cursor-pointer text-white rounded-full hover:bg-red-600 transition"
              >
                بستن
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
