'use strict';

import React, { Component } from 'react';

import {StyleSheet, Alert} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations
} from 'react-viro';


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      object: {displayObject:true, objectSource:require('./res/coffee_mug/object_coffee_mug.vrx'), x:0,y:0,z:0},
      rotation: [0,0,0]
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    const object = this.state.object;
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={20}
          direction={[0,1,0]}
          position={[0, 1, 0]}
          color="#ffffff"
          castsShadow={true}
          shadowNearZ={.1}
          shadowFarZ={6}
          shadowOpacity={.9}
          />
        <ViroNode position={[0,-1,0]} dragType="FixedDistanceOrigin" onDrag={()=>{}} >
            <Viro3DObject
                        source={this.state.object.objectSource}
                        position={[0, 0.5, -0.5]}
                        scale={[.2, .2, .2]}
                        onRotate={this._onRotate}
                        ref={VR => (this._Viro3DObject = VR)}
                        type="VRX" />
        </ViroNode>
        <ViroNode position={[0,-1,0]} dragType="FixedDistanceOrigin" onDrag={()=>{}} >
            <Viro3DObject
                        source={require('./res/emoji_poop/emoji_poop.vrx')}
                        position={[-0.5, 0, -0.5]}
                        scale={[.2, .2, .2]}
                        type="VRX" />
        </ViroNode>
      </ViroARScene>
    );
  }
  _setSpotLightRef(component) {
    this.spotLight = component;
  }

  _setARNodeRef(component) {
    this.arNodeRef = component;
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Welcome to Fullstack!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onRotate = (rotateState, rotationFactor, source) => {
    this._Viro3DObject.setNativeProps({
      rotation: [0, 0 + rotationFactor, 0]
    });
  };
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 25,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
    grid: {
      diffuseTexture: require('./res/grid_bg.jpg'),
    },
  });

  ViroAnimations.registerAnimations({
    rotate: {
      properties: {
        rotateY: "+=90"
      },
      duration: 250, //.25 seconds
    },
  });
module.exports = HelloWorldSceneAR;
