import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';

const ContactList = () => {
  const contacts = [
    {
      uid: 1,
      name: 'John Doe',
      status: 'Just an extra ordinary teacher',
      imageUrl: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg',
    },
    {
      uid: 2,
      name: 'Jane Smith',
      status: 'A passionate software engineer',
      imageUrl: 'https://images.pexels.com/photos/2647053/pexels-photo-2647053.jpeg',
    },
    {
      uid: 3,
      name: 'Alice Johnson',
      status: 'Lifelong learner and tech enthusiast',
      imageUrl: 'https://images.pexels.com/photos/31051251/pexels-photo-31051251.jpeg',
    },
    {
      uid: 4,
      name: 'David Wilson',
      status: 'Creative designer and artist',
      imageUrl: 'https://images.pexels.com/photos/14355838/pexels-photo-14355838.jpeg',
    },
  ];
  return (
    <View>
      <Text style={styles.headingText}>ContactList</Text>
      <ScrollView style={styles.container} scrollEnabled={false}>
        {contacts.map(contact => (
          <View key={contact.uid} style={styles.contactCard}>
            <Image source={{ uri: contact.imageUrl }} style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactStatus}>{contact.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  container: {
    paddingHorizontal: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 21,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactStatus: {
    fontSize: 14,
    color: '#666',
  },
});

export default ContactList;
