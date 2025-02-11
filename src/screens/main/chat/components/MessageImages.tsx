import { AppImage } from '@components';
import { navigate, SCREEN_ROUTE } from '@navigation';
import { Spacing } from '@theme';
import { getLinkImageChat } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export interface MessageImagesProps {
  image: {
    images: string[];
    images_count: number;
  }
  thread_id: string | number;
  id: string;
}

export function MessageImages(props: MessageImagesProps) {
  const { image, thread_id, id } = props;

  const getListLinkImageChat = (threadId: string, messageId: string, count: number) => {
    return Array.from({ length: count }, (_, index) => getLinkImageChat(threadId, messageId, index + 1));
  };

  const imageLinks = image.images_count ? getListLinkImageChat(thread_id, id, image.images_count) : image.images;
  const displayedImages = imageLinks.slice(0, 4);
  const remainingImagesCount = imageLinks.length - 4;
  const onClickImage = () => {
    navigate(SCREEN_ROUTE.IMAGE_MODAL, { images: imageLinks });
  };

  return <>
    <TouchableOpacity onPress={onClickImage} style={styles.container}>
      {displayedImages.map((imageLink, index) => {
        return <View key={index} style={styles.imageContainer}>
          <AppImage
            key={imageLink}
            uri={imageLink}
            isBase={false}
            style={styles.images} />
        </View>;
      })}
      {remainingImagesCount > 0 && (
        <View style={styles.remainingImagesContainer}>
          <AppImage
            uri={displayedImages[3]}
            isBase={false}
            style={styles.images} />
          <View style={styles.overlay}>
            <Text style={styles.remainingImagesText}>+{remainingImagesCount}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  </>;
}
const styles = StyleSheet.create({
  container: {

  },
  imageContainer: {
    margin: Spacing.width4,
  },
  images: {
    width: Spacing.width150,
    height: Spacing.width150,
    borderRadius: Spacing.width8,
  },
  remainingImagesContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingImagesText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
