import * as React from 'react';
import {
  HiOutlineExternalLink,
  HiOutlineEye,
  HiOutlinePaperClip,
  HiOutlinePhotograph,
  HiX,
} from 'react-icons/hi';
import Lightbox from 'react-image-lightbox-rotation';

import 'react-image-lightbox-rotation/style.css';

import UnstyledLink from '@/components/links/UnstyledLink';

import { FileWithPreview } from '@/types/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
} & (
  | {
      deleteFile?: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: true;
    }
  | {
      deleteFile: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: false;
    }
);

export default function FilePreview({
  deleteFile,
  file,
  readOnly,
}: FilePreviewProps): React.ReactElement {
  const [index, setIndex] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const images = [file.preview];

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const imagesType = ['image/png', 'image/jpg', 'image/jpeg'];

  return imagesType.includes(file.type) ? (
    <>
      <li
        className='flex items-center justify-between py-4 pl-3 pr-4 text-sm'
        key={file.name}
      >
        <div className='flex w-0 flex-1 items-center'>
          <HiOutlinePhotograph
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
          <span className='ml-2 w-0 flex-1 truncate'>{file.name}</span>
        </div>
        <div className='ml-4 flex flex-shrink-0 items-center space-x-2'>
          <button
            type='button'
            onClick={() => setIsOpen(true)}
            className='focus:ring-typo-outline text-secondary-500 hover:text-secondary-600 inline-block rounded text-lg font-medium focus:outline-none focus:ring'
          >
            <HiOutlineEye />
          </button>
          {!readOnly && (
            <button
              type='button'
              onClick={handleDelete}
              className='text-error hover:text-error/50 focus:ring-error rounded text-lg font-medium focus:outline-none focus:ring'
            >
              <HiX />
            </button>
          )}
        </div>
      </li>
      {isOpen && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % images.length]}
          prevSrc={images[(index + images.length - 1) % images.length]}
          rotate={0}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setIndex(
              (prevIndex) => (prevIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
        />
      )}
    </>
  ) : (
    <li
      key={file.name}
      className='flex items-center justify-between py-4 pl-3 pr-4 text-sm'
    >
      <div className='flex w-0 flex-1 items-center'>
        <HiOutlinePaperClip
          className='h-5 w-5 flex-shrink-0 text-gray-400'
          aria-hidden='true'
        />
        <span className='ml-2 w-0 flex-1 truncate'>{file.name}</span>
      </div>
      <div className='ml-4 flex flex-shrink-0 items-center space-x-2'>
        <UnstyledLink
          href={file.preview}
          className='focus:ring-primary-500 text-secondary-500 hover:text-secondary-600 rounded focus:outline-none focus:ring'
        >
          <HiOutlineExternalLink size={20} />
        </UnstyledLink>
        {!readOnly && (
          <button
            className='text-error hover:text-error/50 focus:ring-error cursor-pointer rounded focus:outline-none focus:ring'
            type='button'
            onClick={(e) => deleteFile?.(e, file)}
          >
            <HiX size={24} />
          </button>
        )}
      </div>
    </li>
  );
}
