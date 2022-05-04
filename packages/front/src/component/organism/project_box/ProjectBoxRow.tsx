import React from 'react';
import { DefaultDateFormatter } from '@/util/constants';
import { Project } from '@/dto/Project';
import { MdAccessTime } from 'react-icons/all';
import { Markdown } from '@/component/organism/markdown/Markdown';
import { TimeStamp } from '@/component/atom/time_stamp/TimeStamp';

type ProjectBoxRowProps = {
  readonly project: Project;
};

export const ProjectBoxRow: React.FC<ProjectBoxRowProps> = ({ project }) => {
  return (
    <div className="Box-body">
      <div className="d-flex p-3">
        <div className="col-4">
          {/*TODO link*/}
          <h3>
            <a className="color-fg-default no-underline" href="">
              <span className="Link--onHover">{project.name}</span>
            </a>
          </h3>
          <MdAccessTime/>
          <TimeStamp>Updated on {project.updateDateTime.format(DefaultDateFormatter)}</TimeStamp>
        </div>

        <div className="col-8">
          <Markdown>{project.description}</Markdown>
          {/*TODO menu*/}
        </div>
      </div>
    </div>
  );
};
