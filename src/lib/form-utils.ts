import { lookup } from 'mime-types';

import { imagePrefixUrl } from '@/constant/env';

import { File } from '@/types/dropzone';

export const convertUrlToFileWithPreview = ({
  url,
  fileName,
  withPrefix = false,
}: {
  url?: string;
  fileName: string;
  withPrefix?: boolean;
}) =>
  url
    ? [
        {
          preview: `${withPrefix ? imagePrefixUrl : ''}${url}`,
          name: fileName,
          type: lookup(url) || 'image/jpeg',
        },
      ]
    : [];

export const convertMultipleUrlToFileWithPreview = ({
  url,
  fileName,
  withPrefix = false,
}: {
  url?: string[];
  fileName: string;
  withPrefix?: boolean;
}): File => {
  if (!url) return [];

  if (url?.[0] === 'no image') return [];

  return url?.map((item, i) => ({
    preview: `${withPrefix ? imagePrefixUrl : ''}${item}`,
    name: `${fileName} - ${i + 1}`,
    type: lookup(item) || 'image/jpeg',
  }));
};
