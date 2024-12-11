export class CompetitionTab {
  constructor(public id: number, public label: string) {}
}

// ----------------------------------------

export interface CompetitionItemsResponse {
  success: boolean;
  message?: string;
  competitions?: CompetitionItem[];
}

export interface CompetitionItem {
  id: number;
  order: number;
  name: string;
  title: string;
  logo: string;
}

// ----------------------------------------
