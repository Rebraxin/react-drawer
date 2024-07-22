"use client";

import React, { useState } from "react";
import Drawer from "./drawer";
import { createPortal } from "react-dom";

const DrawerWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-blue-500 text-white rounded"
        aria-controls="drawer"
        aria-expanded={isOpen}
      >
        {isOpen ? "Close Drawer" : "Open Drawer"}
      </button>
      {createPortal(
        <Drawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDrawer={toggleDrawer}
        />,
        document.body
      )}
    </div>
  );
};

export default DrawerWrapper;
