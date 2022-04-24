import React from 'react';
import { DateTimeFormatter, LocalDate } from '@js-joda/core';
import Calendar from '@/component/molecule/calendar/Calendar';
import Popper from '@/component/atom/popper/Popper';

const DateFormat = DateTimeFormatter.ofPattern('yyyy-MM-dd');

type DatePickerProps = {
  readonly value?: LocalDate;
  readonly onChange: (date: LocalDate | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [showPopper, togglePopper] = React.useState(false);
  const handleClick = () => togglePopper(!showPopper);

  return (
    <div>
      {/*TODO マスキング*/}
      <input readOnly
             onClick={handleClick}
             value={value?.format(DateFormat) ?? ''}/>
      <Popper open={showPopper}>
        <Calendar onChange={onChange} value={value}/>
      </Popper>
    </div>
  );
};


export default DatePicker;
