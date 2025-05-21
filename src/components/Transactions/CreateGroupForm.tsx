import React from "react";

interface CreateGroupFormProps {
  newGroupTitle: string;
  onTitleChange: (value: string) => void;
  onCreate: () => void;
  creating: boolean;
  createError: string;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  newGroupTitle,
  onTitleChange,
  onCreate,
  creating,
  createError,
}) => {
  return (
    <section className="mb-12" aria-labelledby="create-group-label">
      <label
        id="create-group-label"
        htmlFor="groupTitle"
        className="block text-xl font-semibold text-gray-800 mb-4"
      >
        Create New Group
      </label>
      <div className="flex flex-col sm:flex-row gap-5">
        <input
          id="groupTitle"
          type="text"
          value={newGroupTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Group title..."
          disabled={creating}
          className="flex-grow rounded-3xl border border-gray-300 px-6 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          aria-label="New group title"
          aria-invalid={!!createError}
          aria-describedby="create-group-error"
        />
        <button
          onClick={onCreate}
          disabled={creating}
          className="bg-orange-500 text-white font-semibold rounded-3xl px-8 py-4 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={creating}
        >
          {creating ? "Creating..." : "Create"}
        </button>
      </div>
      {createError && (
        <p
          id="create-group-error"
          className="mt-3 text-red-600 font-medium text-center sm:text-left"
          role="alert"
        >
          {createError}
        </p>
      )}
    </section>
  );
};

export default CreateGroupForm;
