import {StyleSheet} from 'react-native';

const mainColour: string = '#121F16';
// const secondaryColour: string = '#D7E8BA';
// const secondaryColour: string = '#4B7357';

const secondaryColour: string = '#ABDEBA';
const background: string = '#DAF0E1';

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: background,
  },

  image: {
    alignSelf: 'center',
  },
  Home: {
    minHeight: '100%',
    minWidth: '100%',
  },
  homeGrey: {
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0.5,
  },
  homeHeaderText: {
    fontSize: 30,
    textTransform: 'capitalize',
    textAlign: 'center',
    backgroundColor: mainColour,
    color: secondaryColour,
    paddingVertical: 10,
  },
  homeHeader: {
    backgroundColor: secondaryColour,
    width: '100%',
    display: 'flex',
  },
  homeTextView: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'flex-end',
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    color: mainColour,
  },
  selectView: {
    borderWidth: 2,
    borderColor: mainColour,
    width: '86%',
    margin: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
    left: 20,
    backgroundColor: secondaryColour,
  },
  selectHeader: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: mainColour,
  },
  selectText: {
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 10,
    color: mainColour,
  },
  selectedSound: {
    backgroundColor: mainColour,
  },
  notSelectedSound: {
    backgroundColor: secondaryColour,
  },
  selectSoundText: {
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 10,
    color: secondaryColour,
  },
  hidden: {
    display: 'none',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  buttonSave: {
    borderWidth: 2,
    borderColor: mainColour,
    backgroundColor: mainColour,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonSaveText: {
    fontSize: 20,
    color: secondaryColour,
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: mainColour,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonCancelText: {
    fontSize: 20,
    color: mainColour,
  },
  editView: {
    borderWidth: 2,
    borderColor: mainColour,
    width: '86%',
    margin: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: 40,
    left: 20,
    backgroundColor: secondaryColour,
  },
  numberInputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberInput: {
    borderBottomColor: mainColour,
    color: mainColour,
    borderWidth: 2,
    width: 40,
    paddingVertical: 0,
  },
  downButton: {
    borderColor: mainColour,
    fontSize: 25,
    backgroundColor: mainColour,
    color: secondaryColour,
    width: 40,
    textAlign: 'center',
  },
  upButton: {
    borderColor: mainColour,
    fontSize: 25,
    backgroundColor: 'red',
    color: secondaryColour,
    width: 40,
    textAlign: 'center',
  },
});

export default styles;
