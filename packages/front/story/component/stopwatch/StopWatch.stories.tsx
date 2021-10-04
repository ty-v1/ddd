import React from 'react';
import StopWatch from '@/component/stopwatch/StopWatch';
import { Duration } from '@js-joda/core';
import { Meta, Story } from '@storybook/react';

StopWatch.displayName = 'StopWatch';

export default {
  component: StopWatch,
  title: 'StopWatch',
} as Meta;

type Props = React.ComponentProps<typeof StopWatch>;

const Template: Story<Props> = (args) => <StopWatch {...args}/>;

export const Default = Template.bind({});

export const WithValue = Template.bind({});
WithValue.args = {
  value: Duration.ofSeconds(100),
};
