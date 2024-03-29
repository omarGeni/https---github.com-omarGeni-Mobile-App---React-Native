// import React, {Component} from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import {Card} from 'react-native-elements';

// class Contact extends Component {

//     static navigationOptions = {
//         title: 'Contact Us'
//     }

//     render(){
//         return(
//             <ScrollView>
//                 <Card wrapperStyle={{margin: 20}}>
//                     <Text style={{textAlign: 'center', fontWeight:'bold', marginBottom: 10}}>Contact Information</Text>
//                     <Text  style={{marginBottom: 10}}>
//                             1 Nucamp Way {'\n'}
//                             Seattle, WA 98001 {'\n'}
//                             U.S.A.
//                     </Text>
//                     <Text>
//                             Phone: 1-206-555-1234 {'\n'}
//                             Email: campsites@nucamp.co
//                     </Text>
//                     {/* <Card.Title>HELLO WORLD</Card.Title>*/}
//                 </Card>
//             </ScrollView>
//         )
//     }
// }

// export default Contact;

import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: "Contact Us",
  };

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={200} delay={1000}>
          <Card title="Contact Information" wrapperStyle={{ margin: 20 }}>
            <Text>1 Nucamp Way</Text>
            <Text>Seattle, WA 98001</Text>
            <Text container style={{ marginBottom: 10 }}>
              U.S.A.
            </Text>
            <Text>Phone: 1-206-555-1234</Text>
            <Text>Email: campsites@nucamp.co</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
