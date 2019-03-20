import React from 'react';
import { H1, View, Spinner } from 'native-base';
import Layout from '../components/Layout';

const LoadingScreen = () => {
  return (
    <Layout
      contentStyle={styles.contentStyle}
      title="Loading"
    >
      <View
        style={styles.spinnerWrap}
      >
        <H1>Loading</H1>
        <Spinner color="blue" />
      </View>
    </Layout>
  );
};

const styles = {
  contentStyle: {
    flexGrow: 1,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default LoadingScreen;
