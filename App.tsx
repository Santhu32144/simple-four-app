import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainCurrency from './src/components/component5/MainCurrnecy';

// import Blog_1 from './src/app/1_Blog';
// import Schema from './src/app/2_SchemaValidation';
// import SchemaValidation from './src/components/component2/schema-Validation';
// import BgChanger from './src/components/component3/bgchanger';
// import RollTheDice from './src/components/component4/RollTheDice';

const App = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {/* 1. Simple Blog UI */}
          {/* <Blog_1/> */}

          {/* 2. Schema Validation */}
          {/* <SchemaValidation /> */}
        </ScrollView>

        {/* 5. Currency Converter */}

      </SafeAreaView>
        <MainCurrency />

      {/* 4. Roll The Dice */}
      {/* <RollTheDice /> */}
      {/* 3. Background Color Changer */}
      {/* <BgChanger /> */}
    </>
  );
};

export default App;
