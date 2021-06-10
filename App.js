import React from 'react';
import {random} from 'lodash';
import Header from './Header'
import Structure from './Structure'
import CustomWebView from './Webview'
import { StyleSheet, View, Button } from 'react-native';

const NEWS_API_KEY = '3afeda30e25e49d8a76b809442494550'
const FETCH_NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
const CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
]

export default class App extends React.Component {
  _webViewUrl = 'https://global.toyota/en/'
  state = {
    isShowWebView: false,
    loading: false,
    category: this._getRandomCategory(),
    news: [],
    step: 0,
    randomTitleMarginLeft: 0,
    randomLogoVisibleState: 0
  }

  componentDidMount() {
    this._onReload()
  }

  _getRandomCategory() {
    return CATEGORIES[random(0, CATEGORIES.length - 1)]
  }

  _showWebView = () => this.setState({isShowWebView: true})
  _onExitWebView = () => this.setState({isShowWebView: false})
  _onWebViewLoadStart = (e) => {
    this.setState({loading: true})
  }
  _onWebViewLoadEnd = () => this.setState({loading: false})
  _onNavigationStateChange = ({url}) => {
    this._webViewUrl = url
  }

  _onReload = async () => {
    const category = this._getRandomCategory()
    this.setState({ step: this.state.step + 1, loading: true, randomTitleMarginLeft: random(0, 100), randomLogoVisibleState: random(0, 6), category, news: []})
    const response = await fetch(FETCH_NEWS_API_URL + `&category=${category}`)
    const {articles = []} = await response.json()
    const news = articles.splice(0, 10).map(({title, urlToImage}, index) => ({id: index.toString(), title, urlToImage}))
    this.setState({loading: false, news})
  }

  render() {
    const {isShowWebView, step, category, randomTitleMarginLeft, randomLogoVisibleState, loading = false, news} = this.state

    return isShowWebView
      ? <CustomWebView
           loading={loading}
           webViewUrl={this._webViewUrl}
           onLoadStart={this._onWebViewLoadStart}
           onLoadEnd={this._onWebViewLoadEnd}
           onNavigationStateChange={this._onNavigationStateChange}
           onExit={this._onExitWebView}/>
      : (
        <View style={styles.container}>
          <Header step={step}/>
          <Structure
            loading={loading}
            randomTitleMarginLeft={randomTitleMarginLeft}
            randomLogoVisibleState={randomLogoVisibleState}
            category={category} data={news} onReload={this._onReload}
            />
          <Button disabled={loading} title='Switch to web view' onPress={this._showWebView}/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 30
  },
  center: {
    textAlign: 'center'
  }
});
