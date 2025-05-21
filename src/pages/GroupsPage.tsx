import { useEffect, useState } from "react";
import type { Group } from "../utils/types";
import { getGroups, createGroup } from "../utils/api";

import CreateGroupForm from "../components/Transactions/CreateGroupForm";
import GroupList from "../components/Groups/GroupList";

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getGroups();
      setGroups(data ?? []);
    } catch {
      setError("Failed to load groups. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupTitle.trim()) {
      setCreateError("Group title is required");
      return;
    }
    setCreating(true);
    setCreateError("");
    try {
      await createGroup(newGroupTitle.trim());
      setNewGroupTitle("");
      await fetchGroups();
    } catch {
      setCreateError("Failed to create group. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 px-6 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-10 text-center tracking-tight">
          Your Groups
        </h1>

        <CreateGroupForm
          newGroupTitle={newGroupTitle}
          onTitleChange={setNewGroupTitle}
          onCreate={handleCreateGroup}
          creating={creating}
          createError={createError}
        />

        {loading && (
          <p
            className="text-center text-orange-600 text-lg font-medium"
            aria-live="polite"
          >
            Loading groups...
          </p>
        )}

        {error && (
          <div
            className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6 text-center font-semibold shadow-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {!loading && !error && <GroupList groups={groups} />}
      </div>
    </div>
  );
};

export default GroupsPage;
