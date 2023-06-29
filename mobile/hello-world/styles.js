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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
      fontSize: 20,
  },
  status: {
      fontSize: 18,
      color: 'grey',
  },
  description: {
      fontSize: 16,
  },
  subTitle: {
      fontSize: 22,
      fontWeight: 'bold',
  },
  scrollViewContent: {
    alignSelf: "stretch",
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
  },
  quantityInput: {
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 5,
  },
  deleteIcon: {
    fontSize: 24,
    color: 'red',
  },
  checkoutButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'brown',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
});

export default styles;
