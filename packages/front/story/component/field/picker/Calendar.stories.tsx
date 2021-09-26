import React from 'react';
import Calendar from '@/component/field/picker/Calendar';
import DatePicker from '@/component/field/picker/DatePicker';

Calendar.displayName = 'Calendar';

export default {
  component: Calendar,
  title: 'Calendar',
};

type Props = React.ComponentProps<typeof DatePicker>;

const Template = (args: Props) => <Calendar {...args} />;

export const Default = Template.bind({});
