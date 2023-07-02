<script>
	// @ts-nocheck
	import '../app.css';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
</script>

<div class="flex flex-col mt-5">
	<h1 class="flex text-4xl ml-20 text-pink-700 uppercase font-bold">
		Parece-me que vamos ter de adiar o processo...
	</h1>
	{#if $page}
	<h2 class="flex text-3xl ml-20 text-pink-700 uppercase font-bold mt-6">
		Erro {$page.status}: {$page.error.message}
	</h2>
	{/if}
	{#if $page.status === 404}
		<div class="flex flex-col text-xl dark:text-white ml-36 mt-4">
			<p>
				Tentaste fugir ao caminho da justiça ou não tens permissões suficientes para ver esta
				página. A Themis lamenta o incómodo.
			</p>
			<a class="mt-6" href="/"><Button>Voltar à Página Inicial</Button></a>
		</div>
	{/if}
</div>
