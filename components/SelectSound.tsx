import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';

import styles from '../styles/styles';

export interface Props {
  sounds: {name: string; file: string}[];
  hidden: boolean;
  listenToSound: Function;
  currentBell: {name: string; file: string};
  buttonPress: Function;
}

const SelectSound: React.FC<Props> = (props) => {
  const {sounds, hidden, listenToSound, currentBell, buttonPress} = props;
  function handlePress(sound: {name: string; file: string}) {
    listenToSound(sound);
  }

  function handleButtonPress(action: string) {
    buttonPress(action);
  }

  return (
    <View style={hidden ? styles.hidden : styles.selectView}>
      <ScrollView>
        <Text style={styles.selectHeader}> Select A Bell</Text>
        {sounds.map((sound, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(sound)}
            style={
              currentBell.name === sound.name
                ? styles.selectedSound
                : styles.notSelectedSound
            }>
            <Text
              style={
                currentBell.name === sound.name
                  ? styles.selectSoundText
                  : styles.selectText
              }>
              {' '}
              {sound.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    </View>
  );
};

export default SelectSound;
