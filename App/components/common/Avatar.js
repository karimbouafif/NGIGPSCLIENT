import React from 'react';
import {Image} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Images from '../../../assets/images/Logo.png'
export default function Avatar({size = 32, url = 'https://i.pravatar.cc/300'}) {
  return (
    <RectButton>
      <Image
        source={Images.Logo}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    </RectButton>
  );
}
