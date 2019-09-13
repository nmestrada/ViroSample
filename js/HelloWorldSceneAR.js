'use strict';

import React, { Component } from 'react';

import {StyleSheet, Alert, TouchableOpacity} from 'react-native';

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
  ViroAnimations,
  ViroButton
} from 'react-viro';

const objArray = [
    require('./res/emoji_smile/emoji_smile.vrx'),
    require('./res/emoji_wow/emoji_wow.vrx'),
    require('./res/emoji_poop/emoji_poop.vrx')];

export default class HelloWorldSceneAR extends Component {

  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      object: {displayObject:true, objectSource:require('./res/coffee_mug/object_coffee_mug.vrx'), x:0,y:0,z:0},
      selectedObject: objArray[this.props.sceneNavigator.viroAppProps.objectIndex],
      displayObject: this.props.showObject
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    const object = this.state.object;
    console.log(this.state.selectedObject)
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
                        source={object.objectSource}
                        position={[0, 0.5, -0.5]}
                        scale={[.2, .2, .2]}
                        onRotate={this._onRotate}
                        ref={component => (this._Viro3DObject = component)}
                        type="VRX" />
        </ViroNode>
        <ViroNode  visible={this.state.displayObject} position={[0,-1,0]} dragType="FixedDistanceOrigin" onDrag={()=>{}} >
            <Viro3DObject
                        ref={component => (this._emoji = component)}
                        source={this.state.selectedObject}
                        position={[-0.5, 0, -0.5]}
                        scale={[.2, .2, .2]}
                        type="VRX" />
        </ViroNode>
        <ViroARPlaneSelector>
            <ViroNode position={[0,-1,-1]} dragType="FixedToPlane" onDrag={()=>{}}>
            <ViroBox
                height={.5}
                length={.5}
                width={.5}
                materials={["grid"]} />
            </ViroNode>
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }


  setEmojiSource = (component) => {
    let emoji = this.state.selectedObject;
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
