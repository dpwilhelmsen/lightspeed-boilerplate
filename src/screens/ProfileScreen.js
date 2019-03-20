import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import {
  Thumbnail,
  View,
  Text,
  H1,
  H2,
  Icon,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Layout from '../components/Layout';
import Divider from '../components/Divider';

const backgroundImage = require('../../assets/images/abstract2.jpg');
const thumbnail = require('../../assets/images/8496.jpg');

const propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    phone: PropTypes.string,
    workPhone: PropTypes.string,
    email: PropTypes.string,
    workEmail: PropTypes.string,
  }).isRequired,
};

const ProfileScreen = ({ profile }) => {
  return (
    <Layout title="Profile">
      <ImageBackground
        source={backgroundImage}
        style={styles.imageBackground}
      >
        <View style={styles.innerWrapper}>
          <Thumbnail
            style={styles.profileThumbnail}
            source={thumbnail}
          />
          <H2 style={styles.whiteText}>{profile.name}</H2>
          <View style={styles.bylineWrap}>
            <Icon name="pin" style={Object.assign({}, styles.whiteText, styles.icon)} />
            <Text style={styles.whiteText}>{profile.location}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.p10}>
        <View style={styles.bio}>
          <Left>
            <H1>Bio</H1>
          </Left>
          <Right>
            <Button iconLeft small onPress={Actions.editProfile}>
              <Icon name="pencil" type="FontAwesome" />
              <Text>Edit</Text>
            </Button>
          </Right>
        </View>
        <Divider />
        <Text>
          {profile.bio}
        </Text>
      </View>
      <List>
        <ListItem>
          <Left style={styles.iconPosition}>
            <Icon name="call" style={styles.tealIcon} />
          </Left>
          <Body>
            <View style={styles.p10}>
              <Text>{profile.phone}</Text>
              <Text note>Mobile</Text>
            </View>
            <View style={styles.p10}>
              <Text>{profile.workPhone}</Text>
              <Text note>Work</Text>
            </View>
          </Body>
        </ListItem>
        <ListItem>
          <Left style={styles.iconPosition}>
            <Icon name="mail" style={styles.tealIcon} />
          </Left>
          <Body>
            <View style={styles.p10}>
              <Text>{profile.email}</Text>
              <Text note>Personal</Text>
            </View>
            <View style={styles.p10}>
              <Text>{profile.workEmail}</Text>
              <Text note>Work</Text>
            </View>
          </Body>
        </ListItem>
      </List>
    </Layout>
  );
};

ProfileScreen.propTypes = propTypes;

const styles = {
  imageBackground: {
    width: '100%',
    alignItems: 'center',
  },
  innerWrapper: {
    padding: 10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  profileThumbnail: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  whiteText: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bylineWrap: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  bio: { flex: 1, flexDirection: 'row' },
  icon: {
    fontSize: 20,
    marginRight: 5,
  },
  p10: {
    padding: 10,
  },
  iconPosition: {
    flex: 0,
    flexShrink: 1,
    alignSelf: 'flex-start',
  },
  tealIcon: {
    color: '#00b386',
    fontSize: 30,
    marginTop: 10,
    marginRight: 20,
    width: 25,
    alignSelf: 'flex-end',
  },
};

export default ProfileScreen;
