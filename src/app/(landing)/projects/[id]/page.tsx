import React from 'react';

type ProjectPageParams = {
  params: Promise<{ id: string }>;
};

const ProjectPage = async ({ params }: ProjectPageParams) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default ProjectPage;
