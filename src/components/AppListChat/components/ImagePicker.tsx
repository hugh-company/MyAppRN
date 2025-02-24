import { AppText } from '@components';
import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerComponent = ({ onSelect }: { onSelect: (img: string) => void }) => {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      console.log({ response });


    });
  };

  const takePhoto = async () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      console.log({ response });

    });
  };

  return (
    <View>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 5 }} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={pickImage}>
        <AppText>Chọn ảnh từ thư viện</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;
