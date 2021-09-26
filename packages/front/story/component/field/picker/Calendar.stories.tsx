import React from 'react';
import Calendar from '@/component/field/picker/Calendar';
import { Meta, Story } from '@storybook/react';

Calendar.displayName = 'Calendar';

export default {
  component: Calendar,
  title: 'Calendar',
} as Meta;

type Props = React.ComponentProps<typeof Calendar>;

const Template: Story<Props> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
