import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

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
  btn:{
    backgroundColor: 'red',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
      fontSize: 20,
  },
  status: {
      fontSize: 18,
      color: 'grey',
      marginBottom: '5%',
  },
  descriptionCart: {
      fontSize: 16,
      marginBottom: '10%',
      width:'75%',
  },
  orderDetails: {
    fontSize: 16,
    width:'75%',
},
  description: {
    fontSize: 16,
    marginBottom: '10%',
  },
  subTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '5%',
      marginBottom: '5%',
  },
  subTitleOrder: {
    fontSize: 22,
    fontWeight: 'bold',
    
},
  scrollViewContent: {
    alignSelf: "stretch",
  },
  scrollViewCart: {
    alignSelf: "stretch",
    height: '50%',
  },
  subTitleProduit: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',
},
subTitleCart: {
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
},
  subTitleRecherche: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5%',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: viewportWidth*0.5,
  },
  imageProduit: {
    width: '100%',
    height: viewportWidth*0.5,
    alignSelf: 'center',
  },
  imageReco: {
    width: '100%',
    height: viewportWidth*0.5,
    alignSelf: 'center',
    marginBottom: '10%',
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    // marginRight: 10,
  },
  cartItemImage: {
    width: '30%',
    height: '80%',
    marginRight: 10,
  },
  cartItemContainer:{
    width:'100%',
    padding:'5%',
    paddingTop: 0,
  },
  orderContainer:{
    width:'100%',
    paddingTop: 0,
  },
  cartItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  
  inputContainer: {
    marginTop:'5%',
    marginBottom:'10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1%',
  },
  inputLogin: {
    marginTop:'5%',
    marginBottom:'10%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1%',
  },
  btnContainer: {
    flexDirection: 'row',
    paddingLeft: '1%',
    paddingRight: '1%',
  },
  modalContainer: {
    padding: '5%',
  },
  searchContainer:{
    height: '10%',
    marginBottom: '3%',
  },
  cartCard:{
    flexDirection:'row',
    width: '100%',
    flex: 1,
  },
  orderMap:{
    flexDirection:'column',
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  cartSubCard:{
    flexDirection:'column',
    width:'70%',
  },
  layoutCart:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  spacer:{
    marginBottom:'5%',
  },
  cartSubCard2:{
    flexDirection:'column',
    width:'20%',
    justifyContent:'space-between',
  },
  loginContainer:{
    marginTop:'5%',
    
    flexDirection: 'column',
    justifyContent:'flex-start',
  },
  nbArticle: {
    fontSize: 18,
    color: 'grey',
    
},

});

export default styles;
