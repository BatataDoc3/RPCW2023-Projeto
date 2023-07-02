// @ts-nocheck

export async function load({ params }) {
	console.log(params);
	const { id } = params;
	return {
		id: id
	};
}
