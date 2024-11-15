export type DoItem = {
  id: string;
  name: string;
  created_at?: string;
  plan_started?: string;
  plan_ended?: string;
  actual_started?: string;
  actual_ended?: string;
  progress?: number;
  assignee?: string[];
  notes?: string[];
  upper_item_id?: string;
  children?: DoItem[];

  totalChildrenCount?: number;
  completeChildrenCount?: number;
  inProgressChildrenCount?: number;
};
