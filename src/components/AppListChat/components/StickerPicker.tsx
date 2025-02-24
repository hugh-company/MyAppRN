import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

const stickers = [
  { id: '1', uri: 'https://example.com/sticker1.png' },
  { id: '2', uri: 'https://example.com/sticker2.png' },
  // Add more stickers here
];

const StickerPicker = ({ onSelect }: { onSelect: (sticker: string) => void }) => {
  return (
    <View>
      <FlatList
        data={stickers}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item.uri)}>
            <Image source={{ uri: item.uri }} style={{ width: 60, height: 60, margin: 5 }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default StickerPicker;
