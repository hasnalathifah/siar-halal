import { useRouter } from 'next/router';
import * as React from 'react';

export default function useSyncQuery({
  withDebounce = true,
  key,
  value,
}: {
  withDebounce?: boolean;
  key: string;
  value?: string;
}) {
  const router = useRouter();
  const query = router.query;

  React.useEffect(() => {
    const timeout = setTimeout(
      () => {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...query,
              ...(value && { [key]: value }),
            },
          },
          undefined,
          { shallow: true }
        );
      },
      withDebounce ? 300 : 0
    );
    return () => clearTimeout(timeout);

    //? Ignore query and router to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);
}
