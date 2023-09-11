import { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";

export default function useDatePicker(
  setFormData: (val: any) => void,
  formData: PropsFormDataDatePickerInterface
) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [formatedDate, setFormatedDate] = useState(formatDate(date));

  useEffect(() => {
    setFormData(() => ({ ...formData, deadline: formatedDate }));
  }, [formatedDate, date]);

  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    setFormatedDate(formatDate(selectedDate));
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return { showDatepicker, show, date, onChange, mode };
}
