import React from "react";
import type { Member, TransactionSplit } from "../../utils/types";

interface AddTransactionFormProps {
  members: Member[];
  payerId?: number;
  setPayerId: (id: number) => void;
  amount: string;
  setAmount: (val: string) => void;
  splitMode: "equal" | "percentage" | "dynamic";
  setSplitMode: (mode: "equal" | "percentage" | "dynamic") => void;
  splits: TransactionSplit[];
  percentages: number[];
  handleSplitChange: (memberId: number, value: string) => void;
  handlePercentageChange: (index: number, value: string) => void;
  createError: string;
  creating: boolean;
  onCreate: () => void;
  successMessage: string;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  members,
  payerId,
  setPayerId,
  amount,
  setAmount,
  splitMode,
  setSplitMode,
  splits,
  percentages,
  handleSplitChange,
  handlePercentageChange,
  createError,
  creating,
  onCreate,
  successMessage,
}) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b border-orange-300 pb-2">
        Add Transaction
      </h2>

      {successMessage && (
        <div className="text-green-600 font-medium text-center border border-green-300 bg-green-100 p-3 rounded-xl">
          ✅ {successMessage}
        </div>
      )}

      <div className="grid gap-6">
        <label>
          <span className="block text-gray-700 font-medium">Payer</span>
          <select
            value={payerId}
            onChange={(e) => setPayerId(Number(e.target.value))}
            disabled={creating}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-gray-700 font-medium">Amount (€)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={creating}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
          />
        </label>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Split Type
          </label>
          <select
            value={splitMode}
            onChange={(e) =>
              setSplitMode(e.target.value as "equal" | "percentage" | "dynamic")
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400"
          >
            <option value="equal">Equally</option>
            <option value="percentage">Percentage</option>
            <option value="dynamic">Exact Amounts</option>
          </select>
        </div>

        {splitMode === "percentage" && (
          <div className="border p-4 rounded-xl space-y-3">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="flex justify-between items-center"
              >
                <span>{member.name}</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={percentages[index] ?? ""}
                  onChange={(e) =>
                    handlePercentageChange(index, e.target.value)
                  }
                  disabled={creating}
                  className="w-24 text-right p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        {splitMode === "dynamic" && (
          <div className="border p-4 rounded-xl space-y-3">
            {members.map((member) => {
              const split = splits.find((s) => s.memberId === member.id);
              return (
                <div
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <span>{member.name}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={split?.amount ?? ""}
                    onChange={(e) =>
                      handleSplitChange(member.id, e.target.value)
                    }
                    disabled={creating}
                    className="w-24 text-right p-2 border rounded-md"
                  />
                </div>
              );
            })}
          </div>
        )}

        {createError && (
          <p className="text-red-600 font-medium text-center">{createError}</p>
        )}

        <button
          onClick={onCreate}
          disabled={creating}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl text-lg font-semibold disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Transaction"}
        </button>
      </div>
    </section>
  );
};

export default AddTransactionForm;
