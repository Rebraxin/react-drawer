import { useEffect, useRef, useCallback } from "react";

export default function Drawer({ isOpen, setIsOpen, toggleDrawer }) {
  const drawerRef = useRef();
  const closeButtonRef = useRef();

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleButtonKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      closeDrawer();
    }
  };

  const trapFocus = (event) => {
    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && event.key === "Tab") {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else if (!event.shiftKey && event.key === "Tab") {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  useEffect(() => {
    const currentRef = drawerRef.current;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    if (isOpen) {
      closeButtonRef.current.focus();
      window.addEventListener("keydown", handleKeyDown);
      currentRef.addEventListener("keydown", trapFocus);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      currentRef?.removeEventListener("keydown", trapFocus);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      currentRef?.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen, closeDrawer]);

  return (
    <>
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
        aria-modal="true"
      >
        <button
          ref={closeButtonRef}
          onClick={toggleDrawer}
          onKeyDown={handleButtonKeyDown}
          className="p-2 text-white"
        >
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
