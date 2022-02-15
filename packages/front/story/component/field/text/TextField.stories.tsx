import React from 'react';
import { Meta, Story } from '@storybook/react';
import TextField from '@/component/atom/text_field/TextField';

TextField.displayName = 'Text';

export default {
  component: TextField,
  title: 'TextField',
} as Meta;

type Props = React.ComponentProps<typeof TextField>;

const Template: Story<Props> = (args) => (
  <TextField {...args}/>
);

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  value: 'text',
};

export const Number = Template.bind({});
Number.args = {
  type: 'number',
  value: 10,
};
