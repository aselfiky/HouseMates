// Added delete button and alert prompt.

import React, { Component } from "react";
import {Text, View, StyleSheet} from "react-native";
import {Card, CardItem, Thumbnail, Left, Right, Button, Icon} from 'native-base';
import firebase from 'firebase';
import {
    getFirstName,
    deleteTask
} from '../components/DatabaseAPI';
/**
 * class CardComponent
 * Sets the layout for the cards utilized in HouseholdScreen.js
 * TODO: Much of this screen is non-functional. Needs attention.
 * TODO: (Search Bar, Reminder alert, Add/Edit task, and others)
 */
export default class CardComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: '',
            name: this.props.name,
            desc: this.props.desc,
            cycle: this.props.cycle,
            reminder: this.props.reminder,
            deadline: this.props.deadline,
            task_id: this.props.task_id,
            imageSource: this.props.imageSource
        };
    }

    componentWillMount() {
        const { currentUser } = firebase.auth();

        getFirstName().once('value', (snapshot) => { this.setState({user : snapshot.val()}); });  
    }

    render() {
        // TODO: images will need to change to the database list of thumbnails for user (if this feature is desired).
        // WARNING! Image path may need to be updated depending on directory hierarchy.
        const images = {
            "1": require('../assets/temp_thumbnail_1.png'),
            "2": require('../assets/temp_thumbnail_2.png'),
            "3": require('../assets/temp_thumbnail_3.png'),
            "4": require('../assets/temp_thumbnail_4.png')
        };

        return (
            <Card>
                <CardItem bordered button onPress={()=>alert("Edit Task!")}>
                    <Left>
                        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                            <Thumbnail source={images[this.state.imageSource]}/>
                            <Text style={{alignSelf: 'center'}}>
                                {this.state.user}
                            </Text>
                        </View>
                        <View style={{paddingLeft: 5}}>
                            <Text style={{fontWeight: 'bold'}}>
                                {this.state.name}
                            </Text>
                            <Text style={{}}>{this.state.desc}</Text>
                            <Text>{this.state.deadline}</Text>
                        </View>
                    </Left>
                    <Right>
                        <View style={{flexDirection: 'column'}}>
                            <Button style={styles.button} onPress={()=>{deleteTask(this.state.task_id); alert("Task deleted.")}}>
                                <Icon name='ios-trash' style={{color: 'white'}}/>
                            </Button>
                            <Button style={{backgroundColor: '#415180', marginTop: 5}} onPress={()=>alert("Reminder Sent!")}>
                                <Icon name='ios-notifications' style={{color: 'white'}}/>
                            </Button>
                        </View>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        backgroundColor: '#415180'
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_Button: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
    }
});