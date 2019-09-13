/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  ViroBox,
  ViroMaterials
} from 'react-native';

import {
  ViroARSceneNavigator,
  ViroARScene
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"41E7240D-E96E-4C8D-BF56-13ADE3D4F4E5"
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

var AR_NAVIGATOR_TYPE = "AR";


// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      sharedProps : sharedProps,
      viroAppProps: {objectIndex:0, showObject:false}
    }
    // this._getARNavigator = this._getARNavigator.bind(this);
  }
  selectEmoji = () => {
    Alert.alert(
        'Pick an emoji',
        'Select an emoji to place in the world!',
        [
          {text: 'Smiley', onPress: () => this.onShowObject(0, "smile_emoji", 0)},
          {text: 'Wow', onPress: () => this.onShowObject(1, "wow_emoji", .290760)},
          {text: 'Poop', onPress: () => this.onShowObject(2, "poop_emoji", .497823)},
        ],
    );
  }
  onShowObject = (objIndex, objUniqueName, yOffset) => {
    this.setState({viroAppProps: {
        objectIndex: objIndex,
        showObject:true
    }})
  }
  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return (
        <View style={localStyles.outer}>
            <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{scene: InitialARScene}} viroAppProps={this.state.viroAppProps} />
            <View style={localStyles.navBar}>
                <TouchableOpacity>
                    <Text style={localStyles.titleText} onPress={this.selectEmoji} >
                        Pick an Emoji!
                     </Text>
                </TouchableOpacity>
            </View>
        </View>
      );
  }

}
  // Returns the ViroARSceneNavigator which will start the AR experience
//   _getARNavigator() {
//     return 
//   }
// }
  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons

  // This function "exits" Viro by setting the navigatorType to UNSET.


const localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
