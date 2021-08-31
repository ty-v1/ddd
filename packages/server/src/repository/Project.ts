import { Prisma } from '@prisma/client';

const projectWithPosts = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    labels: true,
  },
});

export type ProjectWithLabels = Prisma.ProjectGetPayload<typeof projectWithPosts>;
