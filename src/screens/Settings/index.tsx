import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import { ListItem } from '@rneui/themed';
import { ChevronRight, UserCircle2Icon } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title={"Settings"} />

      <View style={{ paddingHorizontal: 32, paddingVertical: 16 }}>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon name="user-large" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              My Profile
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon2 name="credit-card-clock" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Credit History
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon2 name="history" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Call History
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon2 name="email-open" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Invite
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon2 name="note-text" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Privacy Policy
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon2 name="note-text" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Terms & Conditions
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <Icon2 name="information" size={25} color="#5E449B" style={{ marginRight: 8 }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              App Info
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

      </View>

    </View>
  );
};

export default Settings;
