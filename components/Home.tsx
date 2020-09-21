import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/styles';

export interface Props {
  // name: string;
  // enthusiasmLevel?: number;
}

const Home: React.FC<Props> = () => {
  return (
    <View style={styles.Home}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeHeaderText}> BEAR BE GONE</Text>
        <Image source={require('../images/bear.png')} style={styles.image} />
        <Text style={styles.homeHeaderText}>
          {' '}
          A bear bell for the tect savy hiker{' '}
        </Text>
      </View>

      <View style={styles.homeTextView}>
        <Text style={styles.text}> Play Bell</Text>
        <Text style={styles.text}> Select Different Bell</Text>
        <Text style={styles.text}> Create Bell</Text>
      </View>
    </View>
  );
};

export default Home;
