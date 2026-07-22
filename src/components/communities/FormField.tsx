// src/components/createCommunity/FormField.tsx
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label: string;
  required?: boolean;
}

export function FormField({ label, required, ...inputProps }: Props) {
  return (
    <View className="mb-5">
      <Text className="text-text-secondary text-xs font-semibold uppercase mb-2">
        {label} {required && <Text className="text-danger">*</Text>}
      </Text>
      <TextInput
        placeholderTextColor="#7A7A8C"
        className="bg-surface border border-border-light rounded-md px-3.5 py-3 text-text-primary text-sm"
        {...inputProps}
      />
    </View>
  );
}