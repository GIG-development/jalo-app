import { TouchableOpacity, Text, View } from 'react-native'
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Logo from '../assets/icon.png'
import styles from '../styles/styles'
import { useEffect } from 'react';

function HomeScreen({ navigation }) {
    const insets = useSafeAreaInsets()

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

    return (
        <View style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          ...styles.container
        }}>
            <Animated.Image source={Logo} style={[style, styles.logo]}/>
            <Text style={styles.mainTitle}>Bienvenido</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Map')}
                    style={styles.buttonPrimary}
                >
                    <Text style={styles.buttonText}>Ir al Mapa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.buttonSecondary}
                >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen