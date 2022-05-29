import React from 'react';
import { Duration } from '@js-joda/core';
import { useStopWatch } from '@/component/stopwatch/useStopWatch';
import { formatDuration } from '@/util/duration';

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
