import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';

import Sound from 'react-native-sound';

export interface Props {
  // name: string;
  // enthusiasmLevel?: number;
}

const Home: React.FC<Props> = () => {
  // const [bellLength, setBellLength] = useState(0);
  const [bellDisable, setBellDisable] = useState(false);

  const bell = new Sound(
    'chinese_gong_daniel_simon.mp3',
    Sound.MAIN_BUNDLE,
    (error) => {
      if (error) {
        console.error('Failed to load the sound: ', error);
        return;
      }
      console.log(
        `duration: ${bell.getDuration()}, number of channels: ${bell.getNumberOfChannels()}`,
      );
      // setBellLength(bell.getDuration());
    },
  );

  function playSound() {
    setBellDisable(true);
    bell.play((success) => {
      if (success) {
        console.log('successfully finished playing');
        setBellDisable(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

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
        <TouchableOpacity onPress={playSound} disabled={bellDisable}>
          <Text style={styles.text}> Play Bell</Text>
        </TouchableOpacity>
        <Text style={styles.text}> Select Different Bell</Text>
        <Text style={styles.text}> Create Bell</Text>
      </View>
    </View>
  );
};

export default Home;
