import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

import { BASE_IMAGE_URL } from '@api';
import { CameraIcon, NoAvatarImage, NoImage } from '@assets';
import { ColorsApp, FontSize, Spacing, ThemeColors, useTheme } from '@theme';
import { AppText } from '../AppText';
interface propsImage {
  uri?: string | null;
  style?: StyleProp<ImageStyle> | any;
  containerStyle?: StyleProp<ViewStyle> | any;
  resizeMode?: ResizeMode;
  onUploadImage?: (uri: string) => void;
  error?: string;
}

export const UploadImage = React.memo((props: propsImage) => {
  const { uri, style, resizeMode, onUploadImage, containerStyle, error } = props;
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);


  const uriBase = uri?.startsWith('file:') ? uri : `${BASE_IMAGE_URL}${uri}`;
  const { themeColors } = useTheme();
  const styles = createStyles(themeColors);


  useEffect(() => {
    setLoading(true);
  }, [uriBase]);

  useEffect(() => {

    if (uriBase) {
      fetch(uriBase).then(data => {
        if (data.status !== 200) {
          // setError(true);
          setLoading(false);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [uriBase]);


  const onGetImageWithDevice = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',

    };

    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        if (onUploadImage && response.assets[0].uri) {
          onUploadImage(response.assets[0].uri);
        }
      }
    });
  };

  const renderImage = () => {
    if (!uri) {
      return (
        <View>
          <FastImage
            source={NoAvatarImage}
            style={[styles.image, style]}
            resizeMode={resizeMode}
          />
          <View style={styles.btnIconCamera}>
            <CameraIcon />
          </View>
        </View>

      );
    }
    if (isError) {
      return (
        <View>
          <FastImage
            source={NoImage}
            style={[styles.image, style]}
            resizeMode={resizeMode}
          />
          <View style={styles.btnIconCamera}>
            <CameraIcon />
          </View>
        </View>

      );
    }
    return (
      <>
        <View>
          <FastImage
            source={{ uri: uriBase }}
            style={[styles.image, style]}
            resizeMode={resizeMode}

            onLoadEnd={() => {
              setLoading(false);
            }}

            onError={() => setLoading(false)}
          />
          <View style={styles.btnIconCamera}>
            <CameraIcon />
          </View>
        </View>

        {isLoading && (

          <View style={[styles.imageLoading, style]} />

        )}
      </>
    );
  };



  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onGetImageWithDevice}>
      {renderImage()}

      {error && <AppText style={[styles.error]}>{error}</AppText>}
    </TouchableOpacity>
  );
}
);
const createStyles = (themeColors: ThemeColors) => StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',

  },
  imageLoading: {
    height: '100%',
    width: '100%',
    backgroundColor: ColorsApp.skeleton,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
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
});
