import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  View,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
} from 'native-base';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import Layout from '../components/Layout';
import Colors from '../constants/Colors';

const propTypes = {
  homepage: PropTypes.shape({
    image: PropTypes.string,
    caption: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default class HomeScreen extends Component {
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools.
          {learnMoreButton}
        </Text>
      );
    }
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode, your app will run at full speed.
      </Text>
    );
  }

  _handleLearnMorePress() {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  }

  _handleHelpPress() {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes',
    );
  }

  render() {
    const { homepage } = this.props;
    return (
      <Layout
        title="Home"
      >
        <View>
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: homepage.image }} />
                <Body>
                  <Text>{homepage.caption}</Text>
                  <Text note>{homepage.profile.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image style={styles.mainImage} source={{ uri: homepage.image }} />
            </CardItem>
          </Card>
        </View>

        <View style={styles.getStartedContainer}>
          {this._maybeRenderDevelopmentModeWarning()}

          <Text style={styles.getStartedText}>Get started by opening</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText style={styles.codeHighlightText}>src/screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
}

HomeScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  developmentModeText: {
    marginBottom: 20,
    color: Colors.devModeText,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  getStartedContainer: {
    marginTop: 15,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: Colors.codeHighlightText,
  },
  codeHighlightContainer: {
    backgroundColor: Colors.lightGreyBackground,
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: Colors.darkText,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: Colors.linkColor,
  },
  cardStyle: {
    elevation: 3,
  },
  mainImage: {
    height: 300,
    flex: 1,
  },
});
