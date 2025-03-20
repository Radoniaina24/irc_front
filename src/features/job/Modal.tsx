import React from "react";
import Xcircle from "./svg/Xcircle";
export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-99999 flex items-center justify-center  transition-colors
        ${open ? "visible bg-black/20  " : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          rounded bg-white  px-3 py-3 shadow transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        ></button>
        {children}
      </div>
    </div>
  );
}
