// @ts-nocheck
import { BACKEND_URL } from '../../../../global';
import { get } from 'svelte/store';
import { session } from '../../../../stores';
import axios from 'axios';

/**@type import("./$types").Actions */
export const actions = {
	default: async ({ request }) => {
		console.log('aqui');
		const formData = await request.formData();
		let data = {};
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
			if (value && value !== '') {
				data[key] = value;
			}
		}

		const result = await axios.put(`${BACKEND_URL}/users/${data.username}`, data, {
			headers: {
				Authorization: `Bearer ${get(session).token}`
			}
		});

		if (result.status !== 200) {
			return {
				success: false,
				error: 'Error updating user.'
			};
		}

		return {
			success: true
		};
	}
};
