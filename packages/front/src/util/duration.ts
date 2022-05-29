import { Duration } from '@js-joda/core';

/**
 * HH:mm:ss 形式でDurationを出力する
 */
export const formatDuration: (duration: Duration) => string = (duration) => {
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
