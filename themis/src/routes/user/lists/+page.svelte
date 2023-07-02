<script>
	// @ts-nocheck
	import Button from '$lib/Button.svelte';
	import { session } from '../../../stores';
	import { BACKEND_URL } from '../../../global';
	import { onMount } from 'svelte';
	import axios from 'axios';

	let dados = undefined;
	$: dados;

	onMount (async () => {
		dados = await axios
			.get(BACKEND_URL + `/lists?username=${$session.user}`, {
				headers: {
					Authorization: `Bearer ${$session.token}`
				}
			})
			.then((res) => {
				console.log(res.data);
				return {
					listas: res.data,
					success: true
				};
			}).catch((err) => {
				console.log(err);
				return {
					success: false
				};
			});
	});

</script>

{#if dados}
<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Listas</h1>
</div>
	{#if dados?.success}
		{#if dados.listas.length < 1}
			<div class="flex flex-col mt-4 dark:text-white ml-20">Não há listas</div>
		{:else}
			<div class="flex flex-col mt-4 dark:text-white ml-20 justify-evenly">
			{#each dados.listas as lista}
			<div class="flex flex-col mt-4">
				<div class="flex flex-row">
					<div class="flex w-2/3">
							<p class="text-2xl ml-2">{lista.nome}</p>
					</div>
					<a href="/user/lists/{lista._id}" class="ml-20"><Button>Ver Lista</Button></a>
				</div>
			</div>
			{/each}
			</div>
		{/if}
	{/if}
{/if}