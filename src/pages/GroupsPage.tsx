import { useEffect, useState } from "react";
import type { Group } from "../api/axios";
import { getGroups } from "../api/axios";

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data ?? []);
      } catch (err) {
        setError("Failed to load groups. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Groups</h1>

      {loading && <p>Loading...</p>}

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {!loading && !error && (
        <ul className="space-y-2">
          {groups.map((group) => (
            <li key={group.id} className="p-4 bg-gray-100 rounded">
              {group.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupsPage;
