import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const UserProfile = () => {
    return (
        <View>
            <View style={{ height: 200, backgroundColor: "#FE3877" }}>

            </View>

            <View style={{flexDirection: 'row', padding: 24, justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <View>
                    <Text style={{ color: "black", fontWeight: 700 }}>Osama Abrar</Text>
                    <Text style={{ fontSize: 12, color: "gray" }}>Male | 18-25 Years</Text>
                    <Text style={{ marginTop: 8, color: "black", fontWeight: 700 }}>Bio</Text>
                    <Text style={{ fontSize: 12, color: "gray" }}>This is my bio</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon2 name="heart" size={32} color="orange" style={{ marginLeft: 16 }} />
                    <Icon name="phone-volume" size={25} color="#7CFC00" style={{ marginLeft: 16 }} />
                </View>
            </View>


        </View>
    )
}

export default UserProfile