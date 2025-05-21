import axios from "axios";
import type { Group, Member, Transaction } from "./types";

const api = axios.create({
  baseURL: "https://localhost:7208/api",
});

// GROUPS
export const getGroups = async (): Promise<Group[]> => {
  const res = await api.get<Group[]>("/groups");
  return res.data;
};

export const createGroup = async (title: string): Promise<Group> => {
  const res = await api.post<Group>("/groups", { title });
  return res.data;
};

export const getGroupDetails = async (groupId: number): Promise<Group> => {
  const res = await api.get<Group>(`/groups/${groupId}`);
  return res.data;
};

// MEMBERS
export const getMembers = async (groupId: number): Promise<Member[]> => {
  const res = await api.get<Member[]>(`/groups/${groupId}/members`);
  return res.data;
};

export const addMember = async (
  groupId: number,
  name: string
): Promise<Member> => {
  const res = await api.post<Member>(`/groups/${groupId}/members`, { name });
  return res.data;
};

export const removeMember = async (
  groupId: number,
  memberId: number
): Promise<void> => {
  await api.delete(`/groups/${groupId}/members/${memberId}`);
};

// TRANSACTIONS
export const getTransactions = async (
  groupId: number
): Promise<Transaction[]> => {
  const res = await api.get<Transaction[]>(`/groups/${groupId}/transactions`);
  return res.data;
};

export const createTransaction = async (
  groupId: number,
  transaction: {
    PayerId: number;
    Amount: number;
    Splits: { MemberId: number; Amount: number }[];
  },
  splitMode: "equal" | "percentage" | "dynamic"
): Promise<Transaction> => {
  const res = await api.post<Transaction>(
    `/groups/${groupId}/transactions?splitMode=${splitMode}`,
    transaction
  );
  return res.data;
};
