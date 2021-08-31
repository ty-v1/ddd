export const TaskStatus = {
  ToDo: 0,
  InProgress: 1,
  InReview: 2,
  Done: 3,
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];
