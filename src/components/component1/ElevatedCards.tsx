import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

const ElevatedCards = () => {
  return (
    <View>
      <Text style={styles.headingText}>ElevatedCards</Text>
      <ScrollView style={styles.container} horizontal={true}>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>me</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>to</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Scroll</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>More</Text>
        </View>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>😁</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    padding: 8,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 5,
    margin: 8,
  },
  cardElevated: {  
    backgroundColor: '#cad5e2',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ElevatedCards;
