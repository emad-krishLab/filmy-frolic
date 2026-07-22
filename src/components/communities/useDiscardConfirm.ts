// src/components/createCommunity/useDiscardConfirm.ts
import { Alert } from 'react-native';

export function useDiscardConfirm() {
  const confirmDiscard = (hasContent: boolean, onDiscard: () => void) => {
    if (!hasContent) {
      onDiscard();
      return;
    }
    Alert.alert(
      'Discard community?',
      'Your changes will be lost.',
      [
        { text: 'Keep editing', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: onDiscard },
      ]
    );
  };

  return { confirmDiscard };
}