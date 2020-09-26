import React from 'react';
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
  inverval: number;
  changeInterval: Function;
  buttonPress: Function;
}

const EditBell: React.FC<Props> = (props) => {
  const {sound, inverval, buttonPress, hidden, changeInterval} = props;

  function handleButtonPress(action: string) {
    buttonPress(action);
  }

  function changeInteral(direction: string) {
    changeInterval(direction);
  }

  return (
    <View style={hidden ? styles.hidden : styles.editView}>
      <ScrollView>
        <Text style={styles.selectHeader}>Edit Bell Preference </Text>
        <Text style={styles.selectText}>Current Bell:</Text>
        <Text style={styles.selectText}> {sound.name} change sound</Text>
        <Text style={styles.selectText}> Intervals Length/Sec:</Text>
        <View style={styles.numberInputView}>
          <TextInput
            keyboardType="numeric"
            value={`${inverval}`}
            style={styles.numberInput}
          />
          <TouchableOpacity onPress={() => changeInteral('add')}>
            <Text style={styles.upButton}>&#8607;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeInteral('mins')}>
            <Text style={styles.downButton}>&#8609;</Text>
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
