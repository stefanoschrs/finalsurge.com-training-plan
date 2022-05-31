export interface RootObject {
  server_time: string;
  data: TrainingDay[];
  hide_after?: any;
  user_current_date?: string | null;
  success: boolean;
  error_number?: any;
  error_description?: any;
  call_id: string;
}

export interface TrainingDay {
  has_download_file: boolean;
  download_file_extension?: any;
  garmin_sync_time?: any;
  garmin_sync_available: boolean;
  external_data_source?: any;
  is_team_workout: boolean;
  can_split: boolean;
  valid_merge_target: boolean;
  valid_merge_source: boolean;
  has_pain_point_records: boolean;
  has_structured_workout: boolean;
  pain_point_records?: any;
  gender?: any;
  user_key: string;
  user_name: string;
  user_profile_pic_url?: any;
  key: string;
  wcal_key?: any;
  wcal_label?: any;
  can_delete: boolean;
  can_hide: boolean;
  can_move: boolean;
  coach_assigned: boolean;
  coach_user_key?: any;
  coach_name?: any;
  coach_profile_pic_url?: any;
  has_actual_data: boolean;
  has_intervals: boolean;
  has_map: boolean;
  has_stats: boolean;
  has_attachments: boolean;
  attachments?: any;
  workout_date: string | Date;
  workout_time?: any;
  order: number;
  plan_day: number;
  name: string;
  description: string;
  location_name?: any;
  location_street?: any;
  location_city?: any;
  location_state?: any;
  location_zip?: any;
  location_country?: any;
  is_race: boolean;
  race_place_overall?: any;
  race_age_group?: any;
  felt?: any;
  effort?: any;
  post_workout_notes?: any;
  weather_temperature?: any;
  weather_is_celsius?: any;
  weather_humidity?: any;
  weather_sunny?: any;
  weather_partly_sunny?: any;
  weather_cloudy?: any;
  weather_lightrain?: any;
  weather_rain?: any;
  weather_snow?: any;
  weather_windy?: any;
  CommentCount: number;
  CommentCountNew?: any;
  workout_completion: number;
  workout_status_text: string;
  workout_status_color: string;
  workout_status_indicator: number;
  MapURL?: any;
  Activities: Activity[];
  warm_up?: any;
  cool_down?: any;
  plan_instance_info: PlanInstanceInfo;
  integration_info?: any;
}

export interface Activity {
  activity_type_key: string;
  activity_type_name: string;
  activity_type_icon: number;
  activity_sub_type_key?: any;
  activity_sub_type_name?: any;
  activity_type_color: string;
  activity_type_forecolor: string;
  equipment?: any;
  route?: any;
  number: number;
  planned_duration?: number;
  planned_amount?: any;
  planned_amount_type?: any;
  planned_amount_normalized?: any;
  planned_pace_low?: number;
  planned_pace_low_type: string;
  planned_pace_high?: number;
  planned_pace_high_type: string;
  planned_pace_display: string;
  planned_pace_display_type: string;
  quantity?: any;
  duration?: any;
  time_elapsed?: any;
  time_timer?: any;
  time_moving?: any;
  amount?: any;
  amount_type?: any;
  amount_normalized?: any;
  pace?: any;
  pace_type?: any;
  pace_display?: any;
  pace_display_type?: any;
  speed_avg?: any;
  speed_max?: any;
  speed_type?: any;
  temp_avg?: any;
  temp_max?: any;
  power_avg?: any;
  power_max?: any;
  cadence_avg?: any;
  cadence_max?: any;
  hr_avg?: any;
  hr_max?: any;
  rpm_avg?: any;
  rpm_max?: any;
  elevation_gain_display_type?: any;
  elevation_gain_display?: any;
  elevation_loss_display_type?: any;
  elevation_loss_display?: any;
  elevation_gain?: any;
  elevation_gain_type?: any;
  elevation_loss?: any;
  elevation_loss_type?: any;
  calories?: any;
  variability?: any;
  intensity?: any;
  weighted_power?: any;
  meanmax_power_30?: any;
  vertical_oscillation_avg?: any;
  vertical_oscillation_max?: any;
  ground_contact_time_avg?: any;
  ground_contact_time_max?: any;
  ground_contact_balance_avg?: any;
  ground_contact_balance_max?: any;
  stride_length_avg?: any;
  vertical_ratio_avg?: any;
  form_power?: any;
  leg_spring?: any;
  right_power_avg?: any;
  right_power_pct_avg?: any;
  left_power_avg?: any;
  left_power_pct_avg?: any;
  RestActivity?: any;
  Laps?: any;
}

export interface PlanInstanceInfo {
  plan_instance_key?: string;
  plan_name?: string;
  target_date?: string;
  number_of_weeks?: number;
  plan_options?: string;
}