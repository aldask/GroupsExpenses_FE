import React from "react";

interface AddMemberFormProps {
  newMemberName: string;
  setNewMemberName: (name: string) => void;
  onAdd: () => void;
  creating: boolean;
  createError: string;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({
  newMemberName,
  setNewMemberName,
  onAdd,
  creating,
  createError,
}) => (
  <section aria-labelledby="add-member-label" className="space-y-4">
    <h2
      id="add-member-label"
      className="text-2xl font-bold text-gray-800 border-b border-orange-300 pb-2"
    >
      Add New Member
    </h2>
    <div className="flex gap-4">
      <input
        id="memberName"
        type="text"
        value={newMemberName}
        onChange={(e) => {
          setNewMemberName(e.target.value);
        }}
        placeholder="e.g. Alice"
        disabled={creating}
        className="flex-grow p-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        aria-describedby="add-member-error"
        aria-invalid={!!createError}
      />
      <button
        onClick={onAdd}
        disabled={creating || !newMemberName.trim()}
        className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
      >
        {creating ? "Adding..." : "Add"}
      </button>
    </div>
    {createError && (
      <p
        id="add-member-error"
        className="text-red-600 font-medium"
        role="alert"
      >
        {createError}
      </p>
    )}
  </section>
);

export default AddMemberForm;
