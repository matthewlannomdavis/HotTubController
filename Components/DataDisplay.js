'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import stylesheet from './Styles';
const dStyles = stylesheet.styles;
//reading api's keys
const data_api_key = '';
const target_api_key = '';
//reading data url's
const data_directory_URL = '';
const target_directory_URL = '';

//for sending up target data
const api_key = '';
const directory_URL = '';

export default class DataDisplay extends Component{

  state = {
    thingData:[],
    targetData:[],
    currentTemp: 0.00,
    freshnessLevel: 0,
    refreshing: false,
    targetTemp:'?',
    temp: '00.0',
    jets: '0',
    light:'0' ,
    coldBlower:'0',
    hotBlower:'0',
    firstRun:true,
    editTargetTemp:false,
    dirtyData:false,
  };
  //updates state's varibles that are used the buttons
  updateInnerInformation(){
      if(this.state.thingData){
        if(this.state.thingData.length !== 0){ 
          this.setState({
            firstRun:false,
            jets: this.state.thingData['feeds'][1]['field3'],
            light: this.state.thingData['feeds'][1]['field4'],
            coldBlower: this.state.thingData['feeds'][1]['field5'],
            hotBlower: this.state.thingData['feeds'][1]['field6'],
          });

        }
        if(this.state.targetData){
          if(this.state.targetData.length !== 0)
          this.setState({targetTemp:(Math.round(100*this.state.targetData['feeds'][1]['field1'])/100).toString()});
        }
      }
  }
  componentDidMount(){
    this.timer = setInterval(() => this.compileOnInterval(), 30000);//sets up a interval that will push the information every 30secs
    this.getThingData();
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  //The following functions are used in controling the data that will be sent up to
  //thing speak

  //sets condition true so the target temp can be updated
  editTargetTempState(){
    this.setState({editTargetTemp:true});
  }
  //return a text component when not editing target temp 
  makeTargetTempEditable(){
    console.log(this.state.editTargetTemp);
    if(this.state.editTargetTemp === false){
      return(
      <Text style={dStyles.tempInput}>{this.state.targetTemp}</Text>
      );
    }else if(this.state.editTargetTemp === true){
      //TODO:Set editTargetTemp to false once user/system submits the data
      return(        
      <TextInput
        style={dStyles.tempInput}
        editable={true}
        maxLength={5}
        autoFocus={true}
        keyboardType={'numeric'}
        onChangeText={(text) => this.setState({targetTemp:text, dirtyFlag:false})}
        value={this.state.targetTemp}
        />)
        ;
    }
  }
  changeJetsState(){
    if(this.state.jets === '0'){
      this.setState({jets:'1', dirtyFlag:false});
    }else{
      this.setState({jets:'0', dirtyFlag:false});
    }
  }
  changelightsState(){
    if(this.state.light === '0'){
      this.setState({light:'1', dirtyFlag:false});
    }else{
      this.setState({light:'0', dirtyFlag:false});
    }
  }
  changeColdBlowerState(){
    if(this.state.coldBlower === '0'){
      this.setState({coldBlower:'1', dirtyFlag:false});
    }else{
      this.setState({coldBlower:'0', dirtyFlag:false});
    }
  }
  changeHotBlowerState(){
    if(this.state.hotBlower === '0'){
      this.setState({hotBlower:'1', dirtyFlag:false});
    }else{
      this.setState({hotBlower:'0', dirtyFlag:false});
    }
  }
  //this area handles uploading the control information
compileInfo(){
  var theInformation =
  directory_URL + api_key +
  '&field1='+this.state.temp+
  '&field2='+this.state.jets+
  '&field3='+this.state.light+
  '&field4='+this.state.coldBlower+
  '&field5='+this.state.hotBlower;
  console.log(theInformation);
  this.updateThingData(theInformation);

}//end of compileInfo func
async compileOnInterval(){
 if(this.state.dirtyData === true){ 
  var theInformation =
  directory_URL + api_key +
  '&field1='+this.state.temp+
  '&field2='+this.state.jets+
  '&field3='+this.state.light+
  '&field4='+this.state.coldBlower+
  '&field5='+this.state.hotBlower;
  console.log('complie on interval called');
  this.updateThingData(theInformation);
 }else{
   console.log('interval called');
 }
}

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
  this.setState({dirtyData: false});
}//end of updateThingData Func
//end of updating the channels



displayFields(){
  var jets = 'OFF';
  var light = 'OFF';
  var coldBlower= 'OFF';
  var hotBlower = 'OFF';
  var targetTemp = '?';
  var heater = 'OFF';
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
        
        <View style={dStyles.fieldContainer}>
            <View style={dStyles.fieldContainer}>
              <Text style={stylesheet.styles.baseText}>Heater </Text>
              <Text style={stylesheet.styles.fieldText}>{heater} </Text>
            </View>
        </View>
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

  //end of control functions
  showFreshness(){
  //returns a text compontent depending on how old the reading is from
  //the current time given by the device.
    var timeDifference = 0;
    if(this.state.thingData){
      if(this.state.thingData.length !== 0){
        var capturedTime = new Date(this.state.thingData['feeds'][1]['created_at']);
        var currentTime = new Date();
        console.log('current time is :' + currentTime.getTime());
        console.log('capturedTime is :' + capturedTime.getTime());
        console.log(((currentTime.getTime() - capturedTime.getTime())/1000)/60);

        //if the hour range is the same then no minute smoothing is needed
        if(capturedTime.getHours() === currentTime.getHours()){
          //get the difference in minutes
          timeDifference = currentTime.getMinutes() - capturedTime.getMinutes();
          if(timeDifference < 2){
            //return fresh statement if difference is under 2 minutes
                return(
                  <Text style={stylesheet.styles.freshText}>
                  Fresh{'\n' +this.state.thingData['feeds'][1]['field7']}
                  </Text>
                );

              }else if(timeDifference >= 2 && timeDifference <= 10){
                //return that the reading is stale if longer then two Minutes
                //but shorter then ten
                    return(<Text style={stylesheet.styles.staleText}>
                      Getting Stale{'\n' +this.state.thingData['feeds'][1]['field7']}
                      </Text>);


              }else if(timeDifference > 10){
                    return(<Text style={stylesheet.styles.rottenText}>
                      Spoiled Reading{'\n' +this.state.thingData['feeds'][1]['field7']}
                      </Text>);
                  }
        }else if(capturedTime.getHours() !== currentTime.getHours()){
          //if not in the same hour range
          if(capturedTime.getHours() < currentTime.getHours()){
             timeDifference = ((currentTime.getHours() - capturedTime.getHours()) * 60)
            + currentTime.getMinutes();
            var a = timeDifference
            timeDifference = a - capturedTime.getMinutes();

            if(timeDifference < 2){
              //return fresh statement if difference is under 2 minutes
                  return(<Text style={stylesheet.styles.freshText}>
                    Fresh{'\n' +this.state.thingData['feeds'][1]['field7']}
                    </Text>
                  );

                }else if(timeDifference >= 2 && timeDifference <= 10){
                  //return that the reading is stale if longer then two Minutes
                  //but shorter then ten
                      return(<Text style={stylesheet.styles.staleText}>
                        Getting Stale
                        </Text>);


                }else if(timeDifference > 10){
                      return(<Text style={stylesheet.styles.rottenText}>
                        Spoiled Reading{'\n' +this.state.thingData['feeds'][1]['field7']}
                        </Text>);
                    }

          }else if(capturedTime.getHours() > currentTime.getHours()){
            return(<Text style={stylesheet.styles.rottenText}>
              Possible day old reading!{'\n' +this.state.thingData['feeds'][1]['field7']}
              </Text>);
          }
        }
    }else{
      return(<Text style={stylesheet.styles.baseText}>unknown</Text>);
      }
    }else{
      return(<Text style={stylesheet.styles.baseText}>unknown</Text>);
    }
  }//end of showFreshness func

  getThingData() {
    fetch(data_directory_URL + data_api_key +'&results=2',{
      method: 'GET',
      headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
  },
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({thingData: responseJson}))
    .catch((error) => {
      console.error(error);
    }).done();
    //fetch for target data
    fetch(target_directory_URL + target_api_key + '&results=2',{
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => this.setState({targetData: responseJson}))
    .catch((error) => {
      console.error(error);
    }).done();
    if(this.state.firstRun === true){
      this.updateInnerInformation();
    }
  }
  
 displayGraph(){

 }

displayCurrentTemp(){
  if(this.state.thingData){
    if(this.state.thingData.length !== 0){
    var temp = Math.round(100*this.state.thingData['feeds'][1]['field1'])/100;
    return (temp);
    }
  }else{
    console.log('thingData is null or empty');
    return('0.00');
  }
}

_onRefreash = () => {
  console.log('onRefresh called');
  this.setState({refreshing: true});
  fetch(data_directory_URL + data_api_key +'&results=2',{
    method: 'GET',
    headers: {
   Accept: 'application/json',
   'Content-Type': 'application/json',
},
  })
  .then((response) => response.json())
  .then((responseJson) => this.setState({thingData: responseJson, refreshing: false}))
  .catch((error) => {
    console.error(error);
  }).done();

  //get target information
  fetch(target_directory_URL + target_api_key + '&results=2',{
    method: 'GET',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => this.setState({targetData: responseJson}))
  .catch((error) => {
    console.error(error);
  }).done();

  //update inner information
  this.updateInnerInformation();


}

getTimeStamp(){
  if(this.state.thingData){
    if(this.state.thingData.length !== 0){
    var timeStamp = new Date(this.state.thingData['feeds'][1]['created_at']);
    var timeString = timeStamp.getMonth() + 1;

    timeString = timeString + '/' + timeStamp.getDate()
    + '  ' + timeStamp.getHours() + ':' + timeStamp.getMinutes();

    return (timeString);
    }
  }else{
    console.log('thingData is null or empty');
    return('no information');
  }
}//end of getTimeStamp func

  render(){
    console.log(this.state.thingData);
    return(
      <View style={stylesheet.styles.base}>
        <ScrollView
        style={{flex:1, flexDirection:'column', }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefreash.bind(this)}

          />
        }>
          <View style={{alignItems:'center', marginBottom:5,}}>
          <Text style={stylesheet.styles.baseText}>Hot Tub Controller</Text>
          <Text style={stylesheet.styles.tempText}>{this.displayCurrentTemp()} F</Text>
          <Text style={stylesheet.styles.baseText}>{this.getTimeStamp()}</Text>
          {this.showFreshness()}
          </View>
          {this.displayGraph()}
          {this.displayFields()}
        </ScrollView>

      </View>
    );
  }
}
