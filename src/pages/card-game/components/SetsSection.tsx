import * as React from 'react';

import { useGetCardSetGroupByLanguageQuery } from '@/hooks/query/card-set';

import Typography from '@/components/typography/Typography';

import LatestSets from '@/pages/components/card-set/latest/LatestSets';
import LatestSetsSkeleton from '@/pages/components/card-set/latest/LatestSetsSkeleton';

import { CardGame } from '@/types/entities/card-game';

export default function SetsSection({ data }: { data: CardGame }) {
  //#region  //*=========== Card Sets by Language Data ===========
  const {
    data: queryData,
    isLoading,
    isError,
  } = useGetCardSetGroupByLanguageQuery({
    cardgame_id: data.id,
  });
  const cardSetByLanguageData = queryData?.response ?? [];

  const shouldShowSkeleton = isLoading || isError;
  //#endregion  //*======== Card Sets by Language Data ===========
  return (
    <section className='from-secondary-800/30 to-secondary-800 -mt-16 bg-gradient-to-b pb-16 pt-32'>
      <div className='layout'>
        <Typography as='h1' variant='j1'>
          Latest Sets
        </Typography>

        <div className='mt-12 flex flex-col gap-6'>
          {shouldShowSkeleton
            ? [...Array(3)].map((_, i) => (
                <LatestSetsSkeleton key={i} order={i} />
              ))
            : cardSetByLanguageData.map((set, i) => (
                <LatestSets key={set.category_id} data={set} order={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
