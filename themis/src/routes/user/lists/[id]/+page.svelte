<script>
	// @ts-nocheck
	import Button from '$lib/Button.svelte';
	import { BACKEND_URL } from '../../../../global';
	import { goto } from '$app/navigation';
	import { session } from "../../../../stores";
	import axios from 'axios';

	export let data;

	let error = false;

	$: data;

	function deleteAcordao(ac_id, list_id) {
		axios.delete(BACKEND_URL + `/lists?listId=${list_id}&acordaoId=${ac_id}`, {
			headers: {
				'Authorization': `Bearer ${$session.token}`
			}
		}).then(() => {
			goto(`/`);
		}).catch((err) => {
			console.log(err);
			error = true;
		})
	}

</script>

{#if data?.success}
<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">{data.lista.nome}</h1>
	<h2 class="flex text-xl ml-20 dark:text-white">{data.lista.descricao}</h2>
</div>
		{#if data.lista.acordaos.length < 1}
			<div class="flex flex-col mt-4 dark:text-white ml-20">Não há acórdãos</div>
		{:else}
			<div class="flex flex-col mt-4 dark:text-white ml-20 justify-evenly">
				<div class="flex flex-col mt-4 dark:text-white ml-20 justify-evenly">
					{#each data.lista.acordaos as acordao}
					<div class="flex flex-col mt-4">
						<div class="flex flex-row">
							<div class="flex flex-col w-2/3">
								<div class="flex flex-row">
									<div class="flex flex-row">
										<p class="text-xl font-bold">Processo: </p>
										<p class="text-md ml-2">{acordao.processo}</p>
									</div>
									<div class="flex flex-row">
										<p class="text-xl font-bold">Tribunal: </p>
										<p class="text-md ml-2">{acordao.tribunal}</p>
									</div>
								</div>
								<div class="flex flex-row">
									<p class="text-xl font-bold">URL: </p>
									<p class="text-md">{acordao.url}</p>
								</div>
							</div>
							<a href="/acordaos/{acordao.id_acordao}" class="ml-20"><Button>Ver Acórdão</Button></a>
							<button on:click={() => {deleteAcordao(acordao.id_acordao, data.lista._id)}} class="ml-20"><Button>Remover Acórdão</Button></button>
						</div>
					</div>
					{/each}
					{#if error}
						<div class="flex flex-col mt-4 dark:text-white ml-20">Erro ao remover acórdão</div>
					{/if}
			</div>
			</div>
		{/if}
	{/if}