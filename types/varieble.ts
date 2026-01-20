export interface VariebleMenuItem {
  icon: string;
  id: number;
  path: string;
  title: string;
}

export interface VariebleMenuList {
  editor: VariebleMenuItem[];
  reviewer: VariebleMenuItem[];
}
