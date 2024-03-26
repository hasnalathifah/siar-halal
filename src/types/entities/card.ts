export interface Card {
  id: number;
  product_code: string;
  created_at: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  is_active: boolean;
  language: string;

  cardgame: string;
  cardgame_id: number;

  cardset: string;
  cardset_id: number;

  rarity: string;
  rarity_id: number;

  images: string[];
  promo?: string[];
}

export interface CardByRarity {
  rarity: string;
  products: Card[];
}
