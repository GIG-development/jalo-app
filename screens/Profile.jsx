import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from '../styles/styles'
import { AuthContext } from '../authContext'

function ProfileScreen() {
    const insets = useSafeAreaInsets()
    const { signOut } = useContext(AuthContext)
    return (
        <View style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <TouchableOpacity style={styles.buttonSignOut} title="" onPress={()=>signOut()}>
            <Text style={styles.buttonPrimaryText}>Cerrar Sesión</Text>
          </TouchableOpacity>

        </View>
    );
}
export default ProfileScreen