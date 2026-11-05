export const periods = ['Daily', 'Weekly', 'Monthly', 'Year'] as const;
export type Period = (typeof periods)[number];

export type ChartEntry = {
  label: string;
  income: number;
  expense: number;
};
