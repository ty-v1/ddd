import React from 'react';
import { Meta } from '@storybook/react';
import TextArea from '@/component/atom/textarea/TextArea';

TextArea.displayName = 'Text';

export default {
  component: TextArea,
  title: 'TextArea',
} as Meta;

const Template = () => (
  <TextArea/>
);

export const Default = Template.bind({});
