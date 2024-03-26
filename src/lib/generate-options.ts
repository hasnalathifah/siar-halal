import get from 'lodash.get';

import { Paths } from '@/types/helper';

type GenerateOptionsProps<T> = {
  data?: T[];
  key: {
    value: Paths<T>;
    label: Paths<T>;
  };
};

export function generateOptions<T>({ data, key }: GenerateOptionsProps<T>) {
  return (
    data?.map((item) => ({
      value: get(item, key.value) + '',
      label: get(item, key.label) + '',
    })) || []
  );
}
