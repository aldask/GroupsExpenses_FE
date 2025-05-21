import React from "react";
import type { Member } from "../../utils/types";

interface MemberListProps {
  members: Member[];
  deletingMemberId: number | null;
  setConfirmRemoveId: (id: number | null) => void;
  removeError: string;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  deletingMemberId,
  setConfirmRemoveId,
  removeError,
}) => {
  if (members.length === 0) {
    return (
      <p className="text-center italic text-gray-400">No members found.</p>
    );
  }

  return (
    <>
      <ul className="space-y-6">
        {members.map((member) => {
          const canRemove = member.balance === 0;
          return (
            <li
              key={member.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow flex justify-between items-center"
              role="listitem"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {member.name}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    member.balance < 0
                      ? "text-red-600"
                      : member.balance > 0
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  Balance: {member.balance.toFixed(2)} €
                </p>
              </div>
              <button
                disabled={deletingMemberId === member.id || !canRemove}
                onClick={() => setConfirmRemoveId(member.id)}
                className={`font-semibold text-sm px-3 py-2 rounded focus:outline-none focus:ring-2 transition
                  ${
                    canRemove
                      ? "text-red-600 hover:text-red-800 focus:ring-red-400"
                      : "text-gray-400 cursor-not-allowed"
                  }
                  disabled:opacity-50
                `}
                aria-label={`Remove member ${member.name}`}
                title={
                  canRemove
                    ? "Remove member"
                    : "Cannot remove member with unsettled balance"
                }
              >
                {deletingMemberId === member.id ? "Removing..." : "Remove"}
              </button>
            </li>
          );
        })}
      </ul>

      {removeError && (
        <p className="mt-4 text-center text-red-600 font-semibold" role="alert">
          {removeError}
        </p>
      )}
    </>
  );
};

export default MemberList;
