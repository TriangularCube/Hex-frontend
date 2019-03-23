import 'regenerator-runtime/runtime'

import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { REQUEST_LOGIN, CHECK_COOKIE } from '../actionTypes';

async function fetchJson( url, options = {} ){
	let resp;
	try{
		let data = await fetch( url, options );
		resp = { data: await data.json() };
	} catch( e ){
		resp = { err: e.message };
	}
	return resp;
}

function* login( action ){

	console.log( action );// DEBUG
	try{
		const response = yield call( fetchJson, process.env.API_URL + 'login', {
			method: 'POST',
			mode: "cors",
			cache: "default",
			credentials: "omit",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"strategy": "local",
				"username": "bluntweapon", // DEBUG
				"password": "pillerjunction" // DEBUG
			})
		} );

		console.log( response );
	} catch( e ){
		console.log( "Fetch Error: ", e.message );
	}

}

export function* watchLogin(){
	yield takeLatest( REQUEST_LOGIN, login );
}

function showCookie(){
	console.log( "Showing Cookie //TODO" );
}

export function* watchCookies() {
	yield takeEvery( CHECK_COOKIE, showCookie );
}