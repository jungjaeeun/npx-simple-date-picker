import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import s from './styles.module.css';

type CustomDateProps = {
  type?: 'year' | 'month' | 'date';
  placeholder?: string;
  selectedDate?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
  showCalendarIcon?: boolean;
  borderBoxStyle?: string;
  borderRadius?: number;
  fontColor?: string;
  fontWeight?: number;
  onChange?: (selectedDate: string) => void;
};

export const CustomDate: React.FC<CustomDateProps> = ({
  type = 'date',
  placeholder = '',
  min = '',
  max = '',
  selectedDate = '',
  className = '',
  disabled = false,
  showCalendarIcon = true,
  borderBoxStyle = '',
  borderRadius = '',
  fontColor = '',
  fontWeight = 400,
  onChange,
}) => {
  const [selectDate, setSelectDate] = useState(selectedDate);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDate(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleCustomDateClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className={`${s['custom-date-picker']} ${className}`}>
      <div
        className={`${s['custom-date']} ${!showCalendarIcon ? s['justify-content-center'] : ''}`}
        onClick={handleCustomDateClick}
        style={{
          fontWeight,
          color: fontColor,
          border: borderBoxStyle,
          borderRadius,
        }}
      >
        {selectDate ? selectDate : placeholder}
        {showCalendarIcon && <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>}
        <input
          ref={inputRef}
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
    </div>
  );
};
