import React, { Component } from 'react';
import {
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Item,
  Separator,
} from 'native-base';
import { Platform } from 'react-native';
import Layout from '../components/Layout';

const colors = {
  orange: '#FF9501',
  blue: '#007AFF',
  green: '#4CDA64',
  red: '#FD3C2D',
  grey: '#8F8E93',
  indigo: '#5855D6',
};

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: 'key1',
      airplane: false,
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value) {
    this.setState({
      selected1: value,
    });
  }

  render() {
    const { airplane, selected1 } = this.state;
    return (
      <Layout title="Settings">
        <Separator bordered noTopBorder />
        <ListItem icon>
          <Left>
            <Button style={styles.background.orange}>
              <Icon active name="airplane" />
            </Button>
          </Left>
          <Body>
            <Text>Airplane Mode</Text>
          </Body>
          <Right>
            <Switch
              value={airplane}
              trackColor="#50B948"
              onValueChange={() => this.setState({ airplane: !airplane })}
            />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={styles.background.blue}>
              <Icon active name="wifi" />
            </Button>
          </Left>
          <Body>
            <Text>Wi-Fi</Text>
          </Body>
          <Right>
            <Text>GeekyAnts</Text>
            {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={styles.background.blue}>
              <Icon active name="bluetooth" />
            </Button>
          </Left>
          <Body>
            <Text>Bluetooth</Text>
          </Body>
          <Right>
            <Text>On</Text>
            {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={styles.background.green}>
              <Icon active name="phone-portrait" />
            </Button>
          </Left>
          <Body>
            <Text>Mobile Data</Text>
          </Body>
          <Right>
            <Radio selected />
          </Right>
        </ListItem>
        <ListItem icon last>
          <Left>
            <Button style={styles.background.green}>
              <Icon active name="link" />
            </Button>
          </Left>
          <Body>
            <Text>Personal Hotspot</Text>
          </Body>
          <Right>
            <Text>Off</Text>
            {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
          </Right>
        </ListItem>

        <Separator bordered />

        <ListItem icon>
          <Left>
            <Button style={styles.background.red}>
              <Icon active name="notifications" />
            </Button>
          </Left>
          <Body>
            <Text>Notifications</Text>
          </Body>
          <Right>
            {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={styles.background.grey}>
              <Icon active name="switch" />
            </Button>
          </Left>
          <Body>
            <Text>Control Center</Text>
          </Body>
          <Right>
            {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
          </Right>
        </ListItem>
        <ListItem icon last>
          <Left>
            <Button style={styles.background.indigo}>
              <Icon active name="moon" />
            </Button>
          </Left>
          <Body>
            <Text>Do Not Disturb</Text>
          </Body>
          <Right>
            <Text>Yes</Text>
          </Right>
        </ListItem>
        <Separator bordered />
        <ListItem icon>
          <Left>
            <Button style={styles.background.green}>
              <Icon name="arrow-dropdown" />
            </Button>
          </Left>
          <Body>
            <Text>Pick SIM</Text>
          </Body>
          <Right>
            <Picker
              note
              mode="dropdown"
              style={styles.picker}
              selectedValue={selected1}
              onValueChange={this.onValueChange}
            >
              <Item label="TATA" value="key0" />
              <Item label="AIRTEL" value="key1" />
            </Picker>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={styles.background.grey}>
              <Icon active name="cog" />
            </Button>
          </Left>
          <Body>
            <Text>Software Update</Text>
          </Body>
          <Right>
            <Badge style={styles.background.red}>
              <Text>2</Text>
            </Badge>
          </Right>
        </ListItem>
        <ListItem last icon>
          <Left>
            <Button style={styles.background.blue}>
              <Icon active name="hand" />
            </Button>
          </Left>
          <Body>
            <Text>Privacy</Text>
          </Body>
          <Right>
            {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
          </Right>
        </ListItem>
      </Layout>
    );
  }
}

const styles = {
  background: {
    orange: { backgroundColor: colors.orange },
    blue: { backgroundColor: colors.blue },
    green: { backgroundColor: colors.green },
    red: { backgroundColor: colors.red },
    grey: { backgroundColor: colors.grey },
    indigo: { backgroundColor: colors.indigo },
  },
  picker: { width: 120 },
};

export default SettingsScreen;
