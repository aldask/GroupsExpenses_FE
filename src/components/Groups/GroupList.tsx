import React from "react";
import type { Group } from "../../utils/types";
import GroupListItem from "./GroupListItem";

const GroupList: React.FC<{ groups: Group[] }> = ({ groups }) => {
  if (groups.length === 0) {
    return <p className="text-center text-gray-500 italic">No groups found.</p>;
  }

  return (
    <ul className="space-y-6">
      {[...groups].reverse().map((group) => (
        <GroupListItem key={group.id} group={group} />
      ))}
    </ul>
  );
};

export default GroupList;
