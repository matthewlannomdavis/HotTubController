import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import stylesheet from './Styles';
const dStyles = stylesheet.styles;
const api_key = '';
const directory_URL = '';
export default class ControlDisplay extends Component{
constructor(props){
  super(props);
  this.state ={
      targetTemp: (Math.round(100*this.props.navigation.state.params.targetData['feeds'][1]['field1'])/100).toString(),
      temp: (Math.round(100*this.props.navigation.state.params.thingData['feeds'][1]['field1'])/100).toString(),
      jets: this.props.navigation.state.params.thingData['feeds'][1]['field3'],
      light: this.props.navigation.state.params.thingData['feeds'][1]['field4'],
      coldBlower: this.props.navigation.state.params.thingData['feeds'][1]['field5'],
      hotBlower: this.props.navigation.state.params.thingData['feeds'][1]['field6'],
      editTargetTemp: false,
  };
  console.log(this.props.navigation.state.params.thingData);
}

state = {
 targetTemp: '00.0',
 temp: '00.0',
 jets: '0',
 light: '0',
 coldBlower: '0',
 hotBlower: '0',
 editTargetTemp: false,

};
componentDidUpdate(){
  console.log('component did update');
}
editTargetTempState(){
  this.setState({editTargetTemp:true});
}
makeTargetTempEditable(){
  console.log(this.state.editTargetTemp);
  if(this.state.editTargetTemp === false){
    return(
    <Text style={dStyles.tempInput}>{this.state.targetTemp}</Text>
    );
  }else if(this.state.editTargetTemp === true){
    return(        
    <TextInput
      style={dStyles.tempInput}
      editable={true}
      maxLength={5}
      autoFocus={true}
      keyboardType={'numeric'}
      onChangeText={(text) => this.setState({targetTemp:text})}
      value={this.state.targetTemp}
      />)
      ;
  }
}
changeJetsState(){
  if(this.state.jets === '0'){
    this.setState({jets:'1'});
  }else{
    this.setState({jets:'0'});
  }
}
changelightsState(){
  if(this.state.light === '0'){
    this.setState({light:'1'});
  }else{
    this.setState({light:'0'});
  }
}
changeColdBlowerState(){
  if(this.state.coldBlower === '0'){
    this.setState({coldBlower:'1'});
  }else{
    this.setState({coldBlower:'0'});
  }
}
changeHotBlowerState(){
  if(this.state.hotBlower === '0'){
    this.setState({hotBlower:'1'});
  }else{
    this.setState({hotBlower:'0'});
  }
}

//this area handles uploading the control information
compileInfo(){
  var theTime = new Date();
  var currentTime = theTime.getTime();
  var theInformation =
  directory_URL + api_key +
  '&field1='+this.state.temp+
  '&field2='+this.state.jets+
  '&field3='+this.state.light+
  '&field4='+this.state.coldBlower+
  '&field5='+this.state.hotBlower;
  console.log(theInformation);
  this.updateThingData(theInformation);
  this.props.navigation.pop()

}//end of compileInfo func

updateThingData(compliedInfo){
  var url = compliedInfo
  fetch(url,{
    method: 'GET',
    headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json',
},
  })
  .then((response) => console.log(response.json()))
  .catch((error) => {
    console.error(error);
  });
}//end of updateThingData Func
//end of updating the channels

displayFields(){
  var jets = 'OFF';
  var light = 'OFF';
  var coldBlower= 'OFF';
  var hotBlower = 'OFF';
  //check to see whats on
      if(this.state.jets === '1'){
        jets = 'ON';
      }else {
        jets = 'OFF';
      }
      if(this.state.light === '1'){
        light = 'ON';
      }else {
        light = 'OFF';
      }
      if(this.state.coldBlower === '1'){
        coldBlower ='ON';
      }else{
        coldBlower = 'OFF';
      }
      if(this.state.hotBlower === '1'){
        hotBlower ='ON';
      }else{
        hotBlower = 'OFF';
      }

//end of configuring what is on and off
  return(
    <View style={dStyles.controlComplex}>
      <View style={dStyles.switchFields}>
        <TouchableOpacity style={dStyles.fieldContainer} onPress={this.editTargetTempState.bind(this)}>
          <View style={dStyles.fieldContainer}>
          <Text style={stylesheet.styles.baseText}>Target Temp:</Text>
          {this.makeTargetTempEditable()}
          
          </View>
          </TouchableOpacity>

        <TouchableOpacity style={dStyles.fieldContainer} onPress={this.changeJetsState.bind(this)}>
        <View style={dStyles.fieldContainer}>
          <Text style={stylesheet.styles.baseText}>Jets</Text>
          <Text style={dStyles.switchButton}>{jets}</Text>
        </View>
        </TouchableOpacity>
      </View>
    <View style={dStyles.switchFields}>
    <TouchableOpacity style={stylesheet.styles.fieldContainer} onPress = {this.changelightsState.bind(this)}>
    <View style={dStyles.fieldContainer} >
      <Text style={stylesheet.styles.baseText}>Lights</Text>
      <Text style={dStyles.switchButton}>{light}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity style={stylesheet.styles.fieldContainer}  onPress = {this.changeColdBlowerState.bind(this)}>
    <View style={dStyles.fieldContainer} >
      <Text style={stylesheet.styles.baseText}>Cold Blower</Text>
      <Text style={dStyles.switchButton}>{coldBlower}</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity style={stylesheet.styles.fieldContainer} onPress={this.changeHotBlowerState.bind(this)}>
    <View style={dStyles.fieldContainer} >
      <Text style={stylesheet.styles.baseText}>Hot Blower</Text>
      <Text style={dStyles.switchButton}>{hotBlower}</Text>
      </View>
      </TouchableOpacity>
    </View>
    </View>
  );
}//end of displayFields func



render(){
  return(
    <View style={stylesheet.styles.base}>
      <View style={dStyles.outerView}>
        <View style={{flex:1}}>
          <Text style={dStyles.baseText}>Hot Tub Controller</Text>
        </View>
      {this.displayFields()}

      <View style={{flex:1, flexDirection:'row'}}>
      <Button
        onPress={this.compileInfo.bind(this)}
        title="Submit"
      />

      <Button
      onPress={() => {
          this.props.navigation.pop();
        }}
      title="Back"
      />
        </View>
      </View>
    </View>

    );
  }//end of render function
}//end of class
