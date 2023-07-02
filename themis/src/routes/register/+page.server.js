// @ts-nocheck
import { BACKEND_URL } from '../../global';

/**@type import("./$types").Actions */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		let data = {};
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
			if (key === 'username_') {
				data['username'] = value;
			} else {
				data[key] = value;
			}
		}

		const result = await fetch(`${BACKEND_URL}/users`, {
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
				error: 'Error creating user.'
			};
		}

		const json = await result.json();

		console.log(json);

		return {
			success: true,
			token: json.token,
			user: json.user.username,
			role: json.user.role
		};
	}
};
