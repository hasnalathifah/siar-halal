import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

export default function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Index' />

      <main>
        <section className=''>
          <div className='layout min-h-main py-20'>
            <Typography as='h1' variant='j1'>
              Component Sandbox
            </Typography>
            <hr className='border-typo-divider my-8 h-1 w-full' />

            <div className='mt-6 flex flex-wrap gap-2'>
              {sandbox.map(({ title, route }) => (
                <ButtonLink key={route} href={route} variant='outline'>
                  {title}
                </ButtonLink>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const sandbox = [
  {
    title: 'Design',
    route: '/sandbox/design',
  },
  {
    title: 'Components',
    route: '/sandbox/components',
  },
  {
    title: 'Form',
    route: '/sandbox/form',
  },
];
