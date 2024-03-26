import { Card } from '@/types/entities/card';

export interface Rarity {
  id: number;
  name: string;
  cardgame_id: number;
}

export type IncludeCard = {
  products: Card[];
};
