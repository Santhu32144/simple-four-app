import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const FancyCard = () => {
  return (
    <View>
      <Text style={styles.headingText}>FancyCard</Text>
      <View style={[styles.card, styles.cardElevated]}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/784879/pexels-photo-784879.jpeg',
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Hawa Mahal</Text>
            <Text style={styles.cardLabel}>Palace of Winds</Text>
            <Text style={styles.cardDescription}>A beautiful palace located in Jaipur, India.</Text>
            <Text style={styles.cardFooter}>Built in 1799 </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  card: {},
  cardElevated: {},
  cardImage: {
    height: 200,
  },
  cardBody: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 14,
    color: 'gray',
  },
  cardDescription: {
    fontSize: 12,
    color: 'darkgray',
  },
  cardFooter: {
    fontSize: 10,
    color: 'lightgray',
  },
});

export default FancyCard;
