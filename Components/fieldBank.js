import React, {Component} from 'react'
import {
  View,
  Text

} from 'react-native'
import stylesheet from './Styles';
const dStyles = stylesheet.styles;
import field from './infoField'

export default class fieldBank extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  render(){
    if(this.props.thingData){
          var heater = this.props.thingData['feeds'][1]['field2'];
          var jets = this.props.thingData['feeds'][1]['field3'];
          var light = this.props.thingData['feeds'][1]['field4'];
          var coldBlower= this.props.thingData['feeds'][1]['field5'];
          var hotBlower = this.props.thingData['feeds'][1]['field6'];
          //check to see whats on
        }//end of configuring what is on and off
        return(
          <View style={{flexDirection:'row', flex:1, alignItems:'stretch'}}>
            <View style={stylesheet.styles.switchFields}>
                <field fieldName='Heater' fieldState={this.props.thingData['feeds'][1]['field2']}  />
              <View style={dStyles.fieldContainer}>
                <field fieldName='Jets' fieldState={this.props.thingData['feeds'][1]['field3']} />
              </View>
              <View style={stylesheet.styles.fieldContainer}>
                <Text style={stylesheet.styles.fieldText}>Hot Blower </Text>
                <Text style={stylesheet.styles.fieldText}>{hotBlower}</Text>
              </View>
            </View>
            <View style={stylesheet.styles.switchFields}>
              <View style={dStyles.fieldContainer}>
                <Text style={stylesheet.styles.fieldText}>Lights </Text>
                <Text style={stylesheet.styles.fieldText}>{light} </Text>
              </View>
              <View style={dStyles.fieldContainer}>
                <Text style={stylesheet.styles.fieldText}>Cold Blower </Text>
                <Text style={stylesheet.styles.fieldText}>{coldBlower}</Text>
              </View>
            </View>
          </View>
        );
      }
    }
