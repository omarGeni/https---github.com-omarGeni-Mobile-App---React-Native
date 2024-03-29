import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Constants from 'expo-constants';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import  SafeAreaView  from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import {fetchCampsites, fetchComments, fetchPromotions, fetchPartners} from '../redux/ActionCreators';
import Reservation from './ReservationComponent'; 
import Favorites from './FavoritesComponent';

const mapDispatchToProps = {
  fetchCampsites,
  fetchComments,
  fetchPartners,
  fetchPromotions
};

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { 
      screen: Directory,
      navigationOptions: ({navigation}) => ({
        headerLeft: <Icon 
          name='list'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress = {() => navigation.toggleDrawer()}
          />
      }) 
    },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    initialRouteName: 'Directory',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
    },
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    initialRouteName: 'Contact',
    defaultNavigationOptions: ({navigation}) => ({ 
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: <Icon 
          name='address-card'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress = {() => navigation.toggleDrawer()}
          />
    })
  }
);


const ReservationNavigator = createStackNavigator(
  {
      Reservation: { screen: Reservation }
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          },
          headerLeft: <Icon
              name='tree'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
          />
      })
  }
);

const FavoritesNavigator = createStackNavigator(
  {
      Favorites: { screen: Favorites }
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          },
          headerLeft: <Icon
              name='heart'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
          />
      })
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    initialRouteName: 'About',
    defaultNavigationOptions: ({navigation}) => ({ 
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: <Icon 
          name='info-circle'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress = {() => navigation.toggleDrawer()}
          />
    })
  }
);

const HomeNavigator = createStackNavigator(
  {
      Home: { screen: Home }
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
          headerStyle: {
              backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          },
          headerLeft: <Icon
              name='home'
              type='font-awesome'
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
          />
      })
  }
);

const CustomDrawerContentComponent = props => (
  <ScrollView>
      <SafeAreaView 
          style={styles.container}
          forceInset={{top: 'always', horizontal: 'never'}}>
          <View style={styles.drawerHeader}>
              <View style={{flex: 1}}>
                  <Image source={require('./images/logo.png')} style={styles.drawerImage} />
              </View>
              <View style={{flex: 2}}>
                  <Text style={styles.drawerHeaderText}>NuCamp</Text>
              </View>
          </View>
          <DrawerItems {...props} />
      </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Home: { 
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({tinColor}) => (
          <Icon 
            name='home'
            type='font-awesome'
            size={24}
            color={tinColor}
          />
        )
      } 
    },
    Directory: { screen: DirectoryNavigator,
      navigationOptions: {
        drawerIcon: ({tinColor}) => (
          <Icon 
            name='list'
            type='font-awesome'
            size={24}
            color={tinColor}
          />
        )
      } 
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
          drawerLabel: 'Reserve Campsite',
          drawerIcon: ({tintColor}) => (
              <Icon
                  name='tree'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
              />
          )
      }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
        drawerLabel: 'My Favorites',
        drawerIcon: ({tintColor}) => (
            <Icon
                name='heart'
                type='font-awesome'
                size={24}
                color={tintColor}
            />
        )
    }
},
    About: { screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'Abour Us',
        drawerIcon: ({tinColor}) => (
          <Icon 
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tinColor}
          />
        )
      } 
    },
    Contact: { screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: 'Contact Us',
        drawerIcon: ({tinColor}) => (
          <Icon 
            name='address-card'
            type='font-awesome'
            size={24}
            color={tinColor}
          />
        )
      } 
    },
  },
  {
    drawerBackgroundColor: '#CEC8FF',
    contentComponent: CustomDrawerContentComponent
  }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPartners();
    this.props.fetchPromotions();

  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        }}
      >
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  drawerHeader: {
      backgroundColor: '#5637DD',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
  },
  drawerHeaderText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  },
  drawerImage: {
      margin: 10,
      height: 60,
      width: 60
  },
  stackIcon: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 24
  }
});

export default connect(null, mapDispatchToProps)(Main);
