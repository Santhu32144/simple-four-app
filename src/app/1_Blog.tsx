import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlatCards from '../components/component1/FlatCards';
import ElevatedCards from '../components/component1/ElevatedCards';
import FancyCard from '../components/component1/FancyCard';
import ActionCard from '../components/component1/ActionCard';
import ContactList from '../components/component1/ContactList';

const Blog_1 = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatCards />
        <ElevatedCards />
        <FancyCard />
        <ActionCard />
        <ContactList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Blog_1;
