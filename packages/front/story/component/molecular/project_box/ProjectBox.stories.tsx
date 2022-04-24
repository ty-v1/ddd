import React from 'react';
import { Meta } from '@storybook/react';
import { ProjectBox } from '@/component/organism/project_box/ProjectBox';
import { LocalDateTime } from '@js-joda/core';
import { DefaultDateTimeFormatter } from '@/util/constants';
import { Project } from '@/dto/Project';

ProjectBox.displayName = 'ProjectBox';

export default {
  component: ProjectBox,
  title: 'ProjectBox',
} as Meta;

const Template = () => {
  const projects: Array<Project> = [
    {
      id: '1',
      name: 'Sample',
      description: `
# Title
**Test** 
      `,
      updateDateTime: LocalDateTime.parse('2020/01/01 00:00:00', DefaultDateTimeFormatter),
      createDateTime: LocalDateTime.parse('2020/01/01 00:00:00', DefaultDateTimeFormatter),
    },
  ];

  return <ProjectBox total={100} projects={projects} />;
};

export const Default = Template.bind({});
