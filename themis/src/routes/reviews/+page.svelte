<script>
	// @ts-nocheck
	import Button from '$lib/Button.svelte';

	export let data;

	let error = false;

	$: data;

</script>

{#if data?.success}
<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Revisões</h1>
</div>
		{#if data.reviews.length < 1}
			<div class="flex flex-col mt-4 dark:text-white ml-20">Não há acórdãos</div>
		{:else}
			<div class="flex flex-col mt-4 dark:text-white ml-20 justify-evenly">
				<div class="flex flex-col mt-4 dark:text-white ml-20 justify-evenly">
					{#each data.reviews as review}
					<div class="flex flex-col mt-4">
						<div class="flex flex-row">
							<div class="flex flex-col w-2/3">
								<div class="flex flex-row">
									<div class="flex flex-row">
										<p class="text-xl text-pink-700 font-bold">Processo: </p>
										<p class="text-xl ml-2">{review.processo}</p>
									</div>
									<div class="flex flex-row ml-10">
										<p class="text-xl text-pink-700 font-bold">Data de Submissão: </p>
										<p class="text-xl ml-2">{review.data_review}</p>
									</div>
								</div>
								<div class="flex flex-row">
									<div class="flex flex-row">
										<p class="text-xl text-pink-700 font-bold">Tipo: </p>
										<p class="text-xl ml-2">{review.adicionar ? "Adição" : "Edição"}</p>
									</div>
									<div class="flex flex-row ml-10">
										<p class="text-xl text-pink-700 font-bold">Username: </p>
										<p class="text-xl ml-2">{review.user}</p>
									</div>
								</div>
							</div>
							<a href="/reviews/{review._id}" class="ml-20"><Button>Ver Review</Button></a>
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