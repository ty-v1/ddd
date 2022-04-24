import React, { Suspense } from 'react';
import { PageTemplate } from '@/page/PageTemplate';
import { Kanban } from '@/component/kanban/Kanban';

export const KanbanPage: React.FC = () => {

  return (
    <PageTemplate>
      <Suspense fallback={'loading'}>
        <Kanban/>
      </Suspense>
    </PageTemplate>
  );
};
