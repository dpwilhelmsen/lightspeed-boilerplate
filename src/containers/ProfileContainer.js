import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorScreen from '../screens/ErrorScreen';
import LoadingScreen from '../screens/LoadingScreen';

export const PROFILE_DATA = gql`
  {
    profile {
      name
      location
      bio
      phone
      workPhone
      email
      workEmail
    }
  }
`;

const propTypes = {
  screen: PropTypes.func.isRequired,
};

const ProfileContainer = ({ screen: Screen }) => {
  return (
    <Query query={PROFILE_DATA}>
      {({
        loading, error, data,
      }) => {
        if (loading) return <LoadingScreen>Fetching</LoadingScreen>;
        if (error) return <ErrorScreen>Error</ErrorScreen>;

        const { profile } = data;

        return <Screen profile={profile} />;
      }}
    </Query>
  );
};

ProfileContainer.propTypes = propTypes;

export default ProfileContainer;
