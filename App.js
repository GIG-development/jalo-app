import { Image, Text, View } from 'react-native'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from './screens/Home'
import MapScreen from './screens/Map'
import ActivityScreen from './screens/Activity'
import ProfileScreen from './screens/Profile'
import styles from './styles/styles'

export default function App() {

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      const icons = {
        Home: 'home',
        Profile: 'person-circle-outline',
        Activity: 'gift-outline',
        Map: 'map',
      }
      return (
        <Ionicons name={icons[route.name]} size={24} color={focused ? 'tomato' : "white"} style={{margin: 4}}/>
      );
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerStyle: { backgroundColor: 'black' },
    headerTitleAlign: 'center',
    headerLeft: (props) => (
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerLogo}
          source={require('./assets/icon.png')}
          resizeMode='contain'
        />
      </View>
    ),
  })

  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    'DMSans': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSansMd': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSansBold': require('./assets/fonts/DMSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName='Home'
          backBehavior='history'
          screenOptions={screenOptions}
        >
          <Tab.Screen name="Home" component={HomeScreen} onLayoutRootView={onLayoutRootView}/>
          <Tab.Screen name="Map" component={MapScreen} onLayoutRootView={onLayoutRootView} options={{ tabBarBadge: 3 }}/>
          <Tab.Screen name="Activity" component={ActivityScreen} onLayoutRootView={onLayoutRootView}/>
          <Tab.Screen name="Profile" component={ProfileScreen} onLayoutRootView={onLayoutRootView}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}