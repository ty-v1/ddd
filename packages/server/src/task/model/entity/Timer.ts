import { TimerHistory } from '@/task/model/entity/TimerHistory';
import { isNil, last } from 'lodash';
import { TimerState } from '@/task/model/entity/TimerState';
import { Duration, LocalDateTime } from '@js-joda/core';

export class Timer {
  constructor(private readonly _histories: TimerHistory[]) {}

  get histories(): readonly TimerHistory[] {
    return this._histories;
  }

  isStarted(): boolean {
    const latestHistory = last(this._histories);

    if (isNil(latestHistory)) {
      return false;
    }

    return latestHistory.status === TimerState.Started;
  }

  isSuspend(): boolean {
    const latestHistory = last(this._histories);

    if (isNil(latestHistory)) {
      return false;
    }

    return latestHistory.status === TimerState.Suspend;
  }

  isStopped(): boolean {
    const latestHistory = last(this._histories);

    if (isNil(latestHistory)) {
      return false;
    }

    return latestHistory.status === TimerState.Stopped;
  }

  /**
   * 経過時間を取得
   */
  getTime(): Duration {
    const { sum, previous } = this._histories.reduce((accumulator, c) => {
      const duration = c.calculateDuration(accumulator.previous);

      return {
        previous: c,
        sum: accumulator.sum.plus(duration),
      };
    }, initial);

    if (!this.isStarted()) {
      return sum;
    }

    return sum.plus(Duration.between(previous.eventTime, LocalDateTime.now()));
  }

  /**
   * 計測開始
   */
  start(): void {
    const latestHistory = last(this._histories);
    if (isNil(latestHistory)) {
      // TODO
      throw new Error();
    }

    this._histories.push(new TimerHistory(this.createNewTimerHistoryId(), LocalDateTime.now(), TimerState.Started));
  }

  /**
   * 一時停止
   */
  suspend(): void {
    if (!this.isStarted()) {
      // TODO
      throw new Error();
    }

    this._histories.push(new TimerHistory(this.createNewTimerHistoryId(), LocalDateTime.now(), TimerState.Suspend));
  }

  /**
   * 再開
   */
  resume(): void {
    if (!this.isSuspend()) {
      // TODO
      throw new Error();
    }

    this._histories.push(new TimerHistory(this.createNewTimerHistoryId(), LocalDateTime.now(), TimerState.Started));
  }

  /**
   * 停止
   */
  stop(): void {
    if (this.isStopped()) {
      // TODO
      throw new Error();
    }

    this._histories.push(new TimerHistory(this.createNewTimerHistoryId(), LocalDateTime.now(), TimerState.Stopped));
  }

  private createNewTimerHistoryId(): number {
    return this._histories.length + 1;
  }
}

/**
 * 時間計測の初期値
 */
const initial: Accumulator = {
  previous: TimerHistory.EMPTY,
  sum: Duration.ZERO,
};

/**
 * 計測時間の計算用
 */
type Accumulator = {
  readonly previous: TimerHistory;
  readonly sum: Duration;
};
