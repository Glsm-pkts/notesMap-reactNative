import { Image, View } from 'react-native'
import React from 'react'

const CustomMarker = () => {
  return (
    <View>
     <Image
      style={{width: 50, height: 50}}
     source={require("./user.png")}
     />
    </View>
  )
}

export default CustomMarker

