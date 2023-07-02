import { BACKEND_URL } from '../../../../global';
import { session } from '../../../../stores';
import { get, writable } from 'svelte/store';
import axios from 'axios';

export const _data = writable({});

export async function load({ params }) {
	const { id } = params;

	axios
		.get(`${BACKEND_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${get(session).token}`
			}
		})
		.then((res) => {
			if (res.status !== 200) {
				_data.set({
					success: false,
					error: 'User not found'
				});
			}
			console.log(res.data);
			_data.set({ user: res.data, success: true });
		});
}
