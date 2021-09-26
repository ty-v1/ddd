import React from 'react';
import { Duration, LocalDateTime } from '@js-joda/core';

type UseStopWatchHook = {
  readonly elapsedTime: Duration;
  readonly toggleStopWatch: () => void;
  readonly isStarted: boolean;
};

export const useStopWatch: (value: Duration | undefined) => UseStopWatchHook = (value) => {
  const [isStarted, setStarted] = React.useState(false);

  // 最後に起動した時間
  const [startTime, setStartTime] = React.useState<LocalDateTime | undefined>(undefined);

  // ラップタイム = | 最初に起動した時間 - 最後に停止した時間 |
  const [lapTime, setLapTime] = React.useState<Duration>(value ?? Duration.ofMillis(0));

  // 経過時間
  const [elapsedTime, setElapsedTime] = React.useState<Duration>(value ?? Duration.ofMillis(0));

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isStarted || startTime === undefined) {
        return;
      }

      const now = LocalDateTime.now();
      const delta = Duration.between(startTime, now);

      setElapsedTime(lapTime.plus(delta));

    }, 100);

    return () => clearInterval(interval);
  });

  // トグル
  const toggleStopWatch = () => {
    if (!isStarted) {
      setStartTime(LocalDateTime.now());
      setStarted(true);
    } else {
      if (startTime === undefined) {
        return;
      }

      // 停止する場合はラップも更新する
      const now = LocalDateTime.now();
      const delta = Duration.between(startTime, now);

      // 停止時は ラップタイム = 経過時間
      const newLapTime = lapTime.plus(delta);
      setLapTime(newLapTime);
      setElapsedTime(newLapTime);
      setStarted(false);
    }
  };

  return {
    elapsedTime, toggleStopWatch, isStarted
  };
};
