import React from 'react';
import { Duration } from '@js-joda/core';
import { useStopWatch } from '@/component/stopwatch/useStopWatch';

const formatDuration: (duration: Duration) => string = (duration) => {
  const secondTime = Math.floor(duration.toMillis() / 1000);

  const hour = Math.floor(secondTime / 3600)
    .toString(10);
  let r = secondTime % 3600;

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
  const { toggleStopWatch, elapsedTime, isStarted } = useStopWatch(value);

  return (
    <div>
      <button onClick={toggleStopWatch}>
        {isStarted ? 'stop' : 'start'}
      </button>
      <span>{formatDuration(elapsedTime)}</span>
    </div>
  );
};

export default StopWatch;
