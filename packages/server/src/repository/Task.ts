import { Prisma } from '@prisma/client';

const taskWithLabelsAndHistories = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    labels: true,
    histories: true,
  },
});

export type TaskWithLabelsAndHistories = Prisma.TaskGetPayload<typeof taskWithLabelsAndHistories>;
