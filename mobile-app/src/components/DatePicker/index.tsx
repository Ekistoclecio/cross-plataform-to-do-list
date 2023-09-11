import { Button, Text } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native/";
import DateTimePicker from "@react-native-community/datetimepicker";
import useDatePicker from "../../hooks/useDatePicker";

export default function DatePicker({
  isReadOnly,
  setFormData,
  formData,
}: PropsDatePickerInterface) {
  const { showDatepicker, show, date, onChange, mode } = useDatePicker(
    setFormData,
    formData
  );
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
