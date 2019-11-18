import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Button, TextInput, Image, Animated, TouchableOpacity, Dimensions, TouchableHighlight, YellowBox } from 'react-native';
import * as firebase from "firebase";

export default class MedicalRecords extends Component {
    constructor(props) {
        super(props);
        this.user = firebase.auth().currentUser
        this.docRef = firebase.firestore().collection("users").doc(this.user.email);
        this.records = firebase.firestore().collection("users").doc(this.user.email).collection("records")
        this.state = {
            data: null,
            userData: "",
            familyHistory: "",
            medicalHistory: "",
            medicationHistory: "",
            treatmentHistory: "",
        };
        this.getFamilyHistory = this.getFamilyHistory.bind(this)
        this.getMedicalHistory = this.getMedicalHistory.bind(this)
        this.getMedicationHistory = this.getMedicationHistory.bind(this)
        this.getTreatmentHistory = this.getTreatmentHistory.bind(this)
    }

    componentDidMount() {
        this.getUserData()
        this.getFamilyHistory()
        this.getMedicalHistory()
        this.getMedicationHistory()
        this.getTreatmentHistory()
    }

    getUserData() {
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({ data: data })
            } else {
                this.setState({ data: null })
                console.log('No such document')
            }
        }).catch((err) => {
            this.setState({ data: null })
            console.log('Error: ', err)
        })
    }

    async getFamilyHistory() {
        var history = ""
        history = await this.records.doc("Family Medical History").get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                var total = ""
                for(const key in data) {
                    total += key + ': ' + data[key] + '\n'
                }
                return total
            } else {
                console.log('No Family Medical History')
                return ""
            }
        }).catch((err) => {
            console.log('Error: ', err)
            return ""
        })
        this.setState({ familyHistory: history })
    }

    async getMedicalHistory() {
        var history = ""
        history = await this.records.doc("Medical History").get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                var total = ""
                for(const key in data) {
                    total += key + ': ' + data[key] + '\n'
                }
                return total
            } else {
                console.log('No Medical History')
                return ""
            }
        }).catch((err) => {
            console.log('Error: ', err)
            return ""
        })
        this.setState({ medicalHistory: history })
    }

    async getMedicationHistory() {
        var history = ""
        history = await this.records.doc("Medication History").get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                var total = ""
                for(const key in data) {
                    total += key + ': ' + data[key] + '\n'
                }
                return total
            } else {
                console.log('No Medication History')
                return ""
            }
        }).catch((err) => {
            console.log('Error: ', err)
            return ""
        })
        this.setState({ medicationHistory: history })
    }

    async getTreatmentHistory() {
        var history = ""
        history = await this.records.doc("Treatment History").get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                var total = ""
                for(const key in data) {
                    total += key + ': ' + data[key] + '\n'
                }
                return total
            } else {
                console.log('No Treatment History')
                return ""
            }
        }).catch((err) => {
            console.log('Error: ', err)
            return ""
        })
        this.setState({ treatmentHistory: history })
    }

    render() {
        if (this.state.data) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.records}>
                        <ScrollView style={styles.scroll}>
                            <Text style={styles.title}>Personal Information</Text>
                            <Text style={styles.subText}>{this.state.data.first + ' ' + this.state.data.last}</Text>
                            <Text style={styles.subText}>{this.state.data.email}</Text>
                            <Text style={styles.subText}>{this.state.data.gender}</Text>
                            <Text style={styles.subText}>{this.state.data.age}</Text>
                            <Text style={styles.subText}>{this.state.data.address}</Text>

                            <Text style={styles.title}>Medical History</Text>
                            <Text style={styles.subText}>{this.state.medicalHistory}</Text>

                            <Text style={styles.title}>Family Medical History</Text>
                            <Text style={styles.subText}>{this.state.familyHistory}</Text>

                            <Text style={styles.title}>Medication History</Text>
                            <Text style={styles.subText}>{this.state.medicationHistory}</Text>

                            <Text style={styles.title}>Treatment History</Text>
                            <Text style={styles.subText}>{this.state.treatmentHistory}</Text>

                            <Button onPress={() => { this.props.navigation.navigate('PatientHomepage') } } title='Go back' />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#72C3C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        marginLeft: 15,
        marginRight: 15

    },
    records: {
        width: '95%',
        height: '95%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    title: {
        paddingLeft: 15,
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    subText: {
        paddingLeft: 15,
        // paddingTop: 10,
        fontSize: 15,
        color: 'grey'
    },
});