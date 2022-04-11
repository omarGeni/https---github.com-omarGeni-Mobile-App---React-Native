import React, {Component} from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Card} from 'react-native-elements';



class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render(){
        return(
            <ScrollView>
                <Card wrapperStyle={{margin: 20}}>
                    <Text style={{textAlign: 'center', fontWeight:'bold', marginBottom: 10}}>Contact Information</Text>
                    <Text  style={{marginBottom: 10}}>
                            1 Nucamp Way {'\n'}
                            Seattle, WA 98001 {'\n'}
                            U.S.A.
                    </Text>
                    <Text>
                            Phone: 1-206-555-1234 {'\n'}
                            Email: campsites@nucamp.co
                    </Text>
                    {/* <Card.Title>HELLO WORLD</Card.Title>*/}
                </Card>
            </ScrollView>
        )
    }
}

export default Contact;