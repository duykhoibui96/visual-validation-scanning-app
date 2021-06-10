import React from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Webview({loading = false, webViewUrl, onLoadStart = () => {}, onLoadEnd = () => {}, onNavigationStateChange = () => {}, onExit = () => {}}) {
  return (
    <View style={styles.container}>
      <Button
        disabled={loading}
        title={
          loading
          ? 'Page is loading...'
          : 'Switch back to news'
        }
        onPress={onExit}
      />
      <WebView
        style={styles.webview}
        source={{uri: webViewUrl}}
        onNavigationStateChange={onNavigationStateChange}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  webview: {
    flex: 1,
    backgroundColor: 'yellow',
    width: deviceWidth,
    height: deviceHeight
  }
});
