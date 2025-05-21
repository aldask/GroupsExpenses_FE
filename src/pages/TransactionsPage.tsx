import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  type Transaction,
  type TransactionSplit,
  type Member,
} from "../utils/types";
import {
  getTransactions,
  createTransaction,
  getMembers,
  getGroupDetails,
} from "../utils/api";
import AddTransactionForm from "../components/Transactions/AddTransaction";
import TransactionsList from "../components/Transactions/TransactionsList";
import Header from "../components/Header";

const TransactionsPage: React.FC = () => {
  const { groupId: groupIdParam } = useParams<{ groupId: string }>();
  const groupId = Number(groupIdParam);

  const [groupTitle, setGroupTitle] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [payerId, setPayerId] = useState<number | undefined>();
  const [amount, setAmount] = useState("");
  const [splits, setSplits] = useState<TransactionSplit[]>([]);
  const [splitMode, setSplitMode] = useState<
    "equal" | "percentage" | "dynamic"
  >("dynamic");
  const [percentages, setPercentages] = useState<number[]>([]);

  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isNaN(groupId)) {
      setError("Invalid group ID.");
      setLoading(false);
      return;
    }
    fetchGroupData();
  }, [groupId]);

  const fetchGroupData = async () => {
    try {
      const group = await getGroupDetails(groupId);
      setGroupTitle(group.title);

      const memberList = await getMembers(groupId);
      setMembers(memberList);
      if (memberList.length > 0) {
        setPayerId(memberList[0].id);
        setSplits(memberList.map((m) => ({ memberId: m.id, amount: 0 })));
        setPercentages(memberList.map(() => 0));
      }

      const transcts = await getTransactions(groupId);
      setTransactions(transcts.reverse());
    } catch {
      setError("Failed to load group data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSplitChange = (memberId: number, value: string) => {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount < 0) return;
    setSplits((prev) =>
      prev.map((split) =>
        split.memberId === memberId ? { ...split, amount } : split
      )
    );
  };

  const handlePercentageChange = (index: number, value: string) => {
    const updated = [...percentages];
    updated[index] = parseFloat(value) || 0;
    setPercentages(updated);
  };

  const handleCreateTransaction = async () => {
    setCreateError("");
    setSuccessMessage("");

    if (!payerId) {
      setCreateError("Please select a payer.");
      return;
    }

    const total = parseFloat(amount);
    if (isNaN(total) || total <= 0) {
      setCreateError("Enter a valid amount.");
      return;
    }

    let payloadSplits: { MemberId: number; Amount: number }[] = [];

    if (splitMode === "dynamic") {
      payloadSplits = splits.map((s) => ({
        MemberId: s.memberId,
        Amount: s.amount,
      }));
    } else if (splitMode === "equal") {
      const equalAmount = total / members.length;
      payloadSplits = members.map((m) => ({
        MemberId: m.id,
        Amount: parseFloat(equalAmount.toFixed(2)),
      }));
    } else if (splitMode === "percentage") {
      payloadSplits = members.map((m, i) => ({
        MemberId: m.id,
        Amount: percentages[i],
      }));
    }

    const payload = {
      PayerId: payerId,
      Amount: total,
      Splits: payloadSplits,
    };

    console.log("Payload to send:", JSON.stringify(payload, null, 2));

    setCreating(true);
    try {
      await createTransaction(groupId, payload, splitMode);
      setSuccessMessage("Transaction created successfully!");
      setAmount("");
      setPercentages(members.map(() => 0));
      setSplits(members.map((m) => ({ memberId: m.id, amount: 0 })));
      setSplitMode("dynamic");
      setPayerId(members[0]?.id);
      fetchGroupData();
    } catch {
      setCreateError("Failed to create transaction.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-10 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-6 md:p-10 rounded-3xl shadow-2xl space-y-12">
        <Header groupTitle={groupTitle} pageType="transactions" />

        <AddTransactionForm
          members={members}
          payerId={payerId}
          setPayerId={setPayerId}
          amount={amount}
          setAmount={setAmount}
          splitMode={splitMode}
          setSplitMode={setSplitMode}
          splits={splits}
          percentages={percentages}
          handleSplitChange={handleSplitChange}
          handlePercentageChange={handlePercentageChange}
          createError={createError}
          creating={creating}
          onCreate={handleCreateTransaction}
          successMessage={successMessage}
        />

        <TransactionsList
          transactions={transactions}
          members={members}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default TransactionsPage;
