import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiError, ApiResponse } from '@/types/api';
import { CardByRarity } from '@/types/entities/card';

export function useGetCardGroupByRarityQuery({
  cardset_id,
  options,
}: {
  cardset_id?: string | number;
  options?: UseQueryOptions<ApiResponse<CardByRarity[]>, AxiosError<ApiError>>;
}) {
  const result = useQuery<ApiResponse<CardByRarity[]>, AxiosError<ApiError>>(
    [`/product/cardset/${cardset_id}`],
    {
      enabled: !!cardset_id,
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return result;
}
