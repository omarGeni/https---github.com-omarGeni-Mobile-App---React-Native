import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder
} from "react-native"; // Task 1: Imports: You will need to import Modal, Button, and StyleSheet from react-native
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  postFavorite: (campsiteId) => postFavorite(campsiteId),
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
};

function RenderCampsite(props) {
  const { campsite } = props;

  const recognizeDrag = ({dx}) => (dx < -200) ? true : false;

  const view = React.createRef();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current.rubberBand(1000)
      .then(endState => console.log(endState.finished ? 'finished' : 'canceled'))
    },
    onPanResponderEnd: (e, gestrureState) => {
      console.log('pan responder end', gestrureState);
      if(recognizeDrag(gestrureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add' + campsite.name + ' to favorite?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => console.log('Cancel Pressed')
            },
            {
              text: 'OK',
              onPress: () => props.favorite?
                console.log('Already set as a favorite') : props.markFavorite()
            }
          ],
          {cancelable: false}
        )
      }
    }
  })


  if (campsite) {
    return (
      <Animatable.View 
      animation="fadeInDown" 
      duration={200} 
      delay={1000}
      ref={view}
      {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={campsite.name}
          image={{ uri: baseUrl + campsite.image }}
        >
          <Text style={{ margin: 10 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite()
              }
            />

            {/* Task 1: Adding Pencil Icon */}
            <Icon
              name={"pencil"}
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
          readonly
        />
        <Text style={{ fontSize: 12 }}>
          {` -- ${item.author}, ${item.date}`} Stars
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={200} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class CampsiteInfo extends Component {
  // Task 1: Adding state
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      //task 2: added state
      rating: 5,
      author: "",
      text: "",
    };
  }

  // Task 1:  Event handler adding toggle Modal
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(campsiteId) {
    this.props.postComment(
      campsiteId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      showModal: false,
      rating: 5,
      author: "",
      text: "",
    });
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  }

  static navigationOptions = {
    title: "Campsite Information",
  };

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId");
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />

        {/* Task 1: Adding Modal */}
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          {/* Task 1: Adding Modal Contents */}
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder={"Name"}
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              leftIconContainerStyle={{ padding: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}
            />
            <Input
              placeholder={"Comment"}
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              leftIconContainerStyle={{ padding: 10 }}
              onChangeText={(comment) => this.setState({ text: comment })}
              value={this.state.text}
            />
            <View style={{ margin: 10 }}>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(campsiteId);
                  this.resetForm();
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

// Task 1: creating stylesheets
const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },

  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);

// Missing tasks:

// Task1
// Pass event handler: You will now need to pass this event handler as one of the props from the CampsiteInfo component to the RenderCampsite component. Give the prop the name onShowModal and pass it like this:
// onShowModal={() => this.toggleModal()}
