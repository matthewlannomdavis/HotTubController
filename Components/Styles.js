import { Dimensions, StyleSheet } from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  base:{
    flex:1,

    backgroundColor: 'black',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  tempInput:{
    backgroundColor:'white',
    borderRadius:3,
    borderColor:'white',
    borderWidth:3,
    fontSize:screen.height / 25,
    width:screen.width / 4,
  },
  outerView:{
    alignItems:'stretch',
    flex:1,
    flexDirection:'column'
  },
  controlComplex:{
    flex:3,
    flexDirection:'column',
    alignItems:'stretch',
  },
  switchButton:{
    backgroundColor:'white',
    fontSize: screen.height / 20,
  },
  switchFields:{
    flex:1,
    flexDirection:'row',
    alignItems:'stretch',
    margin:4,
  },
  fieldContainer:{
    alignItems:'stretch',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'purple',
    padding:3,
    flexWrap:'wrap',
    flex:1,
    flexDirection:'row',
    minWidth: 72,
    minHeight: 52,
  },
  tempText:{
    color: '#38ADFA',
    fontSize: screen.height / 8
  },
  tempTextHot:{
    color: 'yellow',
    fontSize: screen.height / 8
  },
  tempTextTooHot:{
    color:'red',
    fontSize: screen.height / 8
  },
  baseText:{
    color: '#38ADFA',
    fontSize: screen.height / 20,
    alignItems: 'center',
  },
  fieldText:{
  color: '#38ADFA',
  fontSize: screen.height / 26,
},
  freshText:{
    color: '#44FF52',
    fontSize: screen.height / 20,
    justifyContent: 'center',
    textAlign:'center'
  },
  staleText:{
    color: '#F0FF01',
    fontSize: screen.height / 20,
    justifyContent: 'center',
    textAlign:'center'
  },
  rottenText:{
    color: '#FF0101',
    fontSize: screen.height / 20,
    justifyContent: 'center',
    textAlign:'center'
  }

});


module.exports = { styles };
