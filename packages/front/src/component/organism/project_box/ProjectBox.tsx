import React from 'react';
import { ProjectBoxRow } from '@/component/organism/project_box/ProjectBoxRow';
import { ProjectBoxHeader } from '@/component/organism/project_box/ProjectBoxHeader';
import { Project } from '@/dto/Project';

type ProjectBoxProps = {
  readonly total: number;
  readonly projects: ReadonlyArray<Project>;
};

export const ProjectBox: React.FC<ProjectBoxProps> = ({ projects, total }) => {
  return (
    <div className="Box">
      <ProjectBoxHeader total={total}/>
      {projects.map((e) => (
        <ProjectBoxRow key={e.id} project={e}/>
      ))}
    </div>
  );
};
