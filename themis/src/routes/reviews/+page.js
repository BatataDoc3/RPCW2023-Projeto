// @ts-nocheck

import { BACKEND_URL } from '../../global.js';
import { session } from '../../stores.js';
import { get } from 'svelte/store';
import axios from 'axios';

export async function load() {
	async function getReviews() {
		return axios
			.get(`${BACKEND_URL}/reviews`, {
				headers: {
					Authorization: `Bearer ${get(session.token)}`
				}
			})
			.then((res) => {
				return {
					reviews: res.data,
					success: true
				};
			})
			.catch((err) => {
				console.log(err);
				return {
					success: false,
					error: err
				};
			});
	}
	return getReviews();
}
