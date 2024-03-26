import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';
import { CardSetByLanguage } from '@/types/entities/card-set';

export function useGetCardSetGroupByLanguageQuery({
  cardgame_id,
  options,
}: {
  cardgame_id?: string | number;
  options?: UseQueryOptions<ApiResponse<CardSetByLanguage[]>, Error>;
}) {
  const result = useQuery<ApiResponse<CardSetByLanguage[]>, Error>(
    [`/cardset/language/${cardgame_id}`],
    {
      enabled: !!cardgame_id,
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return result;
}
