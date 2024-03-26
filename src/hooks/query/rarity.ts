import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';
import { Rarity } from '@/types/entities/rarity';

export function useGetRarityByCardGame({
  cardgame_id,
  options,
}: {
  cardgame_id?: string | number;
  options?: UseQueryOptions<ApiResponse<Rarity[]>, Error>;
}) {
  const result = useQuery<ApiResponse<Rarity[]>, Error>(
    [`/rarity/cardgame/${cardgame_id}`],
    {
      refetchOnWindowFocus: false,
      enabled: !!cardgame_id,
      ...options,
    }
  );

  return result;
}

export function useGetRarityDetail({
  id,
  options,
}: {
  id?: string | number;
  options?: UseQueryOptions<ApiResponse<Rarity>, Error>;
}) {
  const result = useQuery<ApiResponse<Rarity>, Error>(
    [`/rarity/cardgame/${id}`],
    {
      refetchOnWindowFocus: false,
      enabled: !!id,
      ...options,
    }
  );

  return result;
}
