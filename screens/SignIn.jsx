import { useState, useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity, Image, Text, TextInput, View, useColorScheme } from 'react-native'
import styles from '../styles/styles'
import Logo from '../assets/icon.png'
import { AuthContext } from '../authContext'

function SignInScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);
    let colorScheme = useColorScheme();

    const insets = useSafeAreaInsets()
    return (
        <View style={{
            ...styles.container,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right
        }}>
            <Image source={Logo} style={styles.logoSmall}/>
            <Text style={styles.sectionTitle}>Iniciar Sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.buttonSignInUp} onPress={() => signIn({ username, password })}>
                    <Text style={colorScheme === 'dark' ? styles.buttonSecondaryTextDark : styles.buttonSecondaryText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CrearCuenta')}
                    style={styles.buttonSecondary}
                >
                    <Text style={colorScheme === 'dark' ? styles.buttonSecondaryTextDark : styles.buttonSecondaryText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default SignInScreen