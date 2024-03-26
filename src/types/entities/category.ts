const CATEGORY_TYPE = ['cardgame', 'language', 'cardset', 'normal'] as const;

export type CategoryType = (typeof CATEGORY_TYPE)[number];

export type Category = {
  id: number;
  name: string;
  parent_id: number;
  category_type: CategoryType;
  child: Category[] | null;
};
