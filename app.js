import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from './src/Login';
import TabOne from './src/Wishlist/TabOne';
import TabTwo from './src/Wishlist/TabTwo';
import TabThree from './src/Wishlist/TabThree';

const LoginNavigation = StackNavigator(
	{
		LoginNav: { screen: Login }
	},
	{
		headerMode: 'none'
	}
);

const WishlistNavigator = TabNavigator({
	TabOne: { screen: TabOne },
	TabTwo: { screen: TabTwo },
	TabThree: { screen: TabThree }
});

const AppNavigation = StackNavigator({
	Login: {
		screen: LoginNavigation
	},
	Wishlist: {
		screen: WishlistNavigator,
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#ff7043'
			},
			headerLeft: null,
			headerRight: (
				<View style={{ flexDirection: 'row' }}>
					<Icon name="edit" color="#ffffff" style={{ paddingHorizontal: 20 }} />
				</View>
			)
		})
	}
});

export default class App extends Component {
	render() {
		return <AppNavigation />;
	}
}
