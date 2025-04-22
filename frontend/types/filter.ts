export interface SelectedFilter {
  type: 'area' | 'category' | 'ingredient' | null;
  value: string | null;
}

export interface FilterValue {
  id: string;
  name: string;
}

export interface FilterResponse {
  values: FilterValue[];
}
