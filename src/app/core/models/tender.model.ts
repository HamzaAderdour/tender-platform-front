export type TenderStatus = 'DRAFT' | 'OPEN' | 'CLOSED';

export interface Tender {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  status: TenderStatus;
}