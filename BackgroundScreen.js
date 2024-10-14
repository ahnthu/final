import { View, StyleSheet, ImageBackground, Text } from "react-native";

const image = require('./assets/z5919731883153_4aa0a3fc519faf6887f705e22106b229.jpg')
const BackgroundScreen =() =>{
    return(
      <View style={styles.container1}>
        <ImageBackground source={image} style={styles.imageStyle} blurRadius={5}>
          <Text></Text>
       </ImageBackground>
      </View>
    );
  };

  const styles = StyleSheet.create({
      container1:{
        flex:1,
        
      },
      imageStyle: {
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        opacity: 1,
      }

  })
export default BackgroundScreen;