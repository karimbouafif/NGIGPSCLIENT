import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../../config/theme';


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function IconButton({name, size = 48, onPress, color}) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          padding: theme.spacing.xs,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
      onPress={onPress}>

    </TouchableOpacity>
  );
}
