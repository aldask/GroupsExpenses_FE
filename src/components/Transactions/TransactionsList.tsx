import React from "react";
import type { Transaction, Member } from "../../utils/types";

interface TransactionsListProps {
  transactions: Transaction[];
  members: Member[];
  loading: boolean;
  error: string;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  members,
  loading,
  error,
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 border-b border-orange-300 pb-2 mb-6">
        All Transactions
      </h2>

      {loading && (
        <p className="text-center text-gray-500">Loading transactions...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {!loading && !error && transactions.length === 0 && (
        <p className="text-center italic text-gray-400">
          No transactions yet. Add one above!
        </p>
      )}

      {!loading && !error && transactions.length > 0 && (
        <ul className="space-y-6">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-orange-600 font-semibold">
                  Transaction
                </span>
                <span className="text-green-700 font-semibold">
                  € {t.amount.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {new Date(t.createdAt).toLocaleString()}
              </div>
              <div>
                <h4 className="font-medium mb-2">Split:</h4>
                <ul className="space-y-1 text-sm">
                  {t.splits.map((split, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {members.find(
                          (m) =>
                            m.id ===
                            (typeof split.memberId === "number"
                              ? split.memberId
                              : (split.memberId as any).id)
                        )?.name ?? "Unknown"}
                      </span>
                      <span>€ {split.amount.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TransactionsList;
