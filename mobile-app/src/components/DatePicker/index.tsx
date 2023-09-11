import { useEffect, useState } from "react";
import { Button, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native/";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useUserContext } from "../../providers/contexts/userContext";
import formatDate from "../../utils/formatDate";

interface PropsDatePickerInterface {
  isReadOnly: boolean;
  setFormData: (val: any) => void;
  formData: {
    title: string;
    description: string;
    deadline: string;
    priority: boolean;
  };
}

export default function DatePicker({
  isReadOnly,
  setFormData,
  formData,
}: PropsDatePickerInterface) {
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

  return (
    <SafeAreaView>
      <Button
        onPress={isReadOnly ? null : showDatepicker}
        backgroundColor="#4c5ee5"
        sx={{
          ":active": {
            backgroundColor: "#1c2eb5",
          },
        }}
      >
        <Text color="#CBD5E0" fontWeight="bold" size="lg" aria-label="Data">
          {formData.deadline}
        </Text>
      </Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          //@ts-ignore
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={date}
          aria-label="datePiker"
        />
      )}
    </SafeAreaView>
  );
}
