export default interface TeamMatches {
  last_matches: Match[],
  next_matches: Match[]
}

export interface Match {
  id: string;
  home_team: HomeTeam;
  away_team: AwayTeam;
  home_score: number;
  away_score: number;
  status_details: StatusDetails;
  holds_at: number;
  started_at: number;
  is_active: boolean;
  is_postponed: boolean;
  broadcast_channel: string;
  is_finished: boolean;
  competition: Competition;
  week_number: number;
  status: Status;
  minute: number;
  slug: string;
  stadium: Stadium;
  home_penalty_score: string;
  away_penalty_score: string;
  spectators: string;
  referee: Referee;
  has_standing: boolean;
  has_stats: boolean;
  has_lineups: boolean;
  competition_trend_stage_id: string;
  header_events: HeaderEvent[];
  properties: string[];
  related_matches: string[];
  round_type: RoundType;
  state_timelines: StateTimeline[];
}

export interface HomeTeam {
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

export interface AwayTeam {
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

export interface StatusDetails {
  status_id: number;
  title: string;
  status_type: string;
}

export interface Competition {
  id: string;
  title: string;
  english_name: string;
  competition: string;
  slug: string;
  logo: string;
  thumbnail: string;
  seo_slug: string;
  has_live_match: boolean;
  standing_last_update: number;
}

export interface Status {
  '3': string;
}

export interface Stadium {
  name: string;
  country: Country;
  city: string;
  latitude: string;
  longitude: string;
  capacity: number;
  opened_at: string;
}

export interface Referee {
  id: string;
  fullname: string;
  image: string;
}

export interface HeaderEvent {
  id: string;
  player: Player;
  team: Team;
  event_type: EventType;
  minute: number;
  minute_plus: number;
  period: string;
  reason: string;
  sort_order: string;
  match_event_relation: MatchEventRelation;
  media: Media;
}

export interface Player {
  id: string;
  slug: string;
  fullname: string;
  english_name: string;
  image: string;
  position: Position;
  kit_number: number;
  person: Person;
}

export interface Position {
  key: string;
  value: string;
}

export interface Person {
  id: string;
  fullname: string;
  image: string;
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

export interface EventType {
  short_form: string;
  title: string;
  empty_value: string;
}

export interface MatchEventRelation {
  relation: string;
  type: string;
}

export interface Media {
  id: string;
  file: string;
  thumbnail: string;
  media_type: string;
  upload_video_link: string;
  title: string;
  aparat_link: string;
  cover_image: string;
  arvan_link: string;
  arvan_hls: string;
  arvan_mpd: string;
  arvan_ad: string;
  duration: number;
  hour_duration: number;
  minute_duration: number;
  second_duration: number;
  youtube_link: string;
  youtube_ifram: string;
}

export interface RoundType {
  name: string;
  value: number;
  is_knockout: boolean;
  display_name: string;
}

export interface StateTimeline {
  state: string;
  time: number;
}
