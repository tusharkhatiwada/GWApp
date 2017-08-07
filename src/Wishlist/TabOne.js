import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';

export default class TabOne extends Component {
	componentDidMount() {
		console.log('params: ', this.props.navigation.state.params.gusername);
	}
	_onGoogleSignOut = () => {
		GoogleSignin.signOut()
			.then(() => {
				const { navigate } = this.props.navigation;
				navigate('Login');
			})
			.catch(err => {
				if (Platform.OS === 'android') {
					ToastAndroid.showWithGravity(
						'Error on Sign Out, Please try again later.',
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM
					);
				}
			});
	};
	render() {
		const username = this.props.navigation.state.params.gusername;
		return (
			<View style={styles.container}>
				<Text>
					Welcome {username}
				</Text>
				<SocialIcon
					title="Sign Out"
					button
					type="google-plus-official"
					onPress={() => this._onGoogleSignOut()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		paddingHorizontal: 20
	}
});
