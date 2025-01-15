import React, { useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

import { CameraIcon, CloseIcon } from '@assets';
import { FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import FastImage from 'react-native-fast-image';
import { AppText } from '../AppText';
import { AppImage } from './AppImage';
interface propsImage {
  list: string[];
  label?: string;
  style?: StyleProp<ImageStyle> | any;
  containerStyle?: StyleProp<ViewStyle> | any;
  onUploadImage?: (list: string[]) => void;
  error?: string;
  maxImage?: number;
}

export const UploadListImage = React.memo((props: propsImage) => {
  const { list, style, onUploadImage, label, containerStyle, error, maxImage = 6 } = props;
  const [isError, setError] = useState(false);

  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);

  const onGetImageWithDevice = () => {
    const maxImageAdd = maxImage - list.length;
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: maxImageAdd,
    };

    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');

      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        setError(true);

      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets;

        const listImage: any = source.map((item) => item.uri);
        const newList = [...list, ...listImage];

        if (onUploadImage && listImage.length > 0) {
          onUploadImage(newList);
        }

      }
    });
  };

  const onDeleteImage = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    if (onUploadImage) {
      onUploadImage(newList);
    }

  };
  const addImage = () => {
    return (
      <TouchableOpacity style={styles.btnAddImage} onPress={onGetImageWithDevice}>
        <CameraIcon />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container, containerStyle]}  >
      <View style={styles.list}>
        {list.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.btnAddImage}>
              {item.startsWith('file:') ?
                <FastImage
                  source={{ uri: item }}
                  style={[styles.image, style]}

                /> : <AppImage uri={item} style={styles.image} />}
              <TouchableOpacity onPress={() => onDeleteImage(index)} style={styles.btnDelete}>
                <CloseIcon size={Spacing.width16} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
        {list?.length < maxImage && addImage()}
      </View>
      {isError && <AppText style={styles.error}>Error uploading image</AppText>}
      {error && <AppText style={[styles.error]}>{error}</AppText>}
    </View>
  );
});
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  image: {
    width: Spacing.width100,
    height: Spacing.width100,
    borderRadius: Spacing.width8,
  },
  container: {

  },

  list: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    gap: Spacing.width16,
  },
  btnIconCamera: {
    position: 'absolute',
    right: -Spacing.width8,
    bottom: -Spacing.width8,
    backgroundColor: themeColors.buttonHover,
    width: Spacing.width34,
    height: Spacing.width34,
    borderRadius: Spacing.width17,
    borderWidth: 2,
    borderColor: themeColors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: themeColors.error,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height8,
  },
  loading: {
    color: themeColors.primary,
    fontSize: FontSize.FontSize12,
    marginTop: Spacing.height8,
  },
  btnAddImage: {
    width: Spacing.width100,
    height: Spacing.width100,

    borderRadius: Spacing.width8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: themeColors.border,
    borderWidth: 1,


  },
  btnDelete: {
    position: 'absolute',
    right: -Spacing.width8,
    top: -Spacing.width8,
    backgroundColor: themeColors.whiteColor,
    width: Spacing.width24,
    height: Spacing.width24,
    borderRadius: Spacing.width12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
