import React from 'react';
import { Platform } from 'react-native';
import {
  Scene,
  Router,
  Reducer,
  Stack,
  Drawer,
} from 'react-native-router-flux';
import HomeContainer from '../containers/HomeContainer';
import HomeScreen from '../screens/HomeScreen';
import SideBar from '../components/Sidebar';
import ProfileContainer from '../containers/ProfileContainer';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileContainer from '../containers/EditProfileContainer';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingScreen from '../screens/SettingsScreen';

const reducerCreate = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('reducer: ACTION:', action);
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState, newState, action) => {
  console.log('onStateChange: ACTION:', action);
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const AppNavigator = () => (
  <Router
    createReducer={reducerCreate}
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}
  >
    <Stack key="root" hideNavBar>
      <Drawer
        open={false}
        type="overlay"
        key="drawer"
        contentComponent={SideBar}
        drawerWidth={300}
      >
        <Scene
          hideNavBar
          key="home"
          component={HomeContainer}
          screen={HomeScreen}
        />
        <Scene
          hideNavBar
          key="profile"
          component={ProfileContainer}
          screen={ProfileScreen}
        />
        <Scene
          hideNavBar
          key="editProfile"
          component={EditProfileContainer}
          screen={EditProfileScreen}
        />
        <Scene
          hideNavBar
          key="settings"
          component={SettingScreen}
        />
      </Drawer>
    </Stack>
  </Router>
);

export default AppNavigator;
