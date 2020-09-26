import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Sound from 'react-native-sound';

import styles from '../styles/styles';

import SelectSound from './SelectSound';
import EditBell from './EditBell';

export interface Props {}

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

const Home: React.FC<Props> = () => {
  const [hideSelect, setHideSelect] = useState(true);
  const [hideEdit, setHideEdit] = useState(true);

  const [playing, setPlaying] = useState<Sound | undefined>(undefined);
  const [bellPlay, setBellPlay] = useState(false);
  const [currentBell, setCurrentBell] = useState({file: 'none', name: 'none'});
  const [newBellSound, setNewBellSound] = useState({
    name: 'Chinese Gong',
    file: 'chinese_gong_daniel_simon.mp3',
  });
  const [userPreference, setUserPreference] = useState<{
    interval: number;
    playbackType: string;
  }>({
    interval: 0,
    playbackType: 'multitude',
  });

  // PLAY FUNCTIONS

  function playSound() {
    console.log('bell');
    setBellPlay(true);
    const bell = new Sound(currentBell.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load the sound: ', error);
        return;
      }
      setPlaying(bell);
      bell.play((success) => {
        if (success) {
          setBellPlay(false);
          setPlaying(undefined);
        } else {
          console.error();
          ('playback failed due to audio decoding errors');
        }
      });
    });
  }

  function continuesPlaySound() {
    setBellPlay(true);
    const bell = new Sound(currentBell.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load the sound: ', error);
        return;
      }
      setPlaying(bell);

      console.log(bellPlay);
      bell.play((success) => {
        if (success) {
          playSoundAgain(bell, 1);
        } else {
          console.error();
          ('playback failed due to audio decoding errors');
        }
      });
    });
  }

  function playSoundAgain(bell: Sound, index: number) {
    setTimeout(() => {
      if (bellPlay || index < 2) {
        console.log('playing playing');
        bell.play();
        playSoundAgain(bell, index + 1);
      }
    }, userPreference.interval * 1000);
  }

  function stopSound() {
    if (playing) {
      playing.stop();
      setBellPlay(false);
      setPlaying(undefined);
    }
  }

  // CHANGE SOUND FILE

  function selectNewSound() {
    setHideSelect(hideSelect ? false : true);
  }

  function ListenToSound(newBell: {name: string; file: string}) {
    if (playing) {
      playing.stop();
    }
    setNewBellSound(newBell);
    const listenSound = new Sound(newBell.file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load the sound: ', error);
        return;
      }
      setPlaying(listenSound);
      listenSound.play((success) => {
        if (!success) {
          console.error('playback failed due to audio decoding errors');
        }
      });
    });
  }

  function buttonPress(action: string) {
    if (playing) {
      playing.stop();
      setPlaying(undefined);
    }
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

  // EDIT PREFERENCES

  function editSoundPreference() {
    setHideEdit(hideEdit ? false : true);
  }

  function handlePreference(action: string) {
    switch (action) {
      case 'save':
        savePreferences();
        break;
      case 'cancel':
        setHideEdit(true);
        cancelPreferences();
        break;
      default:
        break;
    }
  }

  async function savePreferences() {
    try {
      await AsyncStorage.setItem('preferences', JSON.stringify(userPreference));
      setHideEdit(true);
    } catch (error) {
      console.error('storage Data: ', error.message);
    }
  }

  async function cancelPreferences() {
    const getPreferences = await AsyncStorage.getItem('preferences');
    if (getPreferences) {
      const preferences = JSON.parse(getPreferences);
      if (!preferences.interval) {
        preferences.interval = 5;
      }
      setUserPreference(preferences);
    }
  }

  function changeInterval(direction: string) {
    const user = userPreference;
    switch (direction) {
      case 'add':
        const newValue = userPreference.interval + 1;
        user.interval = newValue;
        setUserPreference(user);
        break;
      case 'mins':
        const newValueMins = userPreference.interval - 1;
        user.interval = newValueMins;
        setUserPreference(user);
        break;
      default:
        break;
    }
  }

  // USE EFFECT

  useEffect(() => {
    let isCancellled: boolean = false;
    const getDefaultBell = async () => {
      const defaultBell = await AsyncStorage.getItem('bell');
      const getPreferences = await AsyncStorage.getItem('preferences');
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
        if (getPreferences) {
          const preferences = JSON.parse(getPreferences);
          if (!preferences.interval) {
            preferences.interval = 5;
          }
          if (!preferences.playbackType) {
            preferences.playbackType = 'multitude';
          }
          setUserPreference(preferences);
        } else {
          setUserPreference({interval: 5, playbackType: 'multitude'});
        }
      }
    };
    getDefaultBell();
    return () => {
      isCancellled = true;
    };
  }, []);

  useEffect(() => {
    console.log('BellPlay useEffect : ', bellPlay);
  }, [bellPlay]);

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
          {!bellPlay ? (
            <TouchableOpacity
              onPress={
                userPreference.playbackType === 'multitude'
                  ? continuesPlaySound
                  : playSound
              }
              disabled={bellPlay}>
              <Text style={styles.text}>
                {userPreference.playbackType === 'multitude' ? (
                  <>Continual Play Bell</>
                ) : (
                  <> Play Bell</>
                )}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={stopSound}>
              <Text style={styles.text}> Stop Bell</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={selectNewSound}>
            <Text style={styles.text}> Select Different Bell</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={editSoundPreference}>
            <Text style={styles.text}> Edit Bell</Text>
          </TouchableOpacity>
        </View>
      </View>

      <EditBell
        sound={currentBell}
        hidden={hideEdit}
        inverval={userPreference.interval}
        buttonPress={handlePreference}
        changeInterval={changeInterval}
      />

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
