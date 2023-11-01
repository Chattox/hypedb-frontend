import { Button, Select } from "@mantine/core";
import { useState } from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { getYears } from "../../../../utils/getYears";

export const SpecificDateHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const years = getYears();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </Button>

      <Select value={months[startDate.getMonth()]} onChange={(e) => console.log(e)} />
    </>
  );
};
