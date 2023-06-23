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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#BDA18A',
    padding: 35,
    paddingTop: 0,
    alignItems: 'flex-start',
    alignSelf: "stretch",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 20,
    color:'white',
  },
});

export default styles;
