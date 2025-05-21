import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Member } from "../utils/types";
import {
  getMembers,
  addMember,
  removeMember,
  getGroupDetails,
} from "../utils/api";

import Header from "../components/Header";
import AddMemberForm from "../components/Members/AddMemberForm";
import MemberList from "../components/Members/MemberList";
import ConfirmRemoveModal from "../components/Members/ConfirmRemoveModal";

const MembersPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const numericGroupId = Number(groupId);

  const [groupTitle, setGroupTitle] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newMemberName, setNewMemberName] = useState("");
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null);
  const [removeError, setRemoveError] = useState("");
  const [confirmRemoveId, setConfirmRemoveId] = useState<number | null>(null);

  useEffect(() => {
    if (!numericGroupId) return;
    fetchMembers();
    fetchGroupTitle();
  }, [numericGroupId]);

  const fetchMembers = async () => {
    setLoading(true);
    setError("");
    setRemoveError("");
    try {
      const data = await getMembers(numericGroupId);
      setMembers(data);
    } catch {
      setError("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupTitle = async () => {
    try {
      const group = await getGroupDetails(numericGroupId);
      setGroupTitle(group.title);
    } catch {
      console.log("silent fail, nothing to do here");
    }
  };

  const validateName = (name: string) => /^[A-Za-z]+$/.test(name);

  const handleAddMember = async () => {
    if (!newMemberName.trim()) {
      setCreateError("Member name is required");
      return;
    }
    if (!validateName(newMemberName.trim())) {
      setCreateError("Name can contain only letters, no spaces or symbols");
      return;
    }
    setCreating(true);
    setCreateError("");
    try {
      await addMember(numericGroupId, newMemberName.trim());
      setNewMemberName("");
      await fetchMembers();
    } catch {
      setCreateError("Failed to add member. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    setRemoveError("");
    setDeletingMemberId(memberId);
    try {
      await removeMember(numericGroupId, memberId);
      setConfirmRemoveId(null);
      await fetchMembers();
    } catch {
      setRemoveError("Failed to remove member. Please try again.");
    } finally {
      setDeletingMemberId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center text-gray-600 text-lg font-medium">
        Loading members...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex justify-center items-center text-red-600 font-semibold">
        {error}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-10 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-6 md:p-10 rounded-3xl shadow-2xl space-y-12">
        <Header groupTitle={groupTitle} pageType="members" />

        <AddMemberForm
          newMemberName={newMemberName}
          setNewMemberName={setNewMemberName}
          onAdd={handleAddMember}
          creating={creating}
          createError={createError}
        />

        <section aria-label="Members list">
          <MemberList
            members={members}
            deletingMemberId={deletingMemberId}
            setConfirmRemoveId={setConfirmRemoveId}
            removeError={removeError}
          />
        </section>

        {confirmRemoveId !== null && (
          <ConfirmRemoveModal
            onConfirm={() => {
              if (confirmRemoveId !== null) handleRemoveMember(confirmRemoveId);
            }}
            onCancel={() => setConfirmRemoveId(null)}
          />
        )}

        <footer>
          <button
            onClick={() => navigate(`/groups/${groupId}/transactions`)}
            className="w-full bg-orange-500 text-white py-3 rounded-2xl font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            View Transactions
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MembersPage;
