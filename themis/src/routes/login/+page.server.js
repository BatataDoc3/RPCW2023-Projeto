// @ts-nocheck
import { BACKEND_URL } from '../../global';

/**@type import("./$types").Actions */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		let data = {};

		for (const [key, value] of formData.entries()) {
			data[key] = value;
		}

		const result = await fetch(`${BACKEND_URL}/auth`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (result.status !== 200) {
			return {
				success: false,
				error: 'Login failed'
			};
		}

		const json = await result.json();

		return {
			success: true,
			token: json.token,
			user: json.user
		};
	}
};
