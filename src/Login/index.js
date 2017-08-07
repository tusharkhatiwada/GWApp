import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import FBSDK, {
	LoginManager,
	AccessToken,
	GraphRequest,
	GraphRequestManager
} from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class Login extends Component {
	static navigationOptions = {
		header: null
	};
	componentDidMount() {
		this._getFbInfo();
		this._getGoogleInfo();
	}
	_getGoogleInfo = () => {
		GoogleSignin.configure({
			iosClientId:
				'1091543632896-9qstchbs9ncrhs0pag291v70jdlvlqjk.apps.googleusercontent.com'
		}).then(() => {
			GoogleSignin.currentUserAsync()
				.then(user => {
					if (user) {
						const { navigate } = this.props.navigation;
						this.setState({
							gusername: user.name,
							guserImageUrl: user.photo,
							guserEmail: user.email
						});
						navigate('Wishlist', {
							gusername: user.name,
							guserImageUrl: user.photo,
							guserEmail: user.email
						});
					}
				})
				.done();
		});
	};
	_responseInfoCallback = (error, result) => {
		if (error) {
			console.log('Error');
		} else {
			const { navigate } = this.props.navigation;
			if (Platform.OS === 'android') {
				ToastAndroid.showWithGravity(
					'Login Success',
					ToastAndroid.LONG,
					ToastAndroid.BOTTOM
				);
			}
			this.setState({
				fbuser: JSON.stringify(result.name)
			});
			navigate('Wishlist', { fbuser: JSON.stringify(result.name) });
		}
	};
	_getFbInfo = () => {
		const infoRequest = new GraphRequest(
			'/me',
			null,
			this._responseInfoCallback
		);
		new GraphRequestManager().addRequest(infoRequest).start();
	};
	_onFbLogin = () => {
		// LoginManager.logOut();
		LoginManager.logInWithReadPermissions(['public_profile'])
			.then(result => {
				if (result.isCancelled) {
					if (Platform.OS === 'android') {
						ToastAndroid.showWithGravity(
							'Login Cancelled',
							ToastAndroid.LONG,
							ToastAndroid.BOTTOM
						);
					}
				} else {
					console.log('Result: ', result);
					if (Platform.OS === 'android') {
						ToastAndroid.showWithGravity(
							'Login Success',
							ToastAndroid.LONG,
							ToastAndroid.BOTTOM
						);
					}
				}
			})
			.catch(err => {
				if (Platform.OS === 'android') {
					ToastAndroid.showWithGravity(
						'Login failed',
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM
					);
				}
			});
	};
	_onGoogleLogin = e => {
		GoogleSignin.signIn()
			.then(user => {
				const { navigate } = this.props.navigation;
				if (Platform.OS === 'android') {
					ToastAndroid.showWithGravity(
						'Login Success',
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM
					);
				}
				this.setState({
					gusername: user.name,
					guserImageUrl: user.photo,
					guserEmail: user.email
				});
				navigate('Wishlist', {
					gusername: user.name,
					guserImageUrl: user.photo,
					guserEmail: user.email
				});
			})
			.catch(err => {
				if (Platform.OS === 'android') {
					ToastAndroid.showWithGravity(
						'WRONG SIGNIN',
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM
					);
				}
				console.log('WRONG SIGNIN', err);
			})
			.done();
	};
	render() {
		return (
			<View style={styles.container}>
				<SocialIcon
					title="Sign In With Facebook"
					button
					type="facebook"
					onPress={() => this._onFbLogin()}
				/>
				<SocialIcon
					title="Sign In With Google"
					button
					type="google-plus-official"
					onPress={() => this._onGoogleLogin()}
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
