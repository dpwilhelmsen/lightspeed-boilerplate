import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Item,
  Input,
  Textarea,
  Label,
  Text,
  View,
} from 'native-base';
import { compose } from 'recompose';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';

const TextInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(Input);
const TextAreaInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(Textarea);
const WrappedForm = withNextInputAutoFocusForm(Form);

const validationSchema = Yup.object().shape({
  name: Yup.string().required('A name is required.'),
  location: Yup.string().required('Location is required.'),
  bio: Yup.string().required('A bio is required.'),
  phone: Yup.string().required('A phone number is required.'),
  workPhone: Yup.string().required('A work phone number is required.'),
  email: Yup.string().required('An email is required.').email('Email address is invalid.'),
  workEmail: Yup.string().required('A work emails is required.').email('Email address is invalid.'),
});

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const EditProfileForm = props => (
  <Formik
    initialValues={props}
    onSubmit={values => props.onSubmit(values)}
    validationSchema={validationSchema}
    render={({ errors, touched, handleSubmit }) => {
      const isTouched = Object.keys(touched).length > 0;
      return (
        <WrappedForm>
          <Item stackedLabel error={(isTouched && !!errors.name)}>
            <Label>Name</Label>
            <TextInput label="Email" name="name" type="name" />
          </Item>
          {(isTouched && !!errors.name) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.name}</Text>
            </View>
          )}
          <Item stackedLabel error={(isTouched && !!errors.location)}>
            <Label>Location</Label>
            <TextInput label="Password" name="location" type="location" />
          </Item>
          {(isTouched && !!errors.location) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.location}</Text>
            </View>
          )}
          <Item stackedLabel error={(isTouched && !!errors.bio)}>
            <Label>Bio</Label>
            <TextAreaInput rowSpan={5} bordered style={styles.textArea} name="bio" type="bio" />
          </Item>
          {(isTouched && !!errors.bio) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.bio}</Text>
            </View>
          )}
          <Item stackedLabel error={(isTouched && !!errors.phone)}>
            <Label>Phone</Label>
            <TextInput label="Last Name" name="phone" type="name" />
          </Item>
          {(isTouched && !!errors.phone) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.phone}</Text>
            </View>
          )}
          <Item stackedLabel error={(isTouched && !!errors.workPhone)}>
            <Label>Work Phone</Label>
            <TextInput label="Last Name" name="workPhone" type="name" />
          </Item>
          {(isTouched && !!errors.workPhone) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.workPhone}</Text>
            </View>
          )}
          <Item stackedLabel error={(isTouched && !!errors.email)}>
            <Label>Email</Label>
            <TextInput label="Last Name" name="email" type="name" />
          </Item>
          {(isTouched && !!errors.email) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.email}</Text>
            </View>
          )}
          <Item stackedLabel error={(isTouched && !!errors.workEmail)}>
            <Label>Work Email</Label>
            <TextInput label="Last Name" name="workEmail" type="name" />
          </Item>
          {(isTouched && !!errors.workEmail) && (
            <View style={styles.errorMessageView}>
              <Text note style={styles.errorMessage}>{errors.workEmail}</Text>
            </View>
          )}
          <View style={styles.submitRow}>
            <Button onPress={handleSubmit}>
              <Text>Submit</Text>
            </Button>
          </View>
        </WrappedForm>
      );
    }}
  />
);

const styles = {
  submitRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textArea: { width: '100%' },
  errorMessageView: { paddingLeft: 15, paddingRight: 15, paddingTop: 5 },
  errorMessage: { color: '#FF0000' },
};

EditProfileForm.propTypes = propTypes;

export default EditProfileForm;
