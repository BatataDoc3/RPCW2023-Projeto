// @ts-nocheck

import { BACKEND_URL } from '../../../../global';
import { session } from '../../../../stores';
import { get } from 'svelte/store';
import axios from 'axios';

export async function load({ params }) {
	async function getLista(id) {
		return axios
			.get(BACKEND_URL + `/lists?listId=${id}`, {
				headers: {
					Authorization: `Bearer ${get(session).token}`
				}
			})
			.then((res) => {
				console.log(res.data);
				return {
					lista: res.data,
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

	return getLista(params.id);
}
