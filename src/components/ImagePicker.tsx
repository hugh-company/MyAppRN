import { AddIcon, CloseIcon } from '@assets';
import { Colors, Shadow, Spacing, WidthScreen } from '@theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppImage } from './AppImage';
import { AppText } from './AppText';

interface ImagePickerProps {
  images: string[];
  onChange: (images: string[]) => void;
  error?: string;
}

export const ImagePicker = ({ images = [], onChange, error }: ImagePickerProps) => {

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.assets) {

        const newImages = result.assets?.map((asset) => asset.uri ?? '');

        if (newImages.length <= 4) {
          onChange(images.concat(newImages));
        }
      }
    } catch (errors) {
      console.log(errors);
    }
  };
  const handleRemoveImage = (uri: string) => {
    onChange(images.filter((image) => image !== uri));
  };

  return (
    <View>

      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={index}>
            <AppImage uri={uri} style={styles.image} />
            <TouchableOpacity style={styles.btnDelete} onPress={() => handleRemoveImage(uri)}>
              <CloseIcon size={16} />
            </TouchableOpacity>
          </View>
        ))}
        {images.length < 3 && <TouchableOpacity onPress={pickImage} style={styles.button}>
          <AddIcon size={24} color={Colors.primary} />
        </TouchableOpacity>}
      </View>
      {error && <AppText style={styles.error}>{error}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    width: Spacing.width80,
    height: Spacing.width80,
    borderRadius: Spacing.width12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    gap: Spacing.width16,
    marginTop: Spacing.width8,

  },
  image: {
    width: (WidthScreen - Spacing.width72) / 3,
    height: Spacing.width80,
    borderRadius: Spacing.width12,
    overflow: 'hidden',
    ...Shadow.normal,
  },
  error: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 4,
  },
  btnDelete: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopRightRadius: Spacing.width12,
    borderBottomLeftRadius: Spacing.width12,
    padding: Spacing.width4,

  },
});
