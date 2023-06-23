import { useState, useEffect } from 'react';
import { ActivityIndicator, Modal, Pressable, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import styles from '../styles/styles'
import * as Location from 'expo-location'
import mapConfig from './mapConfig.json'

function MapScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [visibleActivity, setVisibleActivity] = useState(false);

    const onCalloutTap = (e) => {
        setModalVisible(true)
        setVisibleActivity(JSON.stringify(e.nativeEvent))
        return
    }

    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    const coords = errorMsg ? errorMsg : JSON.parse(JSON.stringify(location))

    if(!coords?.coords?.latitude){
        return <View style={{
            ...styles.container,
          }}>
            <ActivityIndicator size="large" color="tomato" />
        </View>
    }

    if(errorMsg){
        return <View style={{
            ...styles.container,
          }}>
            <Text>{errorMsg}</Text>
        </View>
    }
    
    return (
        <View style={{
          ...styles.container,
        }}>
          <MapView
            customMapStyle={mapConfig}
            showsUserLocation={true}
            userLocationPriority='high'
            followsUserLocation={true}
            userLocationCalloutEnabled={true}
            userLocationAnnotationTitle='Yo'
            showsMyLocationButton={true}
            zoomControlEnabled={true}
            toolbarEnabled={true}
            loadingEnabled={true}
            loadingIndicatorColor='tomato'
            region={{
                latitude: coords?.coords?.latitude,
                longitude: coords?.coords?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            <Marker
                key={1}
                coordinate={{
                    latitude: 19.432608,
                    longitude: -99.133209,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                title={'Sushiito'}
                description={'Acercáte a esta sucursal para participar'}
                image={require('../assets/pins/gift.png')}
                onCalloutPress={onCalloutTap}
            >
                <Callout tooltip={true} style={{width: 200, backgroundColor: 'white', paddingVertical: 10}}>
                    <View style={styles.callOut}>
                        <Text style={styles.sectionTitle}>Regalo</Text>
                        <Text style={{fontSize: 14, textAlign: 'center'}}>Acercáte a esta sucursal para participar</Text>
                        <Pressable style={{padding: 2, ...styles.buttonPrimary}} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonPrimaryText}>Ver mas</Text>
                        </Pressable>
                    </View>
                </Callout>
            </Marker>
            <Marker
                key={2}
                coordinate={{
                    latitude: 19.410504, 
                    longitude: -99.169935,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                title={'Regalo'}
                description={'Acercáte a esta sucursal para participar'}
                image={require('../assets/pins/gift.png')}
                onCalloutPress={onCalloutTap}
            >
                <Callout tooltip={true} style={{width: 200, backgroundColor: 'white', paddingVertical: 10}}>
                    <View style={styles.callOut}>
                        <Text style={styles.sectionTitle}>Regalo</Text>
                        <Text style={{fontSize: 14, textAlign: 'center'}}>Acercáte a esta sucursal para participar</Text>
                        <Pressable style={{padding: 2, ...styles.buttonPrimary}} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonPrimaryText}>Ver mas</Text>
                        </Pressable>
                    </View>
                </Callout>
            </Marker>
            <Marker
                key={3}
                coordinate={{
                    latitude: 19.421219, 
                    longitude: -99.157721,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                title={'Drop'}
                description={'Acercáte a esta sucursal para participar en esta actividad'}
                image={require('../assets/pins/drop.png')}
                onCalloutPress={onCalloutTap}
            >
                <Callout tooltip={true} style={{width: 200, backgroundColor: 'white', paddingVertical: 10}}>
                    <View style={styles.callOut}>
                        <Text style={styles.sectionTitle}>Drop</Text>
                        <Text style={{fontSize: 14, textAlign: 'center'}}>Acercáte a esta sucursal para participar</Text>
                        <Pressable style={{padding: 2, ...styles.buttonPrimary}} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonPrimaryText}>Ver mas</Text>
                        </Pressable>
                    </View>
                </Callout>
            </Marker>
            <Marker
                key={4}
                coordinate={{
                    latitude: 19.427335,
                    longitude: -99.168346,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                title={'Challenge'}
                description={'Acercáte a esta sucursal para participar'}
                image={require('../assets/pins/challenge.png')}
                onCalloutPress={onCalloutTap}
            >
                <Callout tooltip={true} style={{width: 200, backgroundColor: 'white', paddingVertical: 10}}>
                    <View style={styles.callOut}>
                        <Text style={styles.sectionTitle}>Challenge</Text>
                        <Text style={{fontSize: 14, textAlign: 'center'}}>Acercáte a esta sucursal para participar</Text>
                        <Pressable style={{padding: 2, ...styles.buttonPrimary}} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonPrimaryText}>Ver mas</Text>
                        </Pressable>
                    </View>
                </Callout>
            </Marker>
          </MapView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
            style={{position: "absolute", bottom: 10, backgroundColor: 'black'}}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.mainTitle}>{visibleActivity ? visibleActivity : 'Activity'}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={{padding: 20, ...styles.buttonPrimary}}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonPrimaryText}>Participar</Text>
                        </Pressable>
                        <Pressable
                            style={{padding: 20, ...styles.buttonSecondary}}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonSecondaryText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
          </Modal>
          <View style={{position: "absolute", width: '100%', bottom: 0}}>
            <Text style={{backgroundColor: '#00000099', color: 'white', fontSize: 10, textAlign: 'center'}}>Latitud: {coords?.coords?.latitude} Longitud: {coords?.coords?.longitude}</Text>
          </View>
        </View>
    );
}
export default MapScreen