import {
  View,
  Text,
  Linking,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ActionCard = () => {
  const openWebsite = (websiteLink: string) => {
    Linking.openURL(websiteLink);
  };
  return (
    <View>
      <Text style={styles.headingText}>Blog Card</Text>
      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.headingContainer}>
          <Text style={styles.headerText}>My Blog</Text>
        </View>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/14514985/pexels-photo-14514985.jpeg',
          }}
          style={styles.cardImage}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.contentText} numberOfLines={4}>
            Just like every year, I find myself reflecting on the past and
            setting goals for the future. This year, I am focusing on learning
            new technologies, improving my coding skills, and contributing to
            open source projects. I also plan to share my journey and
            experiences through regular blog posts, hoping to inspire and help
            others in the developer community.
          </Text>
        </View>
        <View style={styles.foterContainer}>
          <TouchableOpacity onPress={() => openWebsite('https://myblog.com')}>
            <Text style={styles.linkText}>Read more</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openWebsite('https://twitter.com/myprofile')}
          >
            <Text style={styles.linkText}>Follow me</Text>
          </TouchableOpacity>
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
  card: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  elevatedCard: {
    elevation: 4,
  },
  headingContainer: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 380,
    borderRadius: 8,
    marginTop: 8,
  },
  contentContainer: {
    marginTop: 8,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  foterContainer: {
    padding: 8,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginTop: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    // textDecorationLine: 'underline',
  },
});

export default ActionCard;
