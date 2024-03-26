/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'next/router';
import * as React from 'react';

import DiscoverCard from '@/pages/components/card/discover/DiscoverCard';
import DiscoverCardSet from '@/pages/components/card-set/discover/DiscoverCardSet';
import Discover, { DiscoverType } from '@/pages/components/discover/Discover';

import { CardGame } from '@/types/entities/card-game';

type DiscoverSection = {
  data: CardGame;
  cardGameId: string;
};

export default function DiscoverSection({ data, cardGameId }: DiscoverSection) {
  const router = useRouter();
  const query = router.query;

  //#region  //*=========== Discover Tabs ===========
  const [type, setType] = React.useState<DiscoverType>(
    (query['type'] as DiscoverType) ?? 'card'
  );

  //#endregion  //*======== Discover Tabs ===========

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...query,
            'search-card': type === 'set' ? '' : query['search-card'],
            'search-set': type === 'card' ? '' : query['search-set'],
            type: type,
          },
        },
        undefined,
        { shallow: true }
      );
    }, 300);
    return () => clearTimeout(timeout);

    //? Ignore query and router to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Discover>
      <Discover.Title type={type}> {data.name}</Discover.Title>
      {type === 'card' && (
        <DiscoverCard cardGameId={data.id} type={type} setType={setType} />
      )}
      {type === 'set' && (
        <DiscoverCardSet cardGame={data} type={type} setType={setType} />
      )}
    </Discover>
  );
}
