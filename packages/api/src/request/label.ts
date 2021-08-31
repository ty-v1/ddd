export type CreateLabelRequest = {
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly projectId: string;
};

export type UpdateLabelRequest = {
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly projectId: string;
};
