import * as React from 'react';

import LogoWithText from '@/components/layout/LogoWithText';
import UnstyledLink from '@/components/links/UnstyledLink';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import Typography from '@/components/typography/Typography';

import { FOOTER_CONTENT, SOCIAL_LINKS } from '@/content/footer';

export default function Footer() {
  return (
    <footer className='bg-secondary-900 border-typo-divider z-10 border-t pt-12'>
      <div className='layout flex flex-col gap-12'>
        <div className='grid gap-x-8 gap-y-12 md:grid-cols-[2fr_1fr]'>
          <div className='flex flex-col gap-8'>
            <LogoWithText />
            <Typography variant='b2'>
              The leading Card Game Marketplace in Indonesia
              <br />
              Discover the best Card Game collections.
            </Typography>
            <div className='flex items-center gap-8'>
              {SOCIAL_LINKS.map((social) => (
                <TooltipProvider delayDuration={300} key={social.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <UnstyledLink href={social.url} className='group'>
                        <social.icon className='text-secondary-600 group-hover:text-primary-400 text-2xl transition-colors duration-300 ease-in' />
                      </UnstyledLink>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography variant='c1'>{social.title}</Typography>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {FOOTER_CONTENT.map((content) => (
              <div key={content.title} className='flex flex-col gap-6'>
                <Typography variant='b2'>{content.title}</Typography>
                <div className='flex flex-col gap-4'>
                  {content.links.map((link) => (
                    <UnstyledLink
                      key={link.title}
                      href={link.url}
                      className='group'
                    >
                      <Typography
                        variant='b3'
                        className='text-typo-secondary group-hover:text-typo transition-colors duration-300 ease-in'
                      >
                        {link.title}
                      </Typography>
                    </UnstyledLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='border-typo-divider  border-t py-8'>
          <Typography variant='b3' color='tertiary'>
            Copyright © {new Date().getFullYear()} Hype and Play. All rights
            reserved
          </Typography>
        </div>
      </div>
    </footer>
  );
}
