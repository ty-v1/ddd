export const TimerState = {
  Initialized: 0,
  Started: 1,
  Suspend: 2,
  Stopped: 3,
} as const;

export type TimerState = typeof TimerState[keyof typeof TimerState];
