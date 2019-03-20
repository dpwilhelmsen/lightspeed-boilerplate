import React from 'react';
import { View } from 'native-base';

const Divider = () => {
  return (<View style={styles.lineStyle} />);
};

const styles = {
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    marginTop: 10,
    marginBottom: 10,
  },
};

export default Divider;
