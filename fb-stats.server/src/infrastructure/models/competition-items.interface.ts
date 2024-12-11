export default interface CompetitionItems {
  data: Data[];
}

export interface Data {
  action: string;
  title: string;
  order: number;
  query_params: any;
  shortcut_address: string;
  shortcut_id: string;
  shortcut_full_address: any;
  meta: Meta;
  english_name?: string;
}

export interface Meta {
  competition_id: string;
  seo_slug: string;
}