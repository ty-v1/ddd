import React from 'react';
import { Duration } from '@js-joda/core';
import { useStopWatch } from '@/component/stopwatch/useStopWatch';

const formatDuration: (duration: Duration) => string = (duration) => {
  const elapsedSecond = duration.seconds();
  const hour = Math.floor(duration.seconds() / 3600)
    .toString(10);
  let r = elapsedSecond % 3600;

  const minute = Math.floor(r / 60)
    .toString(10)
    .padStart(2, '0');
  r = r % 60;

  const second = r.toString(10)
    .padStart(2, '0');

  return `${hour}:${minute}:${second}`;
};

type StopWatchProps = {
  readonly value: Duration | undefined;
}

const StopWatch: React.FC<StopWatchProps> = ({ value }) => {
  const { toggleStopWatch, elapsedTime, isStarted } = useStopWatch({ value });
  const seconds = elapsedTime.seconds();
  // 毎回描画するのは大変なのでメモ化
  const formattedElapsedTime = React.useMemo(() => formatDuration(elapsedTime), [seconds]);

  return (
    <div>
      <button onClick={toggleStopWatch}>
        {isStarted ? 'stop' : 'start'}
      </button>
      <span>{formattedElapsedTime}</span>
    </div>
  );
};

export default StopWatch;
