import clsx from 'clsx';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

import { imagePrefixUrl } from '@/constant/env';
import RoundedEdge from '@/graphic/RoundedEdge';

import { CardGame } from '@/types/entities/card-game';
import { ExtractProps } from '@/types/helper';

type CardGameProps = {
  data: CardGame;
} & React.ComponentPropsWithoutRef<'div'>;

export default function CardGameView({
  data,
  className,
  ...rest
}: CardGameProps) {
  return (
    <div
      className={clsxm([
        'relative h-fit select-none rounded-[1.25rem] bg-white p-2',
        'transition-all duration-200 ease-out',
        'hover:shadow-secondary-100/30 hover:shadow-2xl',
        className,
      ])}
      {...rest}
    >
      {data.background_image ? (
        <NextImage
          src={imagePrefixUrl + data.background_image}
          fill
          sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
          alt={data.name}
          className='pointer-events-none  relative aspect-[3/4] w-full overflow-hidden rounded-xl'
          imgClassName='w-full absolute object-cover'
        />
      ) : (
        <div className='from-primary-100 to-primary-300 pointer-events-none  relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br'></div>
      )}

      {data.logo_image ? (
        <NextImage
          src={imagePrefixUrl + data.logo_image}
          fill
          sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
          alt={data.name}
          className={clsx([
            'pointer-events-none absolute left-1/2 top-1/2 aspect-video w-4/5  -translate-x-1/2 -translate-y-1/2',
          ])}
          imgClassName='w-full absolute inset-x-0 object-contain'
        />
      ) : (
        <Typography
          variant='j3'
          className={clsx([
            'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
            'bg-gradient-to-r bg-clip-text text-transparent',
            ' from-primary-700  to-primary-600 via-primary-500',
          ])}
        >
          {data.name}
        </Typography>
      )}

      <div className='absolute right-2 top-2 flex'>
        <RoundedEdge direction='bottom-left' />
        <div className='z-10 -ml-[4px] h-12 bg-white pr-2'>
          <Typography variant='c1' color='secondary'>
            Card Game
          </Typography>
          <Typography variant='b2' color='black'>
            {data.name}
          </Typography>
        </div>
      </div>

      <div className='absolute inset-x-2 bottom-2 flex'>
        <div className='flex'>
          <div className='z-10 -mr-[4px] flex h-12 min-w-[5.5rem] flex-col justify-end bg-white pl-2'>
            <Typography
              variant='c1'
              color='secondary'
              className='whitespace-nowrap'
            >
              Card Count
            </Typography>
            <Typography variant='b2' color='black'>
              100++
            </Typography>
          </div>
          <RoundedEdge direction='top-right' />
        </div>
        <CardButton href={`/card-game/${data?.id}`} />
      </div>
    </div>
  );
}

function CardButton({
  ...props
}: Omit<ExtractProps<typeof UnstyledLink>, 'children'>) {
  return (
    <div className='-ml-6 mr-[5px] flex  w-full  pb-[5px] pt-0'>
      <UnstyledLink {...props} className='group relative flex  h-full w-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={32}
          height={43}
          fill='none'
          className='fill-primary-600 group-hover:fill-primary-700 -mr-[0.5px] h-full'
        >
          <mask
            id='a'
            width={32}
            height={43}
            x={0}
            y={0}
            maskUnits='userSpaceOnUse'
            style={{
              maskType: 'alpha',
            }}
          >
            <path fill='#D9D9D9' d='M0 0h32v43H0z' />
          </mask>
          <g mask='url(#a)'>
            <path d='M1.881 8.5C.06 4.527 2.963 0 7.335 0h118.343c6.694 0 12.12 5.426 12.12 12.12v18.76c0 6.694-5.426 12.12-12.12 12.12H25.398a12 12 0 0 1-10.909-6.999L1.881 8.501Z' />
          </g>
        </svg>
        <div className='bg-primary-600 group-hover:bg-primary-700 -ml-[1px] h-full w-full rounded-r-lg' />

        <Typography
          variant='b3'
          className='absolute left-1/2 top-1/2 -translate-x-[calc(50%-10%)] -translate-y-[calc(50%+1px)]'
        >
          more
        </Typography>
      </UnstyledLink>
    </div>
  );
}
