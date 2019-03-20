import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Footer,
  FooterTab,
  Icon,
  Text,
  Toast,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { withNavigation } from 'react-navigation';

const propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }).isRequired,
};

const FooterBar = ({ navigation }) => {
  const { routeName: currentScene } = navigation.state;
  return (
    <Footer>
      <FooterTab>
        <Button active={(currentScene === '_home')} vertical onPress={Actions.home}>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button vertical badge>
          <Badge><Text>51</Text></Badge>
          <Icon active name="sheriff-badge" type="Foundation" />
          <Text>Badge</Text>
        </Button>
        <Button
          active={(currentScene === 'test')}
          vertical
          onPress={() => Toast.show({
            text: 'This is a toast message!',
            buttonText: 'Okay',
            position: 'top',
            duration: 3000,
          })}
        >
          <Icon active name="bullhorn" type="FontAwesome" />
          <Text>Toast</Text>
        </Button>
        <Button active={(currentScene === '_profile')} vertical onPress={Actions.profile}>
          <Icon name="person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

FooterBar.propTypes = propTypes;

export default withNavigation(FooterBar);
