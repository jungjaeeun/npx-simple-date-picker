import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import s from './styles.module.css';
import React from 'react';

type CustomDateProps = {
  type?: 'year' | 'month' | 'date';
  placeholder?: string;
  defaultSelectDate?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
  showCalendarIcon?: boolean;
  onChange?: (selectedDate: string) => void;
};

export const CustomDate: React.FC<CustomDateProps> = ({
  type = 'date',
  placeholder = '',
  min = '',
  max = '',
  defaultSelectDate = '',
  className = '',
  disabled = false,
  showCalendarIcon = true,
  onChange,
}) => {
  const [selectDate, setSelectDate] = useState(defaultSelectDate);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onChange) {
      onChange(selectDate);
    }
  }, [selectDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDate(e.target.value);
  };

  const handleCustomDateClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className={`${s['custom-date-picker']} ${className}`}>
      <div className={s['custom-date']} onClick={handleCustomDateClick}>
        {selectDate ? selectDate : placeholder}
        {showCalendarIcon && <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>}
      </div>
      <input
        ref={inputRef}
        hidden
        type={type}
        disabled={disabled}
        value={selectDate}
        onChange={handleDateChange}
        min={min}
        max={max}
        className={s['custom-date-input']}
        required
      />
    </div>
  );
};
