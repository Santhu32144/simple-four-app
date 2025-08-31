import { View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';

type TriangleProps = {
  color: string;
};

const Triangle: React.FC<TriangleProps> = ({ color }) => (
  <View style={[styles.triangle, { borderBottomColor: color }]}>
    <View style={[styles.triangleInner, { borderBottomColor: color }]} />
  </View>
);

const ShapeCollage = () => {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [shapesColor, setShapesColor] = useState({
    circle: '#ff0000',
    square: '#00ff00',
    triangle: '#0000ff',
  });

  const generateRandomColor = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleShapeClick = useCallback(() => {
    const newBgColor = generateRandomColor();
    setBgColor(newBgColor);
    setShapesColor({
      circle: generateRandomColor(),
      square: generateRandomColor(),
      triangle: generateRandomColor(),
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <TouchableOpacity onPress={handleShapeClick} activeOpacity={0.8}>
          <View style={styles.collage}>
            <View
              style={[styles.circle, { backgroundColor: shapesColor.circle }]}
            />
            <View
              style={[styles.square, { backgroundColor: shapesColor.square }]}
            />
            <Triangle color={shapesColor.triangle} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 5,
  },
  square: {
    width: 100,
    height: 100,
    elevation: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 87,
    transform: [{ rotate: '180deg' }],
    elevation: 5,
  },
  triangleInner: {
    position: 'absolute',
    top: 20,
    left: -50,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 87,
    borderBottomColor: 'transparent',
  },
});

export default ShapeCollage;
