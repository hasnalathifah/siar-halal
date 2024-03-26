import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';
import { CardGame } from '@/types/entities/card-game';

export function useGetCardGameQuery(
  options?: UseQueryOptions<ApiResponse<CardGame[]>, Error>
) {
  const result = useQuery<ApiResponse<CardGame[]>, Error>(['/cardgame'], {
    refetchOnWindowFocus: false,
    ...options,
  });

  return result;
}
