import { AppHeader } from '@components';
import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { usePreviewWebview } from './PreviewWebview.hook';

const PreviewWebview = () => {
  const { link, loading, setLoading, styles } = usePreviewWebview();

  return (
    <View style={styles.container}>
      <AppHeader />
      <WebView
        source={{ uri: link }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
        onMessage={(event) => {
          console.log('onMessage', event.nativeEvent.data);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PreviewWebview;
