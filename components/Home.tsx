import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Sound from 'react-native-sound';

import styles from '../styles/styles';

import SelectSound from './SelectSound';

export interface Props {
  // name: string;
  // enthusiasmLevel?: number;
}

const Home: React.FC<Props> = () => {
  // const [bellLength, setBellLength] = useState(0);
  const [bellDisable, setBellDisable] = useState(false);
  const [hideSelect, setHideSelect] = useState(true);
  const [newBellSound, setNewBellSound] = useState({
    name: 'Chinese Gong',
    file: 'chinese_gong_daniel_simon.mp3',
  });
  const [currentBell, setCurrentBell] = useState({file: 'none', name: 'none'});

  const PresentSound: {file: string; name: string}[] = [
    {file: 'chinese_gong_daniel_simon.mp3', name: 'Chinese Gong'},
    {file: 'clock_chimes_daniel_simon.mp3', name: 'Clock Chimes'},
    {
      file: 'old_fashioned_school_bell_daniel_simon.mp3',
      name: 'Old Fashioned School Bell',
    },
    {file: 'ship_bell_mike_koenig.mp3', name: 'Ship Bell'},
    {file: 'sleigh_bells_ringing.mp3', name: 'Sleigh Bells'},
    {file: 'tolling_bell_daniel_simion.mp3', name: 'Tolling Bell'},
    {file: 'two_tone_doorbell.mp3', name: 'Two Tone Doorbell'},
  ];

  function playSound() {
    console.log('start');
    setBellDisable(true);

    const bell = new Sound(currentBell.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load the sound: ', error);
        return;
      }
      console.log(
        `duration: ${bell.getDuration()}, number of channels: ${bell.getNumberOfChannels()}`,
      );
      // setBellLength(bell.getDuration());
      bell.play((success) => {
        if (success) {
          setBellDisable(false);
          console.log('playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  function selectNewSound() {
    setHideSelect(hideSelect ? false : true);
  }

  function ListenToSound(newBell: {name: string; file: string}) {
    setNewBellSound(newBell);
    const listenSound = new Sound(newBell.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load the sound: ', error);
        return;
      }
      listenSound.play((success) => {
        if (!success) {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  function buttonPress(action: string) {
    switch (action) {
      case 'save':
        handleSave();
        break;
      case 'cancel':
        handleCancel();
        break;
      default:
        break;
    }
  }

  function handleCancel() {
    setHideSelect(true);
    setNewBellSound(currentBell);
  }

  async function handleSave() {
    try {
      await AsyncStorage.setItem('bell', JSON.stringify(newBellSound));
      setCurrentBell(newBellSound);
      setHideSelect(true);
    } catch (error) {
      console.error('storage Data: ', error.message);
    }
  }

  useEffect(() => {
    let isCancellled: boolean = false;
    const getDefaultBell = async () => {
      const defaultBell = await AsyncStorage.getItem('bell');
      if (!isCancellled) {
        if (defaultBell) {
          const newBell = JSON.parse(defaultBell);
          setNewBellSound(newBell);
          setCurrentBell(newBell);
        } else {
          const addSound = {
            file: 'chinese_gong_daniel_simon.mp3',
            name: 'Chinese Gong',
          };
          await AsyncStorage.setItem('bell', JSON.stringify(addSound));
          setCurrentBell(addSound);
          setNewBellSound(addSound);
        }
      }
    };
    getDefaultBell();
    return () => {
      isCancellled = true;
    };
  }, []);

  // useEffect(() => {
  //   console.log('currentBell.name ', currentBell.name);
  //   if (currentBell.name !== 'none') {
  //     loadDefaultSound();
  //   }
  // }, [currentBell]);

  return (
    <View>
      <View style={hideSelect ? styles.Home : styles.homeGrey}>
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
          <TouchableOpacity onPress={selectNewSound}>
            <Text style={styles.text}> Select Different Bell</Text>
          </TouchableOpacity>
          <Text style={styles.text}> Create Bell</Text>
        </View>
      </View>

      <SelectSound
        sounds={PresentSound}
        hidden={hideSelect}
        listenToSound={ListenToSound}
        currentBell={newBellSound}
        buttonPress={buttonPress}
      />
    </View>
  );
};

export default Home;
