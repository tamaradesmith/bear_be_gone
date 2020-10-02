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
  const [grey, setGrey] = useState(false);

  const [playing, setPlaying] = useState<Sound | undefined>(undefined);
  const [bellPlay, setBellPlay] = useState(false);
  const [continueBell, setContinueBell] = useState(false);

  const [currentBell, setCurrentBell] = useState({file: 'none', name: 'none'});
  const [newBellSound, setNewBellSound] = useState(PresentSound[0]);
  const [interval, setInterval] = useState(0);
  const [playbackType, setPlaybackType] = useState('continuous');

  // PLAY FUNCTIONS

  function playSound() {
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
    const bell = new Sound(
      currentBell.file,
      Sound.MAIN_BUNDLE,
      async (error) => {
        if (error) {
          console.error('Failed to load the sound: ', error);
          return;
        }
        setPlaying(bell);
        setBellPlay(true);
        setContinueBell(true);
      },
    );
  }

  function stopSound() {
    if (playing) {
      playing.stop();
      setBellPlay(false);
      setPlaying(undefined);
      setContinueBell(false);
    }
  }

  // CHANGE SOUND FILE

  function selectNewSound() {
    setHideSelect(hideSelect ? false : true);
    setGrey(!grey ? true : false);
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
    setGrey(false);
    setNewBellSound(currentBell);
  }

  async function handleSave() {
    try {
      await AsyncStorage.setItem('bell', JSON.stringify(newBellSound));
      setCurrentBell(newBellSound);
      setHideSelect(true);
      setGrey(false);
    } catch (error) {
      console.error('storage Data: ', error.message);
    }
  }

  // EDIT PREFERENCES

  function editSoundPreference() {
    setHideEdit(hideEdit ? false : true);
    setGrey(hideEdit ? true : false);
  }

  function handlePreference(action: string) {
    switch (action) {
      case 'save':
        savePreferences();
        break;
      case 'cancel':
        setHideEdit(true);
        setGrey(false);
        cancelPreferences();
        break;
      default:
        break;
    }
  }
  const selectPlaybackType = async (type: string) => {
    setPlaybackType(type);
  };
  async function savePreferences() {
    try {
      await AsyncStorage.setItem(
        'preferences',
        JSON.stringify({playbackType, interval}),
      );
      setHideEdit(true);
      setGrey(false);
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
      if (!preferences.playbackType) {
        preferences.playbackType = 'continuous';
      }
      setPlaybackType(preferences.playbackType);
      setInterval(preferences.interval);
    }
  }

  function changeInterval(direction: string) {
    let newValue;
    switch (direction) {
      case 'add':
        newValue = interval + 1;

        setInterval(newValue);
        break;
      case 'mins':
        newValue = interval - 1;
        setInterval(newValue);
        break;
      default:
        break;
    }
    return newValue;
  }

  const EditSelectNewBell = () => {
    setHideSelect(false);
  };

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
            preferences.playbackType = 'continuous';
          }
          setInterval(preferences.interval);
          setPlaybackType(preferences.playbackType);
        } else {
          setInterval(5);
          setPlaybackType('continuous');
        }
      }
    };
    getDefaultBell();
    return () => {
      isCancellled = true;
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const ring = () => {
      if (continueBell && playing) {
        playing.play((success) => {
          if (success) {
            if (continueBell) {
              timer = setTimeout(() => {
                ring();
              }, interval * 1000);
            } else {
              playing.stop();
            }
          } else {
            console.error();
            ('playback failed due to audio decoding errors');
            setContinueBell(false);
          }
        });
      }
    };
    if (continueBell) {
      ring();
    } else {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [continueBell, playing, interval]);

  return (
    <View>
      <View style={!grey ? styles.Home : styles.homeGrey}>
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
                playbackType === 'continuous' ? continuesPlaySound : playSound
              }
              disabled={bellPlay}>
              <Text style={styles.text}>
                {playbackType === 'continuous' ? (
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
        interval={interval}
        playbackType={playbackType}
        buttonPress={handlePreference}
        changeInterval={changeInterval}
        selectNewBell={EditSelectNewBell}
        selectPlaybackType={selectPlaybackType}
        select={hideSelect}
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
