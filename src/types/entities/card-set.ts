export interface CardSet {
  id: number;
  name: string;
  image?: string;
  category_id: number;

  cardgame: string;
  cardgame_id: number;

  language: string;
  language_id: number;

  parent_category: string;
  parent_category_id: number;

  created_at: string;
}

export interface CardSetByLanguage {
  language: string;
  category_id: number;
  cardsets: CardSet[];
}
