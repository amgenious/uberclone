import * as Location from 'expo-location'
import GoogleTextInput from '@/components/GoogleTextInput'
import Map from '@/components/Map'
import RideCard from '@/components/RideCard'
import { icons, images } from '@/constants'
import { useLocationStore } from '@/store'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Text, View,Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFetch } from '@/lib/fetch'



export default function Home() {
  const {setUserLocation, setDestinationLocation} = useLocationStore()
  const { user } = useUser()
  const {data:recentRides,loading}= useFetch(`/(api)/ride/${user?.id}`)
  const [hasPermissions, setHasPermissions] =useState(false)
  const handleSignout = ()=>{}
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/findride");
  }

  useEffect(()=>{
    const requestLocation = async()=>{
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status != 'granted'){
        setHasPermissions(false)
        return
      }
      let location = await Location.getCurrentPositionAsync()
      const address = await Location.reverseGeocodeAsync({
        latitude:location.coords?.latitude!,
        longitude:location.coords?.longitude!,
      })
      setUserLocation({
        // latitude:location.coords?.latitude!,
        // longitude:location.coords?.longitude!,
        latitude: 37.78825,
        longitude: -122.4324,
        address:`${address[0].name} ${address[0].region}`
      })
    }
    requestLocation()
  },[])
  return (
    <SafeAreaView className='bg-general-500'>
      <FlatList 
      data={recentRides?.slice(0,5)}
      renderItem={({item}) => <RideCard ride={item}/>}
      className='px-5'
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingBottom:100
      }}
      ListEmptyComponent={()=>(
        <View className='flex flex-col items-center justify-center'>
            {
              !loading ? (
                <>
                <Image 
                source={images.noResult}
                className='w-40 h-40'
                alt='no results'
                resizeMode='contain'
                />
                <Text className='text-sm'>No recent Rides</Text>
                </>
              ):<>
              <ActivityIndicator 
              size="small" color="#000"/>
              </>
            }
        </View>
      )}
      ListHeaderComponent={()=>(
        <>
        <View className='flex flex-row items-center justify-between my-5'>
          <Text className='text-2xl font-JakartaExtraBold'>Welcome, {user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]}{" "} 👋</Text>
          <TouchableOpacity onPress={handleSignout}
          className='w-10 justify-center items-center h-10 rounded-full bg-white'
          >
            <Image 
            source={icons.out}
            className='w-4 h-4'
            />
          </TouchableOpacity>
        </View>
        <GoogleTextInput 
        icon={icons.search}
        containerStyle="bg-white shadow-md shadow-neutral-300"
        handlePress={handleDestinationPress}
        />
        <>
        <Text className='text-xl font-JakartaBold mt-5 mb-3'>Your Current Location</Text>
        <View className='flex flex-row items-center bg-transparent h-[300px]'>
          <Map />
        </View>
        </>
        <Text className='text-xl font-JakartaBold mt-5 mb-3'>Recent Rides</Text>
        </>
      )}
      />
    </SafeAreaView>
  )
}