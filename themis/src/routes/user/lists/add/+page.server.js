// @ts-nocheck

/**@type import("./$types").Actions */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		let data = {};
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
			data[key] = value;
		}

		return {
			data: data,
			success: true
		};
	}
};
