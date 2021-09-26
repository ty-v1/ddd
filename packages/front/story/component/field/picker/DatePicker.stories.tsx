import React from 'react';
import DatePicker from '@/component/field/picker/DatePicker';
import { LocalDate } from '@js-joda/core';

DatePicker.displayName = 'DatePicker';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

type Props = React.ComponentProps<typeof DatePicker>;

const Template = (args: Props) => {
  const [value, setValue] = React.useState(args.value);
  return <DatePicker {...args} value={value} onChange={(e) => setValue(e)}/>;
};

export const Default = Template.bind({});

export const WithValue = Template.bind({
  value: LocalDate.of(2019, 1, 1),
});
