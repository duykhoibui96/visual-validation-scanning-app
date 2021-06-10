import React from 'react';
import { StyleSheet, Button, Image, FlatList, View, Text } from 'react-native';
import SunImage from './assets/sun.png'
import MoonImage from './assets/moon.png'
import NovaImage from './assets/nova.png'

const KOBITON_IMAGE_URL='https://kobiton.gallerycdn.vsassets.io/extensions/kobiton/kobiton/1.0.2/1591325334927/Microsoft.VisualStudio.Services.Icons.Default'
const SUN_IMAGE_URL='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/220px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg'
const MOON_IMAGE_URL='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmo5fX89JUzK-T3vYCWw3SOj-LIttzjvwOug&usqp=CAU'

export default function Structure({randomTitleMarginLeft = 0, randomLogoVisibleState = 0, loading = false, category = '', data = [], onReload = () => {}} = {}) {
  const renderImage = () => {
    switch (randomLogoVisibleState) {
        case 0:
            return (
                <View style={styles.imageWrapper}>
                  <Image style={styles.bigImage} source={SunImage}/>
                  <Image style={styles.bigImage} source={NovaImage}/>
                  <Image style={styles.bigImage} source={MoonImage}/>
                </View>
            )
        case 1:
            return (
                <View style={styles.imageWrapper}>
                  <Image style={styles.bigImage} source={SunImage}/>
                  <Image style={styles.bigImage} source={NovaImage}/>
                </View>
            )
        case 2:
            return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.bigImage} source={NovaImage}/>
                    <Image style={styles.bigImage} source={MoonImage}/>
                </View>
            )
        case 3:
            return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.bigImage} source={SunImage}/>
                    <Image style={styles.bigImage} source={MoonImage}/>
                </View>
            )
        case 4:
            return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.bigImage} source={SunImage}/>
                </View>
            )
        case 5:
            return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.bigImage} source={NovaImage}/>
                </View>
            )
        case 6:
            return (
                <View style={styles.imageWrapper}>
                    <Image style={styles.bigImage} source={MoonImage}/>
                </View>
            )
    }

    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Category: {category}</Text>
        <Button disabled={loading} title='Reload' onPress={onReload}/>
      </View>
      <View style={styles.content}>
      {
        loading
        ? <Text style={styles.loadingMessage}>Loading...</Text>
        : <FlatList
            data={data}
            renderItem={({item}) => {
            const {title, urlToImage} = item

            return (
                <View style={styles.row}>
                    <Image style={styles.image} source={{uri: urlToImage}}/>
                    <Text style={styles.rowTitle}>{title}</Text>
                </View>
            )
            }}
            keyExtractor={item => item.id}
        />
      }
      </View>
      <View style={styles.header}>
        <Text style={{...styles.title, marginLeft: randomTitleMarginLeft}}>Logo</Text>
      </View>
      {renderImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1EBEA'
  },
  loadingMessage: {
    textAlign: 'center',
    fontSize: 25
  },
  content: {
    height: 400,
    minHeight: 400
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    margin: 5,
    width: 50,
    height: 50
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  bigImage: {
    margin: 20,
    width: 100,
    height: 100
  },
  rowTitle: {
    padding: 5,
    paddingRight: 50
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'orange'
  },
  loadingButton: {}
});
