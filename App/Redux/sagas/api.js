import 'regenerator-runtime/runtime'

import { takeLatest, call, put } from 'redux-saga/effects';
import { REQUEST_LOGIN } from '../actionTypes';

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
			method: 'GET',
			mode: "cors",
			cache: "default",
			credentials: "omit",
			headers: {
				"Content-Type": "application/json"
			}
		} );

		console.log( response );
	} catch( e ){
		console.log( "Fetch Error: ", e.message );
	}

}

export function* watchLogin(){
	yield takeLatest( REQUEST_LOGIN, login );
}