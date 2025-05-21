import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  groupTitle: string;
  pageType: "members" | "transactions";
}

const Header: React.FC<HeaderProps> = ({ groupTitle, pageType }) => {
  const navigate = useNavigate();

  const pageTitle =
    pageType === "transactions"
      ? groupTitle
        ? `"${groupTitle}" Transactions`
        : "Transactions"
      : groupTitle
      ? `"${groupTitle}" Members`
      : "Members";

  return (
    <header className="flex justify-between items-center">
      <button
        onClick={() => navigate(-1)}
        className="text-orange-600 hover:text-orange-700 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-md px-2 py-1 transition"
        aria-label="Go back"
      >
        Back
      </button>
      <h1 className="text-4xl font-extrabold text-center text-orange-600 flex-grow">
        {pageTitle}
      </h1>
      <div className="w-16" /> {/* Placeholder for alignment */}
    </header>
  );
};

export default Header;
