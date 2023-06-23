import { Image, TouchableOpacity, Text, View, useColorScheme } from 'react-native'
import { useEffect, useState } from 'react'
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store';
import Logo from '../assets/icon.png'
import Background from '../assets/main-bg.png'
import styles from '../styles/styles'

function HomeScreen({ navigation }) {
    const insets = useSafeAreaInsets()
    let colorScheme = useColorScheme();
    const [userName, setUserName] = useState('')

    const config = {
        duration: 1000,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    }
    const width = useSharedValue(10);
    const height = useSharedValue(10);
    const style = useAnimatedStyle(() => {
        return {
          width: withTiming(width.value, config),
          height: withTiming(height.value, config)
        }
    })
    useEffect(()=>{
        width.value = 80
        height.value = 90
    },[width, height])

    useEffect(()=>{
        const getUsernameFromStorage = async () => {
            const username = await SecureStore.getItemAsync('userData')
            setUserName(username)
        }
        getUsernameFromStorage()
    },[])

    return (
        <View style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          ...styles.container
        }}>
            <View style={{position: 'absolute', width: '100%', height: '110%', top: 0}}>
                <Image source={Background} style={{ width: '100%', height: '100%'}}/>
            </View>
            <View>
                <Animated.Image source={Logo} style={[style, styles.logo]}/>
                <Text style={styles.mainTitle}>Bienvenido{userName ? `, ${userName}`: ''}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Mapa')}
                        style={styles.buttonPrimary}
                    >
                        <Text style={colorScheme === 'dark' ? styles.buttonPrimaryTextDark : styles.buttonPrimaryText}>Ir al Mapa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Actividad')}
                        style={styles.buttonSecondary}
                    >
                        <Text style={colorScheme === 'dark' ? styles.buttonSecondaryTextDark : styles.buttonSecondaryText}>Ver Actividad</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default HomeScreen