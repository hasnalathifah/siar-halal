import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlineXCircle } from 'react-icons/hi';

import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/forms/Checkbox';
import DatePicker from '@/components/forms/DatePicker';
import DropzoneInput from '@/components/forms/DropzoneInput';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import Radio from '@/components/forms/Radio';
import SearchableSelectInput from '@/components/forms/SearchableSelectInput';
import TextArea from '@/components/forms/TextArea';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

/**
 * This is typed incorrectly for the sake of sandbox purpose
 * If you need a boilerplate for a new RHF page,
 * please take a reference for React Hook Form Layout on
 * @see /components/forms/boilerplate.tsx
 */

export default function FormSandbox() {
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      'search-readonly': 'Wina',
      'name-readonly': 'Wina Tungmiharja',
      'selectinput-readonly': 'option2',
      'selectinputmulti-readonly': ['option1', 'option2'],
      'price-readonly': '5.000',
      'password-readonly': 'Secret123',
      'date-readonly': new Date(),
      fruits: ['apple'],
      language: 'javascript',
    },
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (data: unknown) => {
    logger({ data }, 'rhf.tsx line 33');

    return;
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <Layout>
      <Seo templateTitle='Form Sandbox' />

      <section className=''>
        <div className='layout min-h-screen py-12'>
          <Typography as='h1' variant='j1'>
            Form
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mt-8 flex flex-col'
            >
              <div className='flex flex-col gap-8  md:flex-row md:items-end'>
                <Input
                  id='name-example'
                  label='Name'
                  placeholder='Enter your name'
                />
                <SearchableSelectInput
                  id='selectinput-example'
                  label='Select Input'
                  placeholder='Select'
                  options={[
                    { value: 'option1', label: 'option 1' },
                    {
                      label: 'option 2',
                      value: 'option2',
                    },
                    {
                      label: 'option 3',
                      value: 'option3',
                    },
                  ]}
                />
                <Button variant='dark'>Save</Button>
              </div>
              <hr className='border-typo-divider my-8 h-1 w-full' />
              <div className='mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2'>
                <Input
                  id='name'
                  label='Name'
                  placeholder='Enter your name'
                  validation={{ required: 'Name must be filled' }}
                  containerClassName='w-full'
                />

                <Input
                  id='name-readonly'
                  label='Name'
                  placeholder='Enter your name'
                  validation={{ required: 'Name must be filled' }}
                  readOnly
                />
                <Input
                  id='price'
                  label='Price'
                  validation={{ required: 'Price must be filled' }}
                  placeholder='Enter your price'
                  helperText='This is a helper text'
                  leftIcon='Rp'
                />
                <Input
                  id='price-readonly'
                  label='Price'
                  validation={{ required: 'Price must be filled' }}
                  placeholder='Enter your price'
                  helperText='This is a helper text'
                  leftIcon='Rp'
                  readOnly
                />
                <PasswordInput
                  id='password'
                  label='Password'
                  validation={{ required: 'Password must be filled' }}
                  placeholder='Enter your password'
                />
                <PasswordInput
                  id='password-readonly'
                  label='Password'
                  validation={{ required: 'Password must be filled' }}
                  placeholder='Enter your password'
                  readOnly
                />
                <Input
                  id='search'
                  label='Search'
                  placeholder='Search something...'
                  validation={{ required: 'Search must be filled' }}
                  helperText='This is a helper text'
                  leftIcon={HiOutlineSearch}
                  rightNode={
                    <button type='button' className='p-1'>
                      <HiOutlineXCircle className='text-typo-icons text-xl' />
                    </button>
                  }
                />
                <Input
                  id='search-readonly'
                  label='Search'
                  placeholder='Search something...'
                  validation={{ required: 'Search must be filled' }}
                  helperText='This is a helper text'
                  leftIcon={HiOutlineSearch}
                  rightNode={
                    <button type='button' className='p-1'>
                      <HiOutlineXCircle className='text-typo-icons text-xl' />
                    </button>
                  }
                  readOnly
                />
                <SearchableSelectInput
                  id='selectinput'
                  label='Select Input'
                  placeholder='Select something'
                  options={[
                    { value: 'option1', label: 'option 1' },
                    {
                      label: 'option 2',
                      value: 'option2',
                    },
                    {
                      label: 'option 3',
                      value: 'option3',
                    },
                  ]}
                  validation={{ required: 'Select Input must be filled' }}
                />
                <SearchableSelectInput
                  id='selectinput-readonly'
                  label='Select Input'
                  placeholder='Select something'
                  options={[
                    { value: 'option1', label: 'option 1' },
                    {
                      label: 'option 2',
                      value: 'option2',
                    },
                    {
                      label: 'option 3',
                      value: 'option3',
                    },
                  ]}
                  validation={{ required: 'Select Input must be filled' }}
                  readOnly
                />
                <SearchableSelectInput
                  isMulti
                  id='selectinputmulti'
                  label='Select Input'
                  placeholder='Select something'
                  options={[
                    { value: 'option1', label: 'option 1' },
                    {
                      label: 'option 2',
                      value: 'option2',
                    },
                    {
                      label: 'option 3',
                      value: 'option3',
                    },
                  ]}
                  validation={{ required: 'Select Input must be filled' }}
                />

                <SearchableSelectInput
                  isMulti
                  id='selectinputmulti-readonly'
                  label='Select Input'
                  placeholder='Select something'
                  options={[
                    { value: 'option1', label: 'option 1' },
                    {
                      label: 'option 2',
                      value: 'option2',
                    },
                    {
                      label: 'option 3',
                      value: 'option3',
                    },
                  ]}
                  validation={{ required: 'Select Input must be filled' }}
                  disabled
                />

                <DropzoneInput
                  id='photo'
                  label='Activity Photo'
                  validation={{ required: 'Photo must be filled' }}
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                  maxFiles={3}
                  helperText='You can upload file with .png, .jpg, atau .jpeg extension.'
                />
                <div className='space-y-8'>
                  <DropzoneInput
                    id='photo-empty'
                    label='Activity Photo'
                    validation={{ required: 'Photo must be filled' }}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                    helperText='You can upload file with .png, .jpg, atau .jpeg extension.'
                    readOnly
                  />
                  <DropzoneInput
                    id='photo'
                    label='Activity Photo'
                    validation={{ required: 'Photo must be filled' }}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                    helperText='You can upload file with .png, .jpg, atau .jpeg extension.'
                    readOnly
                  />
                </div>

                <DatePicker
                  id='date'
                  label='Date'
                  validation={{
                    required: 'Date must be filled',
                    valueAsDate: true,
                  }}
                  placeholder='dd/mm/yyyy'
                />

                <DatePicker
                  id='date-readonly'
                  label='Date'
                  validation={{
                    required: 'Date must be filled',
                    valueAsDate: true,
                  }}
                  placeholder='dd/mm/yyyy'
                  readOnly
                />
                <div className='md:col-span-2'>
                  <TextArea
                    id='address'
                    placeholder='Fill your address'
                    label='Address'
                    validation={{ required: 'Address must be filled' }}
                  />
                </div>

                <div className='space-y-2'>
                  <Typography variant='s2'>Select These Fruit</Typography>
                  <Checkbox
                    name='fruits'
                    label='Apple'
                    value='apple'
                    hideError
                  />
                  <Checkbox
                    name='fruits'
                    label='Strawberry'
                    value='strawberry'
                    hideError
                  />
                  <Checkbox
                    name='fruits'
                    label='Orange'
                    value='orange'
                    validation={{ required: 'Fruits must be checked' }}
                  />
                  <Checkbox
                    name='fruits'
                    label='Pandan'
                    value='pandan'
                    hideError
                    readOnly
                  />

                  <Checkbox
                    name='fruits'
                    label='Kemiri'
                    value='kemiri'
                    hideError
                    readOnly
                  />
                </div>

                <div className='space-y-2'>
                  <Typography variant='s2'>Language</Typography>
                  <Radio
                    name='language'
                    label='CSS'
                    value='css'
                    // hideError on every radio except the last one, or use ErrorMessage
                    hideError
                  />
                  <Radio
                    name='language'
                    label='JavaScript'
                    value='javascript'
                    validation={{ required: 'Language must be filled' }}
                  />
                  <Radio
                    name='language'
                    label='Typescript'
                    value='typescript'
                    validation={{ required: 'Language must be filled' }}
                    hideError
                    readOnly
                  />
                  <Radio
                    name='language'
                    label='HTML'
                    value='html'
                    validation={{ required: 'Language must be filled' }}
                    hideError
                    readOnly
                  />
                </div>
              </div>

              <div className='mt-8 flex flex-wrap gap-4'>
                <Button variant='outline'>Not Submit</Button>
                <Button type='submit'>Submit</Button>
              </div>
              <p className='text-sm text-gray-800'>
                Check console after submit
              </p>
            </form>
          </FormProvider>
        </div>
      </section>
    </Layout>
  );
}
