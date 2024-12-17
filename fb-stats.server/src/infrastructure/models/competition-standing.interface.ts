export default interface CompetitionStanding {
  id: string;
  title: string;
  english_name: string;
  competition: string;
  slug: any;
  logo: string;
  thumbnail: string;
  seo_slug: string;
  has_live_match: boolean;
  standing_last_update: number;
  competition_trend_stages: CompetitionTrendStage[];
}

export interface CompetitionTrendStage {
  id: string;
  name: string;
  english_name: string;
  stage_type: string;
  start_time: number;
  end_time: number;
  order: any;
  is_default: boolean;
  has_live_match: boolean;
  competition_trend: CompetitionTrend;
  standing_table: StandingTable[];
}

export interface CompetitionTrend {
  id: string;
  title: string;
  english_name: string;
  slug: any;
  current_stage: string;
  start_time: number;
  end_time: number;
  banner: string;
  live_score_page_order: number;
  competition: Competition;
  is_multistage: boolean;
  logo: string;
  thumbnail: string;
  seo_slug: string;
}

export interface Competition {
  id: string;
  title: string;
  current_competition_trend: string;
  slug: any;
  logo: string;
  thumbnail: string;
  cup_logo: string;
  competition_type: string;
  first_page_order: number;
  live_score_page_order: number;
  default_order: number;
}

export interface StandingTable {
  team: Team;
  form: Form[];
  rank: number;
  score: number;
  played_matches: number;
  won_matches: number;
  lost_matches: number;
  scored_goals: number;
  conceded_goals: number;
  red_cards: number;
  yellow_cards: number;
  goal_difference: number;
  total_cards: number;
  is_in_live_match: boolean;
  rank_change: number;
}

export interface Team {
  id: string;
  slug: string;
  title: string;
  english_name: string;
  logo: string;
  thumbnail: string;
  is_active: boolean;
  full_title: string;
  is_national: boolean;
  country: Country;
  to_be_decided: boolean;
}

export interface Country {
  name: string;
  english_name: string;
  flag_1x1: string;
  flag_4x3: string;
}

export interface Form {
  state?: string;
  match_id: string;
  title: string;
}