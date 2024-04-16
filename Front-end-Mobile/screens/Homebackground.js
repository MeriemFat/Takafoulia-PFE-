import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation depuis react-navigation/native
import { COLORS, icons } from '../constants';

const Homebackground = () => {
  const navigation = useNavigation(); // Utilisez useNavigation pour obtenir la navigation

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <View style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
      }}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{
            height: 45,
            width: 45,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.gray
          }}
        >
          <Image
            source={icons.menu}
            resizeMode='contain'
            style={{
              height: 24,
              width: 24,
              tintColor: COLORS.black
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Homebackground;
