export interface Group {
  id: number;
  title: string;
}

export interface Member {
  id: number;
  name: string;
  balance: number;
}

export interface TransactionSplit {
  memberId: number;
  amount: number;
}

export interface Transaction {
  id: number;
  amount: number;
  payerId: number;
  payer: Member;
  splits: TransactionSplit[];
  createdAt: string;
}
