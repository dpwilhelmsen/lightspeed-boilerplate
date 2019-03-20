import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { StyleProvider, Root } from "native-base";
import { ApolloProvider } from "react-apollo";
import getTheme from './native-base-theme/components';
import AppNavigator from './src/navigation/AppNavigator';
import client from './src/lib/client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        Entypo: require("native-base/Fonts/Entypo.ttf"),
        Feather: require("native-base/Fonts/Feather.ttf"),
        FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
        // MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf"),
        // MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
        Octicons: require("native-base/Fonts/Octicons.ttf"),
        // Zocial: require("@expo/vector-icons/fonts/Zocial.šttf"),
        // SimpleLineIcons: require("native-base/Fonts/SimpleLineIcons.ttf"),
        // EvilIcons: require("native-base/Fonts/EvilIcons.ttf"),
        // ...Ionicons.font,
      }),
    ]);
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      )
    } else {
      return (
        <ApolloProvider client={client}>
          <StyleProvider style={getTheme()}>
            <Root>
              <AppNavigator />
            </Root>
          </StyleProvider>
        </ApolloProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
