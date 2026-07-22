// src/components/createCommunity/BannerUpload.tsx
import { ImageUploadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  uri: string | null;
  onChange: (uri: string | null) => void;
}

export function BannerUpload({ uri, onChange }: Props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View className="mb-5">
      <Text className="text-text-secondary text-xs font-semibold uppercase mb-2">
        Banner Image
      </Text>
      <Pressable
        onPress={pickImage}
        className="border border-dashed border-border-light rounded-md h-32 items-center justify-center overflow-hidden bg-surface"
      >
        {uri ? (
          <Image
            source={{ uri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center gap-1.5">
            <HugeiconsIcon icon={ImageUploadIcon} size={22} color="#7A7A8C" />
            <Text className="text-text-muted text-xs">
              Tap to upload banner image
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
