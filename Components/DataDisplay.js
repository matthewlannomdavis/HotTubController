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
} from 'react-native';
import stylesheet from './Styles';
const dStyles = stylesheet.styles;
const data_api_key = '';
const target_api_key = '';
const data_directory_URL = '';
const target_directory_URL = '';
export default class DataDisplay extends Component{

  state = {
    thingData:[],
    targetData:[],
    currentTemp: 0.00,
    freshnessLevel: 0,
    refreshing: false,
  };

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

  componentDidMount(){
    this.getThingData();
  }

  getTargetData(){
    fetch('',{
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
  }

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

displayFields(){
  var targetTemp = '?';
  var heater = 'OFF';
  var jets = 'OFF';
  var light = 'OFF';
  var coldBlower= 'OFF';
  var hotBlower = 'OFF';
  //check to see whats on
  if(this.state.thingData){
    console.log(this.state.thingData);
    if(this.state.thingData.length !== 0){
      if(this.state.thingData['feeds'][1]['field3'] === '1'){
        jets = 'ON';
      }
      if(this.state.thingData['feeds'][1]['field4'] === '1'){
        light = 'ON';
      }
      if(this.state.thingData['feeds'][1]['field2'] === '1'){
        heater = 'ON';
      }
      if(this.state.thingData['feeds'][1]['field5'] === '1'){
        coldBlower ='ON';
      }
      if(this.state.thingData['feeds'][1]['field6'] === '1'){
        hotBlower ='ON';
      }
    }
    if(this.state.targetData){
      if(this.state.targetData.length !== 0){
      targetTemp = (Math.round(100*this.state.targetData['feeds'][1]['field1'])/100).toString()
      }
    }
  }//end of configuring what is on and off


  return(
    <View style={dStyles.controlComplex}>
      <View style={stylesheet.styles.switchFields}>
        <View style={dStyles.fieldContainer}>
          <Text style={stylesheet.styles.fieldText}>Heater </Text>
          <Text style={stylesheet.styles.fieldText}>{heater} </Text>
        </View>
        <View style={dStyles.fieldContainer}>
          <Text style={stylesheet.styles.fieldText}>Target Tempature: {targetTemp} </Text>
        </View>
        <View style={stylesheet.styles.fieldContainer}>
          <Text style={stylesheet.styles.fieldText}>Hot Blower </Text>
          <Text style={stylesheet.styles.fieldText}>{hotBlower}</Text>
        </View>
      </View>
      <View style={stylesheet.styles.switchFields}>
      <View style={dStyles.fieldContainer}>
          <Text style={stylesheet.styles.fieldText}>Jets </Text>
          <Text style={stylesheet.styles.fieldText}>{jets} </Text>
        </View>
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
}//end of displayFields func

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
          <Text style={stylesheet.styles.baseText}>Hot Tub Skipper</Text>
          <Text style={stylesheet.styles.tempText}>{this.displayCurrentTemp()} F</Text>
          <Text style={stylesheet.styles.baseText}>{this.getTimeStamp()}</Text>
          {this.showFreshness()}
          </View>
          {this.displayGraph()}
          {this.displayFields()}
          <View style={{borderRadius:3, borderWidth:2, borderColor:'white',marginTop:50}}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Control', {thingData: this.state.thingData, targetData: this.state.targetData});
              }}
            title="Control Page"
          />
          </View>
        </ScrollView>

      </View>
    );
  }
}
