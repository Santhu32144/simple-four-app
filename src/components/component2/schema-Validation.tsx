import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
    .required('Password length is required'),
});

const SchemaValidation = () => {
  const [password, setPassword] = React.useState('');
  const [isPassGenerated, setIsPassGenerated] = React.useState(false);
  const [options, setOptions] = React.useState({
    lowerCase: false,
    upperCase: false,
    number: false,
    symbol: false,
  });

  const characterLists = useMemo(
    () => ({
      upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCase: 'abcdefghijklmnopqrstuvwxyz',
      number: '0123456789',
      symbol: '!@#$%^&*()_+[]{}|;:,.<>?',
    }),
    []
  );

  const generatePasswordString = useCallback(
    (passwordLength: number) => {
      const selectedOptions = Object.entries(options)
        .filter(([_, value]) => value)
        .map(([key]) => characterLists[key as keyof typeof characterLists])
        .join('');

      if (!selectedOptions) {
        setPassword('Please select at least one character type');
        setIsPassGenerated(true);
        return;
      }

      const passwordResult = createPassword(selectedOptions, passwordLength);
      setPassword(passwordResult);
      setIsPassGenerated(true);
    },
    [options, characterLists]
  );

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const resetPasswordState = useCallback(() => {
    setPassword('');
    setIsPassGenerated(false);
    setOptions({
      lowerCase: false,
      upperCase: false,
      number: false,
      symbol: false,
    });
  }, []);

  const toggleOption = useCallback(
    (key: keyof typeof options) => {
      setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => generatePasswordString(Number(values.passwordLength))}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex: 12"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  {[
                    { label: 'Lowercase Letters', key: 'lowerCase', color: '#29ab87' },
                    { label: 'Uppercase Letters', key: 'upperCase', color: '#fed85d' },
                    { label: 'Numbers', key: 'number', color: '#c9a0dc' },
                    { label: 'Symbols', key: 'symbol', color: '#fc80a5' },
                  ].map(({ label, key, color }) => (
                    <View key={key} style={styles.checkboxRow}>
                      <Text style={styles.label}>{label}</Text>
                      <BouncyCheckbox
                        useBuiltInState={false}
                        isChecked={options[key as keyof typeof options]}
                        onPress={() => toggleOption(key as keyof typeof options)}
                        fillColor={color}
                        style={styles.checkbox}
                      />
                    </View>
                  ))}
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={[styles.primaryButton, !isValid && styles.disabledButton]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryButtonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryButtonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputColumn: { flex: 1 },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    flex: 1,
  },
  label: { fontSize: 16 },
  checkbox: {
    width: 24, // Ensure consistent checkbox size
  },
  formAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
    opacity: 0.6,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
  },
  cardElevated: { elevation: 4 },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  generatedPassword: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginVertical: 2,
  },
});

export default SchemaValidation;