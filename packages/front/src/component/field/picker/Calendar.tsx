import React from 'react';
import { ChronoUnit, DateTimeFormatter, DayOfWeek, LocalDate, TemporalAdjusters } from '@js-joda/core';
import { Locale } from '@js-joda/locale_en-us';

const DateFormat = DateTimeFormatter.ofPattern('MMMM yyyy')
  .withLocale(Locale.US);

type CalendarProps = {
  readonly value?: LocalDate;
  readonly onChange: (date: LocalDate | undefined) => void;
}

type MonthMapItem = {
  readonly isBaseMonth: boolean;
  readonly date: LocalDate;
  readonly isSelected: boolean;
}

type MonthMap = ReadonlyArray<ReadonlyArray<MonthMapItem>>

const createMonthMap: (base: LocalDate, current: LocalDate | undefined) => MonthMap = (base, current) => {
  // 月初めの週の第1日曜日にあたる日を取り出す
  const firstDay = base.with(TemporalAdjusters.firstDayOfMonth())
    .with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
  const lastDay = base.with(TemporalAdjusters.lastDayOfMonth())
    .with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY));

  const numberOfWeek = (firstDay.until(lastDay, ChronoUnit.DAYS) + 1) / 7;
  const monthMap = new Array<Array<MonthMapItem>>();
  for (let i = 0; i < numberOfWeek; i++) {
    const week = new Array<MonthMapItem>();
    for (let j = 0; j < 7; j++) {
      const date = firstDay.plusDays(i * 7 + j);
      week.push({
        date,
        isBaseMonth: date.month() === base.month(),
        isSelected: current !== undefined ? date.isEqual(current) : false,
      });
    }
    monthMap.push(week);
  }

  return monthMap;
};


const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  const [base, setBase] = React.useState<LocalDate>(value ?? LocalDate.now());
  const handleNextMonth = () => setBase(base.plusMonths(1));
  const handlePreviousMonth = () => setBase(base.minusMonths(1));
  const handleClickDate = (date: LocalDate, isSelected: boolean) => {
    if (isSelected) {
      onChange(undefined);
      return;
    }

    onChange(date);
  };


  const monthMap = createMonthMap(base, value);

  return (
    <div>
      <div>
        <div onClick={handlePreviousMonth}>&lt;</div>
        <div>{base.format(DateFormat)}</div>
        <div onClick={handleNextMonth}>&gt;</div>
      </div>

      {/*曜日*/}
      <div role="row">
        <div role="cell">Su</div>
        <div role="cell">Mo</div>
        <div role="cell">Tu</div>
        <div role="cell">We</div>
        <div role="cell">Th</div>
        <div role="cell">Fr</div>
        <div role="cell">Sa</div>
      </div>

      {/*日付*/}
      <div role="grid">
        {
          monthMap.map((week, i) => (
            <div role="week" key={i}>
              {
                week.map(({ date, isBaseMonth, isSelected }) => (
                  <div role="cell"
                       key={date.dayOfMonth()}
                       onClick={() => handleClickDate(date, isSelected)}>
                    {date.dayOfMonth()}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Calendar;
