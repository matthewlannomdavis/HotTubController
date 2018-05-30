import React, {Component} from 'react'
import {
  View,
  Text

} from 'react-native'
import stylesheet from './Styles';
const dStyles = stylesheet.styles;

export default class infoField extends React.Component{
  constructor(props){
    super(props);
    var fieldState = 'OFF';

    if(this.props.fieldState === '0'){
      fieldState = 'OFF';
    }else if(this.props.fieldState === '1'){
      fieldState = 'ON';
    }
    this.state ={ fieldState: fieldState };
  }

  componentDidMount(){

  }


  render(){
    return(
      <View style={dStyles.fieldContainer}>
        <Text style={dStyles.fieldText}>{this.props.fieldName}</Text>
        <Text style={dStyles.fieldText}>{this.state.fieldState}</Text>
      </View>
    );
  }
}
