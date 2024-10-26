import { Stack } from 'expo-router';


const Layout =()=> {

  return (
    
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="findride" options={{ headerShown: false }} />
         <Stack.Screen name="confirmride" options={{ headerShown: false }} />
        <Stack.Screen name="bookride" options={{ headerShown: false }} />
      </Stack>
    
  );
}

export default Layout
