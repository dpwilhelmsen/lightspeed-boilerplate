import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
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

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $name: String!
    $location: String!
    $bio: String!
    $phone: String!
    $workPhone: String!
    $email: String!
    $workEmail: String! 
  ) {
    updateProfile(
      name: $name
      location: $location
      bio: $bio
      phone: $phone
      workPhone: $workPhone
      email: $email
      workEmail: $workEmail
    ) {
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

const EditProfileContainer = ({ screen: Screen }) => {
  return (
    <Mutation
      mutation={EDIT_PROFILE}
      refetchQueries={() => {
        return [{
          query: PROFILE_DATA,
        }];
      }}
    >
      {(updateProfileMutation) => {
        return (
          <Query query={PROFILE_DATA}>
            {({
              loading, error, data,
            }) => {
              if (loading) return <LoadingScreen>Fetching</LoadingScreen>;
              if (error) return <ErrorScreen>Error</ErrorScreen>;

              const { profile } = data;

              return (
                <Screen
                  profile={profile}
                  onSubmit={(values) => {
                    return updateProfileMutation({ variables: values })
                      .then(() => Actions.profile());
                  }}
                />
              );
            }}
          </Query>
        );
      }}
    </Mutation>
  );
};

EditProfileContainer.propTypes = propTypes;

export default EditProfileContainer;
