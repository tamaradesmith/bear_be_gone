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
});

export default styles;
