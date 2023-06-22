import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
  menu: {
    flexDirection: 'row', 
    backgroundColor: '#BDA18A',
    alignSelf: "stretch",
    justifyContent: 'space-between',
    height: 80,
    paddingLeft: 10,  
    paddingRight: 10,
  },
  brand: {
    fontSize: 30,
    fontFamily: 'Cinzel-Bold',
    color: 'white',   
  },
  icons: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: 100, // ajustez la valeur en fonction de votre mise en page
  },
});

export default styles;
