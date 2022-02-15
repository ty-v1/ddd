import React from 'react';
import { Meta } from '@storybook/react';
import Button from '@/component/atom/button/Button';

Button.displayName = 'Button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template = () => (
  <Button>button</Button>
);

export const Default = Template.bind({});
