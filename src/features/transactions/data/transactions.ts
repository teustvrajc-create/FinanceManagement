import type { Transaction, TransactionMode } from '../types';

const salaryApril: Transaction = {
  id: 'salary-april', title: 'Salary', detail: 'Monthly', date: '18:27 – April 30',
  amount: '+$4,000.00', icon: 'wallet', color: '#67B8F5', category: 'Income', type: 'income', month: 'April',
};
const groceriesApril: Transaction = {
  id: 'groceries-april', title: 'Groceries', detail: 'Pantry', date: '17:00 – April 24',
  amount: '-$100.00', icon: 'groceries', color: '#329AF7', category: 'Food', type: 'expense', month: 'April',
};
const rentApril: Transaction = {
  id: 'rent-april', title: 'Rent', detail: 'Rent', date: '8:30 – April 15',
  amount: '-$674.40', icon: 'rent', color: '#066AFF', category: 'Home', type: 'expense', month: 'April',
};
const transportApril: Transaction = {
  id: 'transport-april', title: 'Transport', detail: 'Fuel', date: '7:30 – April 08',
  amount: '-$4.13', icon: 'bus', color: '#3896E7', category: 'Transport', type: 'expense', month: 'April',
};
const foodMarch: Transaction = {
  id: 'food-march', title: 'Food', detail: 'Dinner', date: '19:30 – March 31',
  amount: '-$70.40', icon: 'food', color: '#67B8F5', category: 'Food', type: 'expense', month: 'March',
};
const salaryMarch: Transaction = {
  id: 'salary-march', title: 'Salary', detail: 'Monthly', date: '18:39 – March 31',
  amount: '+$4,000.00', icon: 'wallet', color: '#67B8F5', category: 'Income', type: 'income', month: 'March',
};
const otherIncomeApril: Transaction = {
  id: 'other-income-april', title: 'Others', detail: 'Payments', date: '17:00 – April 24',
  amount: '+$120.00', icon: 'wallet', color: '#67B8F5', category: 'Income', type: 'income', month: 'April',
};
const otherIncomeMarch: Transaction = {
  id: 'other-income-march', title: 'Others', detail: 'Upwork', date: '9:30 – April 12',
  amount: '+$340.00', icon: 'wallet', color: '#67B8F5', category: 'Income', type: 'income', month: 'March',
};
const otherIncomeFebruary: Transaction = {
  id: 'other-income-february', title: 'Others', detail: 'Upwork', date: '19:30 – March 31',
  amount: '+$340.00', icon: 'wallet', color: '#67B8F5', category: 'Income', type: 'income', month: 'February',
};
const rentMarch: Transaction = {
  id: 'rent-march', title: 'Rent', detail: 'Rent', date: '18:39 – March 31',
  amount: '-$674.40', icon: 'rent', color: '#066AFF', category: 'Home', type: 'expense', month: 'March',
};
const medicineMarch: Transaction = {
  id: 'medicine-march', title: 'Medicine', detail: 'Pharmacy', date: '11:15 · March 27',
  amount: '-$25.90', icon: 'medicine', color: '#4F98E4', category: 'Health', type: 'expense', month: 'March',
};
const entertainmentMarch: Transaction = {
  id: 'entertainment-march', title: 'Entertainment', detail: 'Cinema', date: '20:00 · March 22',
  amount: '-$32.00', icon: 'entertainment', color: '#8B86E8', category: 'Entertainment', type: 'expense', month: 'March',
};

/** Mock rows shown in the 9.3 Figma states. */
export const transactionViews: Record<TransactionMode, Transaction[]> = {
  all: [salaryApril, groceriesApril, rentApril, transportApril, foodMarch],
  income: [salaryApril, otherIncomeApril, salaryMarch, otherIncomeMarch, otherIncomeFebruary],
  expense: [groceriesApril, rentApril, transportApril, foodMarch, rentMarch],
};

/** Default rows used by the older home and balance screens. */
export const sampleTransactions: Transaction[] = [
  { id: 'sample-salary', title: 'Salary', detail: 'Monthly income', date: '12:27 · Apr 30', amount: '+$4,000.00', icon: 'wallet', color: '#67B9F4', category: 'Income', type: 'income' },
  { id: 'sample-groceries', title: 'Groceries', detail: 'Pantry', date: '17:00 · Apr 24', amount: '-$100.00', icon: 'groceries', color: '#59A5EC', category: 'Food', type: 'expense' },
  { id: 'sample-rent', title: 'Rent', detail: 'Apartment', date: '8:30 · Apr 15', amount: '-$674.40', icon: 'rent', color: '#2E91F4', category: 'Home', type: 'expense' },
  { id: 'sample-transport', title: 'Transport', detail: 'Fuel', date: '9:30 · Apr 15', amount: '-$4.13', icon: 'car', color: '#218CF0', category: 'Transport', type: 'expense' },
  { id: 'sample-food', title: 'Food', detail: 'Dinner', date: '19:30 · March 30', amount: '-$70.40', icon: 'food', color: '#3C9CF4', category: 'Food', type: 'expense' },
  { id: medicineMarch.id, title: 'Medicine', detail: 'Pharmacy', date: '11:15 · March 27', amount: '-$25.90', icon: 'medicine', color: '#4F98E4', category: 'Health', type: 'expense' },
  { id: entertainmentMarch.id, title: 'Entertainment', detail: 'Cinema', date: '20:00 · March 22', amount: '-$32.00', icon: 'entertainment', color: '#8B86E8', category: 'Entertainment', type: 'expense' },
];

export const homeTransactions: Transaction[] = [
  { ...sampleTransactions[0], detail: 'Monthly' },
  sampleTransactions[1],
  { ...sampleTransactions[2], detail: 'Monthly' },
];
