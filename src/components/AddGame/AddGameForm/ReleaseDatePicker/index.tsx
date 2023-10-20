import { Fieldset, NativeSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import spacetime from 'spacetime';
import 'react-datepicker/dist/react-datepicker.module.css';

type ReleaseDatePickerProps = {
  value: ReleaseDateInput;
  onChange: any;
  checked?: any;
  error?: any;
  onFocus?: any;
  onBlur?: any;
};

export const ReleaseDatePicker = (props: ReleaseDatePickerProps) => {
  const [releaseDate, setReleaseDate] = useState<ReleaseDateInput>({
    dateType: 'specific',
    dateString: spacetime().format('iso'),
  });

  const handleOnChange = async (changeType: 'dateType' | 'dateString', value: any) => {
    if (changeType === 'dateType') {
      setReleaseDate({ ...releaseDate, dateType: value.currentTarget.value });
    } else {
      const relDate = spacetime(value);
      setReleaseDate({ ...releaseDate, dateString: relDate.format('iso') });
    }
  };

  useEffect(() => {
    props.onChange(releaseDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseDate]);

  console.log(releaseDate);

  return (
    <Fieldset legend="Release Date" mt="md">
      <NativeSelect
        label="Date type"
        data={['Specific', 'Quarter', 'Year', 'Custom']}
        value={releaseDate.dateType}
        onChange={(event) => handleOnChange('dateType', event)}
      />
      <ReactDatePicker
        dateFormat="dd/MM/yyyy"
        selected={new Date(releaseDate.dateString)}
        onChange={(date) => {
          handleOnChange('dateString', date);
        }}
        inline
      />
    </Fieldset>
  );
};
