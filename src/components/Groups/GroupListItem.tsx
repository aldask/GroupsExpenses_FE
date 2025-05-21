import React from "react";
import type { Group } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const GroupListItem: React.FC<{ group: Group }> = ({ group }) => {
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      navigate(`/groups/${group.id}/members`);
    }
  };

  return (
    <li
      key={group.id}
      className="cursor-pointer bg-white hover:bg-orange-50 rounded-3xl px-8 py-6 shadow-md flex justify-between items-center transition transform hover:scale-[1.03]"
      tabIndex={0}
      role="button"
      aria-label={`Open group ${group.title}`}
      onClick={() => navigate(`/groups/${group.id}/members`)}
      onKeyDown={handleKeyDown}
    >
      <span className="text-2xl font-semibold text-orange-600 select-none">
        {group.title}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-orange-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </li>
  );
};

export default GroupListItem;
