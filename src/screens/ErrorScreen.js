import React from 'react';
import { H1, Text, View } from 'native-base';
import Layout from '../components/Layout';

const ErrorScreen = () => {
  return (
    <Layout
      contentStyle={styles.contentStyle}
      title="Error"
    >
      <View
        style={styles.containerStyle}
      >
        <H1>Oops</H1>
        <Text>There was an error fetching data.</Text>
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
};

export default ErrorScreen;
