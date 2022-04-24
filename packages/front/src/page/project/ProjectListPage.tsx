import React from 'react';
import { PageTemplate } from '@/page/PageTemplate';
import { ProjectBox } from '@/component/organism/project_box/ProjectBox';
import { useListProjectQuery } from '@/hook/query/project/useListProjectQuery';

/**
 * プロジェクト一覧を表示するページ
 */
export const ProjectListPage: React.FC = () => {
  const { data } = useListProjectQuery();
  return (
    <PageTemplate>
      <div>
        <ProjectBox total={data.total} projects={data.records} />
      </div>
    </PageTemplate>
  );
};
