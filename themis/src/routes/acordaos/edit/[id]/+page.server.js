// @ts-nocheck

/**@type import("./$types").Actions */
export const actions = {
	default: async ({ request }) => {
		const referencias = [
			'legislacao_nacional',
			'normas_apreciadas',
			'constituicao',
			'normas_julgadas_inconst',
			'normas_suscitadas',
			'jurisprudencia_constitucional',
			'normas_declaradas_inconst',
			'referencias_internacionais',
			'referencias_pareceres',
			'legislacao_comunitaria',
			'outras_publicacoes',
			'outra_jurisprudencia',
			'legislacao_estrangeira',
			'jurisprudencia_estrangeira',
			'jurisprudencia_internacional',
			'objecto',
			'jurisprudencia_nacional',
			'referencia_doutrina',
			'referencia_publicacao',
			'recusa_publicacao'
		];
		let listas = ['descritores', 'area_tematica_1', 'area_tematica_2'];

		const formData = await request.formData();
		let data = {};
		let refs = {};
		for (const [key, value] of formData.entries()) {
			if (value && value !== '') {
				if (referencias.includes(key)) {
					refs[key] = value.split(';');
				} else if (listas.includes(key)) {
					data[key] = value.split(';');
				} else {
					data[key] = value;
					console.log(key, value);
				}
			}
		}
		data['referencias'] = refs;
		data['adicionar'] = true;

		console.log(data);

		return {
			review: data,
			success: true
		};
	}
};
