import React, { Component } from "react";
import { View, Animated, PanResponder, StyleSheet } from "react-native";

class Bounce extends Component {
  boucingDistance = 1.2;
  friction = 1;
  duration = 150;

  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now

        Animated.timing(this.state.scale, {
          toValue: this.boucingDistance,
          friction: this.friction,
          duration: this.duration
        }).start;
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }
  render() {
    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                scale: this.state.scale
              }
            ]
          }
        ]}
      >
        <View {...this._panResponder.panHandlers} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 50
  }
});

export default Bounce;
