import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        gap: 20
    },
    headerLogo: {
      width: 20,
      height: 24,
      marginLeft: 10
    },
    logo: {
      width: 10,
      height: 10
    },
    logoSmall: {
        width: 40,
        height: 45,
        marginBottom: 20
    },
    mainTitle: {
      fontFamily: 'DMSansBold',
      fontSize: 28,
      paddingTop: 40
    },
    sectionTitle: {
      fontFamily: 'DMSansBold',
      fontSize: 24
    },
    text: {
      fontFamily: 'DMSans',
      fontSize: 18
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    buttonPrimary: {
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 2,
      marginTop: 20,
      borderRadius: 4
    },
    buttonSecondary: {
      borderColor: 'white',
      borderWidth: 2,
      marginTop: 20,
      borderRadius: 4
    },
    buttonPrimaryText: {
      color: 'black',
      fontSize: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      textAlign: 'center'
    },
    buttonPrimaryTextDark: {
      color: 'white',
      fontSize: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      textAlign: 'center'
    },
    buttonSecondaryText: {
      color: 'white',
      fontSize: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      textAlign: 'center'
    },
    buttonSecondaryTextDark: {
      color: 'black',
      fontSize: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      textAlign: 'center'
    },
    callOut: {
        width: 200,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    map: {
      width: '100%',
      height: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'transparent'
      },
    modalView: {
        width: '90%',
        height: '90%',
        flex: 1,
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputContainer: {
        display: 'flex',
        width: '80%',
        marginVertical: 40
    },
    textInput: {
        width: '100%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 20,
        padding: 4,
        paddingHorizontal: 10
    },
    buttonSignInUp: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4
    },
    buttonSignOut: {
        backgroundColor: 'tomato',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        marginTop: 40
    }
  })