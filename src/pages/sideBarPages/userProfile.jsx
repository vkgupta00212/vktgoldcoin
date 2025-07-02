import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import AdressDetailsh from "../card/profileCards/adressDetailsh.jsx";
import PersonalDetailsh from "../card/profileCards/personalDetailsh.jsx";
import BankDetailsh from "../card/profileCards/bankDetailsh.jsx";
import TransactionDetails from "../card/profileCards/transactionDetailsh.jsx";
import { Component } from "lucide-react";

const UserProfile = () => {
  const [openSections, setOpenSections] = useState({});

  // Toggle specific section by ID
  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Define all sections here
  const sections = [
    { id: 1, title: "Personal Details", Component: <PersonalDetailsh /> },
    { id: 2, title: "Adreess Details", Component: <AdressDetailsh /> },
    { id: 3, title: "Bank details", Component: <BankDetailsh /> },
    { id: 4, title: "Personal Details", Component: <TransactionDetails /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:px-10 animate-slide-bounce">
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-inherit rounded-[15px] mt-3 p-4 md:p-4 md:w-full mx-auto"
        >
          {/* Collapsible Header */}
          <div
            onClick={() => toggleSection(section.id)}
            className="p-10 cursor-pointer flex items-center justify-between bg-white  rounded-[15px] shadow-md"
          >
            <h2 className="font-semibold text-[19px] md:text-[23px] text-gray-800">
              {section.title}
            </h2>
            {openSections[section.id] ? (
              <FaMinus className="text-gray-600 text-[25px]" />
            ) : (
              <FaPlus className="text-gray-600 text-[25px]" />
            )}
          </div>

          {/* Collapsible Content with animation */}
          <AnimatePresence initial={false}>
            <motion.div
              key={
                openSections[section.id]
                  ? `open-${section.id}`
                  : `closed-${section.id}`
              }
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{
                height: openSections[section.id] ? "auto" : 0,
                opacity: openSections[section.id] ? 1 : 0,
                scale: openSections[section.id] ? 1 : 0.95,
              }}
              exit={{ height: 0, opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.8, 0.25, 1],
              }}
              style={{ overflow: "hidden", originX: 1, originY: 0 }}
              className="mt-4"
            >
              {openSections[section.id] && (
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                  {section.Component}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
