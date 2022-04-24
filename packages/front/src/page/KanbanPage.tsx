import React, { Suspense } from 'react';
import { PageTemplate } from '@/page/PageTemplate';
import { ProjectColumns } from '@/component/organism/project/ProjectColumns';

export const KanbanPage: React.FC = () => {

  return (
    <PageTemplate>
      <Suspense fallback={'loading'}>
        <ProjectColumns/>
      </Suspense>
    </PageTemplate>
  );
};
