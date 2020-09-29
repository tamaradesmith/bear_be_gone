import {StyleSheet} from 'react-native';

const mainColour: string = '#1E3424';
const secondaryColour: string = '#D7E8BA';
const background: string = '#FDF3EC';

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
    backgroundColor: '#979B97',
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
    backgroundColor: background,
  },
  selectHeader: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: mainColour,
  },
  selectText: {
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 10,
    color: mainColour,
  },
  selectTextHeader: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 10,
    color: mainColour,
  },
  selectedSound: {
    backgroundColor: mainColour,
  },
  notSelectedSound: {
    backgroundColor: background,
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
    backgroundColor: background,
  },
  numberInputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberInput: {
    borderBottomColor: mainColour,
    textAlign: 'center',
    color: mainColour,
    borderWidth: 2,
    width: 40,
    paddingVertical: 0,
  },
  downButton: {
    borderColor: mainColour,
    borderWidth: 1,
    fontSize: 25,
    backgroundColor: mainColour,
    color: secondaryColour,
    width: 40,
    textAlign: 'center',
  },
  upButton: {
    borderColor: mainColour,
    borderWidth: 1,
    fontSize: 25,
    backgroundColor: '#EDF5E0',
    color: mainColour,
    width: 40,
    textAlign: 'center',
  },
  buttonSelect: {
    borderWidth: 2,
    borderColor: mainColour,
    backgroundColor: mainColour,
    paddingHorizontal: 5,
    borderRadius: 6,
    width: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonSelectText: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    color: background,
  },
  buttonSelectView: {
    display: 'flex',
  },
});

export default styles;
