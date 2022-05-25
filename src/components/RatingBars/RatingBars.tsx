import React from 'react';
import { ProgressBarProps } from '../../Types/ProgressBar';
import { clsx } from '../../utilis/clsx';
import Progress from '../Progress/Progress';
import './ratingBars.modules.css';

// eslint-disable-next-line space-before-function-paren
function RatingBars(props: ProgressBarProps) {
  const {
    data = [],
    progressBarClassname = '',
    progressBarText = 'star',
    onProgressClick = () => null,
    progressFilledColor,
    progressUnfilledColor,
    progressbarPercent = true
  } = props;

  interface InitialGroupedObj {
    [key: number]: number;
  }

  const initialGroupedObj: InitialGroupedObj = {};

  const groupedData = data.reduce((acc, obj) => {
    if (acc[obj.rating]) {
      return { ...acc, [obj.rating]: acc[obj.rating] + obj.count };
    } else {
      return { ...acc, [obj.rating]: obj.count };
    }
  }, initialGroupedObj);

  const combinedData = Object.entries(groupedData).map(([key, value]) => ({
    count: value,
    rating: Number(key)
  }));

  const total = combinedData.reduce(function (acc, obj) {
    return acc + obj.count;
  }, 0);

  console.log({ combinedData }, total);
  return (
    <div className="container">
      {combinedData.map((item, index) => {
        const { count, rating } = item;
        const percent = (count * 100) / total || 0;

        return (
          <div
            key={index + count}
            className={clsx('inner-container', progressBarClassname)}
            onClick={() => onProgressClick(item)}>
            {progressBarText && typeof progressBarText !== 'string' ? (
              progressBarText
            ) : (
              <span className="subtext">
                {rating} {progressBarText}
              </span>
            )}

            <Progress
              rating={rating}
              value={count}
              total={total}
              percentage={percent}
              progressFilledColor={progressFilledColor}
              progressUnfilledColor={progressUnfilledColor}
            />
            {progressbarPercent && <span className="percent-text">{Math.ceil(percent)} %</span>}
          </div>
        );
      })}
    </div>
  );
}

export default RatingBars;