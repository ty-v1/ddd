import React from 'react';
import { Meta } from '@storybook/react';
import Button from '@/component/field/button/Button';

Button.displayName = 'Label';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template = () => (
  <Button>button</Button>
);

export const Default = Template.bind({});
