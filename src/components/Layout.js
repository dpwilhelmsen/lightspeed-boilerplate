import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import FooterBar from './FooterBar';

const propTypes = {
  title: PropTypes.string,
  contentStyle: ViewPropTypes.style,
  beforeContent: PropTypes.node,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  contentStyle: {},
  title: 'Header',
  beforeContent: null,
};

const Layout = ({
  title,
  contentStyle,
  children,
  beforeContent,
}) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => Actions.drawerOpen()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
      {beforeContent}
      <Content contentContainerStyle={contentStyle}>
        {children}
      </Content>
      <FooterBar />
    </Container>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
