import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import styles from '../styles/styles'

function ProfileScreen() {
    const insets = useSafeAreaInsets()
    return (
        <View style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}>
          <Text style={styles.sectionTitle}>Profile Screen</Text>
        </View>
    );
}
export default ProfileScreen