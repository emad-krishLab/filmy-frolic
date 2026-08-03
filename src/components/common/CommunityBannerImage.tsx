// src/components/common/CommunityBannerImage.tsx
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, View } from "react-native";
import { MediaFallback } from "./MediaFallback";

interface Props {
  uri?: string;
  seed: string;
  className?: string;
  style?: object;
  overlay?: boolean; // bottom-to-top dark gradient, for text legibility over a photo
  children?: React.ReactNode;
}

export function CommunityBannerImage({
  uri,
  seed,
  className,
  style,
  overlay = false,
  children,
}: Props) {
  const [failed, setFailed] = useState(false);

  const content = (
    <>
      {overlay && (
        <LinearGradient
          colors={["transparent", "rgba(8,8,16,0.85)"]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      <View style={{ flex: 1 }}>{children}</View>
    </>
  );

  if (!uri || failed) {
    return (
      <MediaFallback seed={seed} className={className} style={style}>
        {content}
      </MediaFallback>
    );
  }

  return (
    <ImageBackground
      source={{ uri }}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    >
      {content}
    </ImageBackground>
  );
}
