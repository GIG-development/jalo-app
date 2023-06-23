import { Image, View, useColorScheme } from 'react-native'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as SecureStore from 'expo-secure-store';
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from './screens/Home'
import MapScreen from './screens/Map'
import ActivityScreen from './screens/Activity'
import ProfileScreen from './screens/Profile'
import SignInScreen from './screens/SignIn'
import SignUpScreen from './screens/SignUp'
import styles from './styles/styles'
import { AuthContext } from './authContext'

export default function App() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userData: action.data,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userData: action.data,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userData: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        userData = await SecureStore.getItemAsync('userData');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, data: userData });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // Send user data, get token back (check for errors)
        await SecureStore.setItemAsync('userToken', 'dummy-auth-token')
        await SecureStore.setItemAsync('userData', data.username)
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token', data: data.username });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken')
        await SecureStore.deleteItemAsync('userData')
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // Send user data, get token back (check for errors)
        await SecureStore.setItemAsync('userToken', 'dummy-auth-token')
        await SecureStore.setItemAsync('userData', data.username)
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token', data: data.username });
      },
      userData: async (data) => {return data.username}
    }),
    []
  )

  let colorScheme = useColorScheme();

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      const icons = {
        Inicio: 'home',
        Perfil: 'person-circle-outline',
        Actividad: 'gift-outline',
        Mapa: 'map',
      }
      return (
        <Ionicons
          name={icons[route.name]}
          size={24}
          color={colorScheme === 'dark' ? focused ? 'white' : 'gray' : focused ? 'black': 'gray'}
          style={{margin: 4}}/>
      );
    },
    tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : 'gray',
    tabBarInactiveTintColor: colorScheme === 'dark' ? 'white' : 'gray',
    headerStyle: { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' },
    headerTintColor: colorScheme === 'dark' ? 'white' : 'black',
    headerTitleAlign: 'center',
    headerShadowVisible: true,
    headerLeft: () => (
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerLogo}
          source={require('./assets/icon.png')}
          resizeMode='contain'
        />
      </View>
    ),
  })

  const Tab = createBottomTabNavigator()
  const Stack = createNativeStackNavigator()

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

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {state.userToken == null ?
            <Stack.Navigator
              initialRouteName='IniciarSesion'
              backBehavior='history'
              screenOptions={{...screenOptions, headerBackButtonMenuEnabled: true}}
            >
              <Stack.Screen name="IniciarSesion" component={SignInScreen} options={{title: 'Iniciar Sesión'}}/>
              <Stack.Screen name="CrearCuenta" component={SignUpScreen} options={{title: 'Crear Cuenta'}}/> 
            </Stack.Navigator>
            : 
            <Tab.Navigator 
              initialRouteName='Inicio'
              backBehavior='history'
              screenOptions={screenOptions}
            >
              <Tab.Screen name="Inicio" component={HomeScreen} onLayoutRootView={onLayoutRootView}/>
              <Tab.Screen name="Mapa" component={MapScreen} onLayoutRootView={onLayoutRootView} options={{ tabBarBadge: 3 }}/>
              <Tab.Screen name="Actividad" component={ActivityScreen} onLayoutRootView={onLayoutRootView}/>
              <Tab.Screen name="Perfil" component={ProfileScreen} onLayoutRootView={onLayoutRootView}/>
            </Tab.Navigator>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}