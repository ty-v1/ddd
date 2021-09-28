import React, { useReducer } from 'react';
import { Duration, LocalDateTime } from '@js-joda/core';
import { usePrevious } from '@/util/hook/usePrevious';

/**
 * 停止したときに発生するイベント
 */
type StopWatchStopEvent = {
  readonly startAt: LocalDateTime;
  readonly endAt: LocalDateTime;
};

type StopWatch = {
  readonly lastEventOccurred: undefined;
  readonly state: 'Initial';
  readonly sumOfLapTime: Duration;
} | {
  readonly lastEventOccurred: LocalDateTime;
  readonly state: 'Started' | 'Suspended';
  readonly sumOfLapTime: Duration;
}

type Action = 'Start' | 'Suspend';

const reducer: React.Reducer<StopWatch, Action> = (stopWatch, action) => {
  switch (action) {
    case 'Start':
      return onStart(stopWatch);
    case 'Suspend':
      return onSuspend(stopWatch);
  }
};

/**
 * 開始イベントを処理する
 */
const onStart: (stopWatch: StopWatch) => StopWatch = (stopWatch) => {
  switch (stopWatch.state) {
    case 'Initial':
    case 'Suspended':
      return {
        ...stopWatch,
        state: 'Started',
        lastEventOccurred: LocalDateTime.now(),
      };
    default:
      return stopWatch;
  }
};

/**
 * 一時停止イベントを処理する
 */
const onSuspend: (stopWatch: StopWatch) => StopWatch = (stopWatch) => {
  if (stopWatch.state !== 'Started') {
    return stopWatch;
  }

  const now = LocalDateTime.now();
  const delta = Duration.between(stopWatch.lastEventOccurred, now);
  const sum = stopWatch.sumOfLapTime.plus(delta);

  return {
    ...stopWatch,
    state: 'Suspended',
    lastEventOccurred: now,
    sumOfLapTime: sum,
  };
};

type UseStopWatchHookArgs = {
  readonly value?: Duration;
  readonly eventHandler?: (event: StopWatchStopEvent) => void;
}

type UseStopWatchHook = (args: UseStopWatchHookArgs) => {
  readonly elapsedTime: Duration;
  readonly toggleStopWatch: () => void;
  readonly isStarted: boolean;
};

export const useStopWatch: UseStopWatchHook = ({ value, eventHandler }) => {
  // 経過時間
  const [elapsedTime, setElapsedTime] = React.useState<Duration>(value ?? Duration.ofMillis(0));
  const [stopWatch, dispatch] = useReducer(reducer, {
      lastEventOccurred: undefined,
      state: 'Initial',
      sumOfLapTime: value ?? Duration.ZERO,
    }
  );
  const secondLastEventOccurred = usePrevious(stopWatch.lastEventOccurred);

  // 経過時間を表示する
  React.useEffect(() => {
    const interval = setInterval(() => {
      switch (stopWatch.state) {
        case 'Suspended':
          setElapsedTime(stopWatch.sumOfLapTime);
          break;
        case 'Started': {
          const now = LocalDateTime.now();
          const delta = Duration.between(stopWatch.lastEventOccurred, now);
          setElapsedTime(stopWatch.sumOfLapTime.plus(delta));
          break;
        }
        default:
          break;
      }
    }, 50);

    return () => clearInterval(interval);
  });

  React.useEffect(() => {
    if (eventHandler === undefined) {
      return;
    }

    if (stopWatch.state !== 'Suspended') {
      return;
    }

    if (secondLastEventOccurred === undefined) {
      return;
    }

    eventHandler({
      startAt: secondLastEventOccurred,
      endAt: stopWatch.lastEventOccurred
    });
  }, [stopWatch, eventHandler]);

  // トグル
  const toggleStopWatch = () => {
    if (stopWatch.state === 'Started') {
      dispatch('Suspend');
    } else {
      dispatch('Start');
    }
  };

  return {
    elapsedTime,
    toggleStopWatch,
    isStarted: stopWatch.state === 'Started',
  };
};
