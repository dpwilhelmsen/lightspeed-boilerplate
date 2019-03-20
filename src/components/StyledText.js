import React from 'react';
import { Text } from 'react-native';

const monoPropTypes = {
  style: Text.propTypes.style,
};

const monoDefaultProps = {
  style: {},
};

export const MonoText = (props) => {
  const { style } = props;
  const textStyle = Object.assign({}, style, { fontFamily: 'space-mono' });
  return <Text {...props} style={textStyle} />;
};

MonoText.propTypes = monoPropTypes;
MonoText.defaultProps = monoDefaultProps;

export default MonoText;
