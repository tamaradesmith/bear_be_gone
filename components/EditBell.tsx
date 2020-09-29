import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

export interface Props {
  sound: {name: string; file: string};
  hidden: boolean;
  interval: number;
  playbackType: string;
  changeInterval: Function;
  buttonPress: Function;
  selectNewBell: Function;
  selectPlaybackType: Function;
}

const EditBell: React.FC<Props> = (props) => {
  const {
    sound,
    interval,
    buttonPress,
    playbackType,
    hidden,
    changeInterval,
    selectNewBell,
    selectPlaybackType,
  } = props;

  const [value, setValue] = useState(interval);

  const handleButtonPress = (action: string) => {
    buttonPress(action);
  };

  const changeInteral = (direction: string) => {
    changeInterval(direction);
  };

  const handleSelectBell = () => {
    selectNewBell();
  };

  const handlePlaybackType = (playback: string) => {
    selectPlaybackType(playback);
  };

  useEffect(() => {
    setValue(interval);
  }, [interval]);

  return (
    <View style={hidden ? styles.hidden : styles.editView}>
      <ScrollView>
        <Text style={styles.selectHeader}>Edit Bell Preference </Text>

        <Text style={styles.selectTextHeader}>Current Bell:</Text>
        <TouchableOpacity
          onPress={handleSelectBell}
          style={styles.buttonSelectView}>
          <Text style={styles.selectText}> {sound.name} </Text>
          <View style={styles.buttonSelect}>
            <Text style={styles.buttonSelectText}> Change Bell</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.selectTextHeader}> Intervals Length/Sec:</Text>
        <View style={styles.numberInputView}>
          <TextInput
            keyboardType="numeric"
            value={`${value}`}
            style={styles.numberInput}
          />
          <TouchableOpacity onPress={() => changeInteral('add')}>
            <Text style={styles.upButton}>&#8607;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeInteral('mins')}>
            <Text style={styles.downButton}>&#8609;</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.selectTextHeader}> Playback Type:</Text>
          <TouchableOpacity
            onPress={() => handlePlaybackType('single')}
            style={
              playbackType === 'single'
                ? styles.selectedSound
                : styles.notSelectedSound
            }>
            <Text
              style={
                playbackType === 'single'
                  ? styles.selectSoundText
                  : styles.selectText
              }>
              {' '}
              Single{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePlaybackType('continuous')}
            style={
              playbackType === 'continuous'
                ? styles.selectedSound
                : styles.notSelectedSound
            }>
            <Text
              style={
                playbackType === 'continuous'
                  ? styles.selectSoundText
                  : styles.selectText
              }>
              {' '}
              Continuous{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => handleButtonPress('save')}
            style={styles.buttonSave}>
            <Text style={styles.buttonSaveText}> Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress('cancel')}
            style={styles.buttonCancel}>
            <Text style={styles.buttonCancelText}> Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default EditBell;
