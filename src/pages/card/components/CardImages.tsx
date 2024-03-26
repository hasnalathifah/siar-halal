import clsx from 'clsx';
import { ZoomIn } from 'lucide-react';
import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Lightbox from 'react-image-lightbox-rotation';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox-rotation/style.css';

import clsxm from '@/lib/clsxm';

import IconButton from '@/components/buttons/IconButton';
import ProductImage from '@/components/images/ProductImage';

import { imagePrefixUrl } from '@/constant/env';

import { Card } from '@/types/entities/card';

type CardImages = { data: Card } & React.ComponentPropsWithoutRef<'div'>;

//#region  //*=========== Controls ===========
function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={FiChevronRight}
      variant='light'
      size='sm'
      className={clsx(
        'right-4 top-1/2 -translate-y-1/2',
        'absolute z-10',
        'hover:-translate-y-1/2',
        'opacity-0 group-hover:opacity-100'
      )}
    />
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <IconButton
      onClick={onClick}
      icon={FiChevronLeft}
      variant='light'
      size='sm'
      className={clsx(
        'left-4 top-1/2 -translate-y-1/2',
        'absolute z-10',
        'hover:-translate-y-1/2',
        'opacity-0 group-hover:opacity-100'
      )}
    />
  );
}
//#endregion  //*======== Controls ===========

export default function CardImages({ data, className, ...rest }: CardImages) {
  const [slide, setSlide] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  //#region  //*=========== Main Slider ===========
  const sliderRef = React.createRef<Slider>();
  const settings: Settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, newIndex) => setSlide(newIndex),
  };
  //#endregion  //*======== Main Slider ===========

  const gotoSlide = (slide: number) => {
    sliderRef.current?.slickGoTo(slide);
  };

  const imageData = React.useMemo(
    () => data.images.map((image) => imagePrefixUrl + image),
    [data]
  );

  React.useEffect(() => {
    gotoSlide(slide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  return (
    <div className={clsxm('group', className)} {...rest}>
      {/* main carousel */}
      {/* <pre>{JSON.stringify(imageData, null, 2)}</pre> */}
      <div className='relative'>
        <Slider
          ref={sliderRef}
          className='aspect-square cursor-grab overflow-hidden rounded-md'
          {...settings}
        >
          {imageData.map((image, i) => (
            <div key={i} className='relative aspect-square bg-inherit'>
              <ProductImage
                src={image}
                fill
                sizes='(max-width: 768px) 100vw,(max-width: 1200px) 50vw'
                alt={`${data.name} Photo ${i + 1}`}
                className='absolute inset-0 w-full'
                imgClassName='object-cover w-full h-full'
                blurClassName='bg-secondary-800/30'
                useSkeleton
                unoptimized
              />
            </div>
          ))}
        </Slider>
        <IconButton
          icon={ZoomIn}
          onClick={() => setIsOpen(true)}
          className='absolute bottom-4 right-4'
        />
      </div>

      {/* thumbnail */}
      <div className='mt-4 grid select-none grid-cols-5 gap-1'>
        {imageData.map((image, i) => (
          <button
            key={i}
            onClick={() => gotoSlide(i)}
            className={clsx([
              'relative aspect-square w-full shrink-0',
              'transition-all duration-100 ease-out',
              'border focus:outline-none',
              i === slide
                ? 'border-primary-300/70'
                : 'border-transparent brightness-50',
            ])}
          >
            <ProductImage
              src={image}
              fill
              sizes='10vw'
              alt={`${data.name} Thumbnail ${i + 1}`}
              className='absolute inset-0 w-full'
              imgClassName='object-cover w-full h-full'
              blurClassName='bg-secondary-800/30'
              useSkeleton
              unoptimized
              quality={10}
            />
          </button>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={imageData[slide]}
          nextSrc={imageData[(slide + 1) % imageData.length]}
          prevSrc={imageData[(slide + imageData.length - 1) % imageData.length]}
          rotate={0}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setSlide(
              (prevIndex) =>
                (prevIndex + imageData.length - 1) % imageData.length
            )
          }
          onMoveNextRequest={() =>
            setSlide((prevIndex) => (prevIndex + 1) % imageData.length)
          }
        />
      )}
    </div>
  );
}
