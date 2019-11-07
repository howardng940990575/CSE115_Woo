import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox, ScrollView } from 'react-native';
import * as firebase from "firebase";
import Constants from 'expo';
import * as Calendar from 'expo-calendar';
import { initialEmail } from './Loading.js';
import CalendarPicker from 'react-native-calendar-picker';


export default class Schedule extends Component {

  queryState = { email: '', err: null}
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            events: "",
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
    }

    async loadEvents(date) {
        this.setState({ selectedStartDate: date })

        var newDate = date.toString().substr(0, date.toString().length - 18)
        var events = "\n";

        events = await firebase.firestore().collection("users").doc(initialEmail).collection("events").doc("appointment").collection("date").doc(newDate).collection("time").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                events += 'Patient name: ' + doc.data().name + ' At time ' + doc.data().time + '\n';
            });

            if (events === "\n" ) {
                events += "NO APPOINTMENTS FOUND";
            }

            return events

        }).catch(function(error) {
            console.log(error)
            console.log('No events found!')
        });

        return events
    }

    searchEmail(email) {
      firebase.firestore().collection("users").doc(email).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log("dada");
        });
      })
    }

    onDateChange(date) {
        this.loadEvents(date).then((res) => {
            this.setState({ events: res })
            console.log("is it printing here: " + res)
        })
        // console.log("The Events are: " + res)
    }
    render() {
        const { selectedStartDate } = this.state;
        const { events } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
        <View style={styles.container}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            //loadEvents={this.loadEvents}
          />  
          <View>
            <Text>Search for a specfic users appointments</Text>
            <TextInput 
              placeholder = "Enter a users email"
              onChangeText={email => this.setqueryState({ email })}
            /> 
            <Button
              //onPress = {this.searchEmail(this.queryState.email)}
              title="Get specfic user appointments"
            />
            <Text>SELECTED DATE: { startDate }</Text>
            <Text>Appointments: { this.state.events }</Text>
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#72C3C9',
    borderTopWidth: 15,
    borderColor: '#72C3C9',
  },
});