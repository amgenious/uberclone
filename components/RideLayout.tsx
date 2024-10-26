import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { icons } from '@/constants'
import Map from './Map'
import BottomSheet, {BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'

const RideLayout = ({title,children,snapPoints}:{title:string; children: React.ReactNode,snapPoints?:string[]}) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
  return (
    <GestureHandlerRootView>
      <View className='flex-1 bg-white'>
        <View className='flex flex-col h-screen bg-blue-500'>
            <View className='flex flex-row absolute z-10 top-16 items-center justify-start px-5'>
                <TouchableOpacity onPress={()=> router.back()}>
                    <View className='w-10 h-10 rounded-full bg-white items-center justify-center'>
                    <Image 
                    source={icons.backArrow}
                    resizeMode='contain'
                    className='w-6 h-6'
                    />
                    </View>
                </TouchableOpacity>
                <Text className='text-xl font-JakartaSemiBold ml-5'>{title || "Go Back"}</Text>
            </View>
                <Map />
        </View>
        <BottomSheet 
        ref={bottomSheetRef} 
        snapPoints={snapPoints || ['40%', '85%']}
        index={0}
        >
            <BottomSheetView style={{flex:1, padding:20}}>
                {children}
            </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}

export default RideLayout