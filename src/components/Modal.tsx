import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { HiOutlineX } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/typography/Typography';

import { ExtractProps } from '@/types/helper';

type ModalProps = {
  className?: string;
  children: React.ReactNode;
  /** Set to true to prevent closing the modal when clicking outside the modal or press esc button */
  disableClickOutside?: boolean;
  /** Use sm:max-w-xx to adjust max-width */
  containerClassName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: React.ReactNode;
  titleClassName?: string;
} & Omit<ExtractProps<typeof Dialog>, 'onClose' | 'unmount'>;

export function ModalRoot({
  className,
  children,
  disableClickOutside = false,
  containerClassName,
  open,
  setOpen,
  title,
  titleClassName,
  ...rest
}: ModalProps) {
  // Set initial focus to the container div instead of automatically focused to the close button
  const containerRef = React.createRef<HTMLDivElement>();

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as='div'
        className={clsxm('fixed inset-0 z-[101] overflow-y-auto', className)}
        {...rest}
        onClose={() => setOpen(disableClickOutside ? true : false)}
        initialFocus={containerRef}
      >
        <div
          className='flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0'
          ref={containerRef}
        >
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 blur-sm transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:h-screen sm:align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              className={clsxm(
                'align bg-secondary-900 inline-block transform rounded-2xl text-left shadow-xl transition-all sm:align-middle',
                'sm:w-11/12 sm:max-w-xl',
                containerClassName
              )}
            >
              <div className='divide-typo-divider w-full divide-y'>
                {title && (
                  <header className='flex items-center justify-between px-4 py-4 sm:px-6'>
                    <Typography
                      as={Dialog.Title}
                      variant='s1'
                      className={clsxm('pr-2', titleClassName)}
                    >
                      {title}
                    </Typography>
                    {!disableClickOutside && (
                      <IconButton
                        onClick={() => setOpen(false)}
                        variant='ghost'
                        size='sm'
                        icon={HiOutlineX}
                        iconClassName='text-2xl text-typo-icons'
                      />
                    )}
                  </header>
                )}
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

/**
 * defaults to p-4 sm:p-6, change it with className if needed
 */
function Section({
  className,
  children,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsxm('flex w-full flex-col', 'p-4 sm:p-6', className)}>
      {children}
    </div>
  );
}

const Modal = Object.assign(ModalRoot, { Section });
export default Modal;
