import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import type { JSX, PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import DiceOne from '../../assets/images/dice-six-faces-one.png';
import DiceTwo from '../../assets/images/dice-six-faces-two.png';
import DiceThree from '../../assets/images/dice-six-faces-three.png';
import DiceFour from '../../assets/images/dice-six-faces-four.png';
import DiceFive from '../../assets/images/dice-six-faces-five.png';
import DiceSix from '../../assets/images/dice-six-faces-six.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType;
}>;

const Dice = ({ imageUrl }: DiceProps): JSX.Element => {
  return (
    <View style={styles.diceContainer}>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  );
};

const RollTheDice = () => {
  const [DiceImage, setDiceImage] = React.useState<ImageSourcePropType>(DiceOne);
  const spinAnim = useRef(new Animated.Value(0)).current;

  const rollDiceOnTap = () => {
    // Trigger spin animation
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      spinAnim.setValue(0); // Reset animation
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      switch (randomNumber) {
        case 1:
          setDiceImage(DiceOne);
          break;
        case 2:
          setDiceImage(DiceTwo);
          break;
        case 3:
          setDiceImage(DiceThree);
          break;
        case 4:
          setDiceImage(DiceFour);
          break;
        case 5:
          setDiceImage(DiceFive);
          break;
        case 6:
          setDiceImage(DiceSix);
          break;
        default:
          setDiceImage(DiceOne);
          break;
      }
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roll the Dice</Text>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Dice imageUrl={DiceImage} />
      </Animated.View>
      <Pressable onPress={rollDiceOnTap} style={styles.button}>
        <Text style={styles.buttonText}>Roll Dice</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  diceContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  diceImage: {
    width: 120,
    height: 120,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RollTheDice;