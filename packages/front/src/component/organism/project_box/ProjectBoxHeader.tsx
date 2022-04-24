import React from 'react';
import { FaThList } from 'react-icons/fa';

type ProjectBoxHeaderProps = {
  readonly total: number;
};

export const ProjectBoxHeader: React.FC<ProjectBoxHeaderProps> = ({ total }) => {
  return (
    <div className="Box-header">
      {/*TODO sort button*/}
      <FaThList/> {`${total} projects`}
    </div>
  );
};
