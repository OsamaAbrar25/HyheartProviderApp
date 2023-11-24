import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header';
import { Button, ListItem } from '@rneui/themed';
// import { Image } from '@rneui/themed';
// import coinImg from '../../assets/images/coin.png';

const CreditHistory = () => {
  return (
    <View style={{}}>
      <Header title={"Credit History"} />

      <View style={{ padding: 10 }}>

        <View style={{ backgroundColor: "#5E449B", padding: 16, borderRadius: 15, gap: 6 }}>
          <Text style={{ textAlign: 'center', color: "white", fontSize: 16 }}>
            {/* <Image source={require('../../assets/images/coin.png')} style={{width: 50, height: 50}} /> */}
            12.0
          </Text>
          <Text style={{ textAlign: 'center', color: "white", fontSize: 11 }}>Total Credits Balance</Text>
          <View style={{ flexDirection: 'row', justifyContent: "center" }}>
            <Button
              size={'sm'}
              buttonStyle={{ paddingHorizontal: 20, backgroundColor: '#FADD9A' }}
              containerStyle={{ borderRadius: 50 }}
              titleStyle={{ fontSize: 10, color: 'black' }}
              title={'Buy Credits'}
            />
          </View>
        </View>

        <View style={{ marginTop: 32 }}>

          <Text style={{ marginBottom: 8, color: 'gray' }}>02 Nov, 2023</Text>
          <ListItem
            containerStyle={{ borderRadius: 6 }}
            style={{
              paddingVertical: 4,
            }}>
            {/* <UserCircle2Icon color={'black'} /> */}
            <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <ListItem.Title style={{ fontWeight: '700', fontSize: 12 }}>
                  Credit
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 11 }}>
                  09:32 PM
                </ListItem.Subtitle>
              </View>

              <ListItem.Subtitle>
                +12
              </ListItem.Subtitle>
            </ListItem.Content>

            {/* <ChevronRight color='silver' size={"18"} /> */}
          </ListItem>

        </View>

      </View>
    </View>
  );
};

export default CreditHistory;
