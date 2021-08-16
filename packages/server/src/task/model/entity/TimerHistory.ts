import { Duration, LocalDateTime } from '@js-joda/core';
import { TimerState } from '@/task/model/entity/TimerState';

/**
 * タイマーの履歴を表すdata class
 */
export class TimerHistory {
  constructor(readonly id: number, readonly eventTime: LocalDateTime, readonly status: TimerState) {}

  static EMPTY = new TimerHistory(0, LocalDateTime.MIN, TimerState.Initialized);

  /**
   * 経過時間を計算
   */
  calculateDuration(history: TimerHistory): Duration {
    switch (history.status) {
      case TimerState.Initialized:
        if (this.status !== TimerState.Started) {
          // TODO
          throw new Error();
        }

        return Duration.ZERO;

      case TimerState.Started:
        if (this.status !== TimerState.Suspend && this.status !== TimerState.Stopped) {
          // TODO
          throw new Error();
        }

        return Duration.between(history.eventTime, this.eventTime);

      case TimerState.Suspend:
        if (this.status !== TimerState.Suspend && this.status !== TimerState.Stopped) {
          // TODO
          throw new Error();
        }

        return Duration.ZERO;

      case TimerState.Stopped:
        // TODO
        throw new Error();

      default:
        // TODO
        throw new Error();
    }
  }
}
