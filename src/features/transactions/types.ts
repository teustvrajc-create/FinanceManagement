import type { IconName } from '../../components/finance/Icon';

export type TransactionType = 'income' | 'expense';
export type TransactionMode = 'all' | TransactionType;

export type Transaction = {
  id: string;
  title: string;
  detail: string;
  date: string;
  amount: string;
  icon: IconName;
  color: string;
  category: string;
  type: TransactionType;
  month?: string;
};
