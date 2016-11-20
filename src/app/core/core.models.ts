import { PrivateTeam } from '../teams/teams.models';


export class Skill {
  id: number;
  name: string;
}

export class Season {
  id: number;
  name: string;
  topic: string;
  front_page: string;
  min_team_members_count: number;
  max_team_members_count: number;
  sign_up_deadline: string;
  mentor_pick_start_date: string;
  mentor_pick_end_date: string;
  make_team_dead_line: string;
}

class CompetitorInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export class Me {
  is_competitor: boolean;
  team_membership_id: number;
  competitor_info: CompetitorInfo;
  team: PrivateTeam;
}
