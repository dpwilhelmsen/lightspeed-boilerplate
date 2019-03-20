import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorScreen from '../screens/ErrorScreen';
import LoadingScreen from '../screens/LoadingScreen';

export const HOME_DATA = gql`
  {
    homepage {
      image
      caption
      profile {
        name
      }
    }
  }
`;

const propTypes = {
  screen: PropTypes.func.isRequired,
};

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

HomeContainer.propTypes = propTypes;

export default HomeContainer;
