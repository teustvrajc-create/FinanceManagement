import type { ChartEntry, Period } from '../types';

export const chartData: Record<Period, ChartEntry[]> = {
  Daily: [
    { label: 'Mon', income: 46, expense: 76 }, { label: 'Tue', income: 18, expense: 46 },
    { label: 'Wed', income: 76, expense: 23 }, { label: 'Thu', income: 11, expense: 57 },
    { label: 'Fri', income: 98, expense: 87 }, { label: 'Sat', income: 34, expense: 18 },
    { label: 'Sun', income: 37, expense: 65 },
  ],
  Weekly: [
    { label: 'W1', income: 55, expense: 72 }, { label: 'W2', income: 35, expense: 86 },
    { label: 'W3', income: 91, expense: 44 }, { label: 'W4', income: 68, expense: 58 },
    { label: 'W5', income: 43, expense: 70 }, { label: 'W6', income: 82, expense: 33 },
    { label: 'W7', income: 61, expense: 52 },
  ],
  Monthly: [
    { label: 'Jan', income: 72, expense: 58 }, { label: 'Feb', income: 62, expense: 76 },
    { label: 'Mar', income: 88, expense: 54 }, { label: 'Apr', income: 76, expense: 66 },
    { label: 'May', income: 94, expense: 71 }, { label: 'Jun', income: 67, expense: 51 },
    { label: 'Jul', income: 82, expense: 60 },
  ],
  Year: [
    { label: 'Jan', income: 44, expense: 39 }, { label: 'Mar', income: 58, expense: 47 },
    { label: 'May', income: 69, expense: 62 }, { label: 'Jul', income: 81, expense: 55 },
    { label: 'Sep', income: 75, expense: 68 }, { label: 'Nov', income: 93, expense: 73 },
    { label: 'Dec', income: 86, expense: 61 },
  ],
};
