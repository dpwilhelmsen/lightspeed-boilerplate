import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  H1,
} from 'native-base';
import Layout from '../components/Layout';
import Divider from '../components/Divider';
import EditProfileForm from '../components/EditProfileForm';

const propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    phone: PropTypes.string,
    workPhone: PropTypes.string,
    email: PropTypes.string,
    workEmail: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const EditProfileScreen = ({ profile, onSubmit }) => {
  return (
    <Layout title="Edit Profile">
      <View style={styles.p10}>
        <View style={styles.row}>
          <H1>Edit Profile</H1>
        </View>
        <Divider />
      </View>
      <View style={styles.formContainer}>
        <EditProfileForm {...profile} onSubmit={onSubmit} />
      </View>
    </Layout>
  );
};

EditProfileScreen.propTypes = propTypes;

const styles = {
  p10: {
    padding: 10,
  },
  row: { flex: 1, flexDirection: 'row' },
  formContainer: { marginRight: 15 },
};

export default EditProfileScreen;
