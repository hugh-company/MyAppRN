import { NoSearchImage } from '@assets';
import { AppImage, AppText } from '@components';
import { FontWithFamily, Spacing } from '@theme';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export interface EmptyUserProps { }

export function EmptyUser(props: EmptyUserProps) {
  const { } = props;
  return (
    <View style={styles.viewEmpty}>
      <AppImage defaultSource={NoSearchImage} style={styles.imageNotFound} />
      <AppText style={styles.txtNotFound}>{t('notFound')}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  viewEmpty: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtNotFound: {
    ...FontWithFamily.FontWithFamily_500,
    marginTop: Spacing.width16,
    width: '80%',
    textAlign: 'center',
  },
  imageNotFound: {
    width: Spacing.width200,
    height: Spacing.width100,
  },
});
