// components/Drawer.js
import { useState, useEffect, useRef } from "react";

export default function Drawer({ isOpen, setIsOpen, toggleDrawer }) {
  // const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef();

  // const toggleDrawer = () => {
  //   setIsOpen(!isOpen);
  // };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" || event.key === " " || event.key === "Enter") {
      closeDrawer();
    }
  };

  useEffect(() => {
    if (isOpen) {
      drawerRef.current.focus();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* <button
        onClick={toggleDrawer}
        className="p-2 bg-blue-500 text-white rounded"
        aria-controls="drawer"
        aria-expanded={isOpen}
      >
        {isOpen ? "Close Drawer" : "Open Drawer"}
      </button> */}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          aria-hidden="true"
        ></div>
      )}

      {/* Drawer */}
      <div
        id="drawer"
        ref={drawerRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
        role="dialog"
        aria-labelledby="drawer-title"
      >
        <button onClick={toggleDrawer} className="p-2 text-white">
          Close
        </button>
        <div className="p-4">
          <h2 id="drawer-title" className="text-2xl">
            Drawer Content
          </h2>
          <p>This is an accessible drawer component.</p>
        </div>
      </div>
    </>
  );
}
