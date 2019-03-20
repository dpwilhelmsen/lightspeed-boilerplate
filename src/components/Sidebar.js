import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import {
  Left,
  Right,
  List,
  ListItem,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

const SideBar = () => {
  return (
    <SafeAreaView style={styles.sidebar}>
      <List>
        <ListItem icon="menu" onPress={Actions.home}>
          <Left>
            <Text>Home</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={Actions.profile}>
          <Left>
            <Text>Profile</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem onPress={Actions.settings}>
          <Left>
            <Text>Settings</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </SafeAreaView>
  );
};

const styles = {
  sidebar: { backgroundColor: '#fff', height: '100%' },
};

export default SideBar;
