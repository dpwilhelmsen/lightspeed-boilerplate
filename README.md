![Lightspeed Boilerplate](https://raw.githubusercontent.com/dpwilhelmsen/lightspeed-boilerplate/master/LightSpeedBanner.png)

# Lightspeed Boilerplate for React Native
An Expo, NativeBase, React Native Router Flux &amp; Graphql powered React Native boilerplate. Built to get you up and running at the speed of light!
[Lightspeed Boilerplate in Action](https://raw.githubusercontent.com/dpwilhelmsen/lightspeed-boilerplate/master/demo_small.gif)

## Table of contents

<!--ts-->
   * [Intro](#intro)
   * [Getting Started](#getting-started)
      * [Prerequisites](#prerequisites)
      * [Installing](#installing)
   * [Anatomy](#anatomy)
      * [Application Structure](#application-structure)
        * [Components](#components)
        * [Containers](#containers)
        * [Screens](#screens)
        * [Navigation](#navigation)
   * [Contributing](#contributing)
   * [License](#license)
   * [Acknowledgments](#acknowledgments)
<!--te-->

## Intro

<img align="right" width="250" height="489" src="https://raw.githubusercontent.com/dpwilhelmsen/lightspeed-boilerplate/master/demo_small.gif">

This boilerplate was designed to alleviate the pain of setting up a new React Native project.
The project aims to strike a balance between functionality and cleanliness. You should be able to get up and
running quickly without having to strip out a ton of features or undesired options.

Lightspeed is setup to leverage Expo, NativeBase, React Native Router Flux & GraphQL (via Apollo). All the important pieces will be
described throughout this documentation and how to remove them if desired. If you feel like there are other key
packages missing, feel free to contribute and make a case for them.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run the application, you will need to have Node.js (version 10 or newer) installed on your computer. [You can download the latest version of Node.js here.](https://nodejs.org/en/)
Once Node is installed, you will also need to install the Expo CLI by running the following command:

```
npm install -g expo-cli
```

### Installing & Running

1.  **Clone & Install**

    ```
    # Clone the Repo
    git clone git@github.com:dpwilhelmsen/lightspeed-boilerplate.git
    
    # Navigate to the directory
    cd lightspeed-boilerplate
    
    # Install the dependencies
    yarn install # OR npm i    
    ```

2.  **Start the GraphQL Server**
    
    This repo comes with a sample GraphQL endpoint. To run the initial application, you will need to run the server locally. 
    If you choose to use your own endpoint or remove GraphQL functionality, you can safely remove the `server.js` file and remove the `server` script from the `scripts` section of `package.json`
    
    ```
    # Start the GraphQL server
    npm run server
    ```

3.  **Start Expo**
    ```
    expo start
    ```

## Anatomy

Lightspeed Boilerplate aims to set up code structure in a sensible and maintainable way.

    .
    ├── assets                  # Assets for the app, handled by Expo's Asset Manager
    ├── native-base-theme       # NativeBase theme definitions
    ├── src                     # Source files
    │   ├── componenents        # Reusable React components
    │   ├── constants           # Any values that need to be used app wide
    │   ├── containers          # Components designed to fetch and prepare data for a screen
    │   ├── lib                 # Libraries and services
    │   ├── navigation          # Contains the route/screen definitions
    │   └── screens             # All the presentation screen components
    ├── .eslint.json            # Definition of eslint rules to use
    ├── App.js                  # Main entry point of the app
    ├── app.json                # Expo configuration options
    ├── package.json            
    ├── README.md               
    └── server.js               # The demo GraphQl server

### Application Structure

Lightspeed Boilerplate's architecture is set up to help with reusability and maintainability.
Here we will outline the responsibilities of the various pieces.

#### Components

These are standard React components. Presentational, functional & form components all reside here.

#### Containers

Containers are intended to fetch and prepare data for a page. These containers utilize GraphQL to submit
queries and mutations, with the results being passed along to the screens.

As an example, let's look at the `HomeContainer`

```javascript
...
const HomeContainer = ({ screen: Screen }) => {
  return (
    <Query query={HOME_DATA}>
      {({
        loading, error, data,
      }) => {
        if (loading) return <LoadingScreen>Fetching</LoadingScreen>;
        if (error) return <ErrorScreen>Error</ErrorScreen>;

        const { homepage } = data;

        return <Screen homepage={homepage} />;
      }}
    </Query>
  );
};
...
```

This container is using Apollo's `Query` component to fetch the data for the home page. Based on the state of the query,
the container decides which screen to render, the `LoadingScreen`, `ErrorScreen` or `HomeScreen`. This gives you a nice,
clean central location to handle loading, errors and data transformation.

It's important to note that not every screen needs a container. The `SettingsScreen` is an example of having a screen
with no server interaction.

If you with to fetch your data via other means, you can remove the GraphQL specific code from the containers and replace it with 
a package of your choosing. Here's a quick example of using `fetch` to aquire the data for the screen.

```javascript
import React, { Component } from 'react';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errors: null,
      data: null,
    }
  }
  
  componentDidMount() {
    fetch('https://api.mydomain.com')
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false }))
      .catch((errors) => this.setState({ errors, loading: false }));
  }
  
  render() {
    const { screen: Screen } = this.props;
    const { loading, errors, data } = this.state;
    if (loading) return <LoadingScreen>Fetching</LoadingScreen>;
    if (errors) return <ErrorScreen errors={errors}>Error</ErrorScreen>;
    
    return (<Screen homepage={data} />);
  }
}

export default HomeContainer;
```

You could pair this with redux or some sort of caching solution to prevent unnecessary refetches.

#### Screens

Screens are what's actually displayed on screen. Screens can either be solo or paired with a container.
They assume data has been passed in, where applicable, and render the screen they are responsible for.

Each screen imports the `Layout` component. This component is the shared layout between all screens. It contains
the header, content area and footer (if desired). The layout accepts a few different props to allow per screen variations.

Screens & Components are imported & tied together in the `AppNavigator` as outlined below.

#### Navigation
The route definitions for the application are located within `AppNavigator`. It utilizes React Native Router Flux, which itself uses React Navigation.
In the AppNavigator, the router, stack and scenes are defined. In this initial setup, it also creates a drawer
menu, which get be removed if undesired.

The `Scene` component is what ties together containers and screens. If your screen needs data, you want to pass in the container as the `component` prop 
and pass in the screen component as the `screen` prop:

```jsx harmony
<Scene
  hideNavBar
  key="home"
  component={HomeContainer}
  screen={HomeScreen}
/>
```

If you do not need a container for the screen, the screen can just be passed into the `component` prop:

```jsx harmony
<Scene
  hideNavBar
  key="settings"
  component={SettingScreen}
/>
```

### Main Packages

#### Expo

Expo is a set of tools, libraries and services to empower React Native development. Utilizing it
can help you get up and running very quickly. [The documentation for Expo can be found here.](https://docs.expo.io/versions/latest/)

##### Removal

While Expo is very useful, there may be situation where you wish to remove it. Often, you'll wish to
utilize a native library that's unavailable while using Expo. In those cases, you can eject from Expo.

Detailed instructions for ejecting to ExpoKit (Expo platform tools) can be found [here.](https://docs.expo.io/versions/v32.0.0/expokit/eject/#__next)
It would be best to follow their instructions but the main steps are:

1.  Ensure the proper configurations options are set in `app.json`.

    ```json
     {
       "expo": {
        "name": "Your App Name",
        "icon": "./path/to/your/app-icon.png",
        "version": "1.0.0",
        "slug": "your-app-slug",
        "sdkVersion": "XX.0.0",
        "ios": {
          "bundleIdentifier": "com.yourcompany.yourappname"
        },
        "android": {
          "package": "com.yourcompany.yourappname"
        }
       }
     }
    ``` 
2.  Run `expo eject`. This will download the required dependencies and build native projects under the ios and android directories.

3.  Now that you have a native app, you can proceed to set up ExpoKit following the steps outlined in their [Developing with ExpoKit](https://docs.expo.io/versions/v32.0.0/expokit/expokit/) page.

#### NativeBase

NativeBase is a UI kit that provides cross-platform UI components. It's simple to theme and the library provides a consistency
between platforms and devices.

##### Removal

Removing NativeBase is a bit involved as it's used widely throughout the boilerplate. However, most components have React Native equivalents so it should be easy to replace.

1.  Go through `screens` and `components` directories and replace any usage of NativeBase components with their React Native equivalents. [NativeBase docs outline what each component replaces](https://docs.nativebase.io/Components.html#Components)
2.  Remove all the NativeBase icon fonts loaded in `Font.loadAsync` in `App.js`
3.  Remove the package using `yarn remove native-base` or `npm uninstall native-base`.

#### React Native Router Flux

React Native Router Flux is a declaritive react native router. It's based on the React Navigation plugin and as such, you can utilize React Navigation tools, like the `withNavigation` HOC if needed.

##### Removal

React Native Router Flux is primarily utilized in the `AppNavigator` component. Since there are many variants of navigation, we can only provide a rough outline of how to remove.

1. Replace or remove the contents of `AppNavigator` and it's inclusion in `App.js`. Replace with your new navigation system.
2. Replace any import of `Actions` in the components and screens with the equivalent method of navigating in your new navigation package.

#### Apollo

Apollo client is used to query the GraphQL server that provides the data for the application. It is highly configurable and straightforward to use to consume and parse endpoints.

##### Removal

1.  Remove references to `<Query>`, `<Mutation>`, and `graphql-tag` from the containers.
2.  Remove `<ApolloProvider>` from `App.js`.
3.  Remove `lib\client.js`.
4.  Remove `server.js` and remove the `server` command from the scripts section of `package.json`
5.  Uninstall the Apollo package.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/dpwilhelmsen/lightspeed-boilerplate/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/dpwilhelmsen/lightspeed-boilerplate/blob/master/LICENSE) file for details

## Acknowledgments

* [Satellite avatar created by rawpixel.com - www.freepik.com](https://www.freepik.com/free-photos-vectors/icon)


[You can download the latest version of Node.js here.]: https://nodejs.org/en/
