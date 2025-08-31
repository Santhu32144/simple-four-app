import React from 'react';
import type { JSX, PropsWithChildren } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  const { name, flag } = props;

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{flag}</Text>
      <Text style={styles.country}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  flag: {
    fontSize: 24,
  },
  country: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CurrencyButton;
