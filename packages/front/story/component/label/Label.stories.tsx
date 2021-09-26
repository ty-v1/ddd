import React from 'react';
import Label from '@/component/label/Label';

Label.displayName = 'Label';

export default {
  component: Label,
  title: 'Label',
};

const Template = () => (
  <div>
    <Label color="#a2eeef" name="blue"/>
    <Label color="#ea5432" name="red"/>
    <Label color="#7bf432" name="green"/>
  </div>
);

export const Default = Template.bind({});
