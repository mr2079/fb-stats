export interface CompetitionListResponse {
    success: boolean;
    competitions?: Competition[];
    message?: string;
}

export interface Competition {
    id: number;
    fetchId: string;
    order: number;
    name: string;
    title: string;
    logo: string;
}