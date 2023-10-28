import { Fieldset, NativeSelect, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import spacetime from "spacetime";
import "react-datepicker/dist/react-datepicker.module.css";
import { capitalise } from "../../../utils/capitalise";
import classes from "../GameForm.module.css";

type ReleaseDatePickerProps = {
  value: ReleaseDateInput;
  onChange: any;
  checked?: any;
  error?: any;
  onFocus?: any;
  onBlur?: any;
  currentDate?: ReleaseDateInput;
};

export const ReleaseDatePicker = (props: ReleaseDatePickerProps) => {
  const [releaseDate, setReleaseDate] = useState<ReleaseDateInput>(
    props.currentDate
      ? props.currentDate
      : {
          dateType: "specific",
          dateString: spacetime().format("iso"),
        }
  );
  const [customReleaseDate, setCustomReleaseDate] = useState(
    releaseDate.dateType === "custom" ? releaseDate.dateString : ""
  );

  const handleOnChange = async (
    changeType: "dateType" | "dateString" | "custom",
    value: any
  ) => {
    if (changeType === "dateType") {
      setReleaseDate({
        dateType: value.toLowerCase(),
        dateString:
          value === "Custom" ? customReleaseDate : spacetime().format("iso"),
      });
    } else if (changeType === "dateString") {
      const relDate = spacetime(value);
      setReleaseDate({ ...releaseDate, dateString: relDate.format("iso") });
    } else {
      setCustomReleaseDate(value);
    }
  };

  useEffect(() => {
    props.onChange(releaseDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseDate]);

  useEffect(() => {
    setReleaseDate({
      ...releaseDate,
      dateString: customReleaseDate
        ? customReleaseDate
        : releaseDate.dateString,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customReleaseDate]);

  const getPicker = () => {
    switch (releaseDate.dateType) {
      case "specific":
        return (
          <ReactDatePicker
            selected={new Date(releaseDate.dateString)}
            onChange={(date) => {
              handleOnChange("dateString", date);
            }}
            inline
          />
        );
      case "quarter":
        return (
          <ReactDatePicker
            selected={new Date(releaseDate.dateString)}
            onChange={(date) => handleOnChange("dateString", date)}
            inline
            showQuarterYearPicker
          />
        );
      case "year":
        return (
          <ReactDatePicker
            selected={new Date(releaseDate.dateString)}
            onChange={(date) => handleOnChange("dateString", date)}
            inline
            showYearPicker
          />
        );
      case "custom":
        return (
          <TextInput
            label="Custom release date"
            placeholder="Coming Soon™"
            value={customReleaseDate}
            onChange={(event) =>
              handleOnChange("custom", event.currentTarget.value)
            }
          />
        );
    }
  };

  return (
    <Fieldset legend="Release Date" mt="md" className={classes.gameFormInput}>
      <NativeSelect
        label="Date type"
        data={["Specific", "Quarter", "Year", "Custom"]}
        value={capitalise(releaseDate.dateType)}
        onChange={(event) =>
          handleOnChange("dateType", event.currentTarget.value)
        }
      />
      {getPicker()}
    </Fieldset>
  );
};
