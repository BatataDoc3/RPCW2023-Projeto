// @ts-nocheck

import { BACKEND_URL } from '../../global.js';
import { session } from '../../stores.js';
import { get } from 'svelte/store';
import axios from 'axios';

export async function load({ url }) {
	const page = url.searchParams.get('page');
	const orderBy = url.searchParams.get('orderBy');
	const keywords = url.searchParams.get('keywords');
	const columns = [
		'_id',
		'processo',
		'relator',
		'descritores',
		'n_documento',
		'data_acordao',
		'especie',
		'requerente',
		'texto_integral',
		'url',
		'tribunal',
		'votacao',
		'privacidade',
		'n_convencional',
		'decisao',
		'sumario',
		'requerido',
		'area_tematica_1',
		'area_tematica_2',
		'indicacoes_eventuais',
		'tribunal_1_instancia',
		'autor',
		'reu',
		'seccao',
		'tribunal_nome',
		'recorrido_1',
		'meio_processual',
		'recorrente',
		'recorrido_2',
		'decisao_texto_integral',
		'tribunal_recorrido',
		'processo_tribunal_recorrido',
		'tribunal_recurso',
		'processo_tribunal_recurso',
		'magistrado',
		'anotacoes_extra'
	];

	async function getAcordaos(page, orderBy, keywords, columns) {
		let filters = {};
		if (!page) page = 1;
		if (!orderBy) orderBy = '_id;desc';
		else if (orderBy.split(';').length < 2) orderBy += ';desc';
		if (!keywords) keywords = '';
		else {
			let regexp = /([^\s]+):"(.+)"/g;
			const matches = [...keywords.matchAll(regexp)];
			matches.forEach((match) => {
				console.log(match[1]);
				if (columns.includes(match[1])) {
					console.log('match');
					filters[match[1]] = match[2];
					keywords = keywords.replace(match[0], '');
				}
			});
		}
		console.log(filters);
		let url = `${BACKEND_URL}/acordaos?page=${page}&orderBy=${orderBy}&keywords=${
			keywords ? keywords.trim() : ''
		}`;

		if (Object.keys(filters).length > 0) {
			for (const [key, value] of Object.entries(filters)) {
				console.log('key: ' + key + ' value: ' + value);
				url += `&${key}=${value}`;
			}
		}

		return axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${get(session.token)}`
				}
			})
			.then((res) => {
				console.log(res.data);
				return {
					acordaos: res.data.acordaos,
					numPages: Math.ceil(Number(res.data.totalItem) / Number(res.data.itemsPerPage)),
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

	return getAcordaos(page, orderBy, keywords, columns);
}
