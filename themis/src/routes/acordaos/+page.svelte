<script>
	// @ts-nocheck
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';

	export let data;

	$: data;

	let params = $page.url.searchParams;
	$: currentPage = ($page.url.searchParams.get("page") ? Number($page.url.searchParams.get("page")) : 1);
	let searchKeywords = params.get('keywords');
	let orderType, orderBy;

	if(params.get("orderBy")) {
		let order = params.get("orderBy").split(";");
		orderBy = order[0];
		orderType = order[1];
	} else {
		orderType = 'desc';
		orderBy = '_id';
	}

	$: console.log(`${currentPage}/${data.numPages}`)

	function handleOrderBy(order) {
		orderBy = order;
		if(browser) {
			goto(`/acordaos?orderBy=${orderBy};${orderType}&keywords=${searchKeywords ? searchKeywords : ''}`).then(() => {
				invalidateAll();
			});
		}
	}

	function handleOrderType(order) {
		orderType = order;
		if(browser) {
			goto(`/acordaos?orderBy=${orderBy};${orderType}&keywords=${searchKeywords ? searchKeywords : ''}`).then(() => {
				invalidateAll();
			});
		}
	}

	function handleSubmitForm() {
		if(browser) {
			console.log(searchKeywords)
			goto(`/acordaos?orderBy=${orderBy};${orderType}&keywords=${searchKeywords ? searchKeywords : ''}`).then(() => {
				invalidateAll();
			});
		}
	}

</script>

<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Acórdãos</h1>
	<div class="flex-col mt-4 justify-center items-center w-full">
		<div class="flex-col ml-20 w-2/3">
		<form class="flex flex-col items-center mt-2" on:submit={() => handleSubmitForm()}>
				<input
					class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
					placeholder={searchKeywords ? searchKeywords : 'Pesquisar...'}
					type="text"
					name="keywords"
					bind:value={searchKeywords}
				/>
		</form>
		<div class="flex flex-col mt-2">
			<div class="flex flex-row justify-evenly">
			<h4 class="text-md mt-4 dark:text-white">Ordenar por:</h4>
		<div class="flex flex-row mt-2 ml-10">
			<button on:click={() => handleOrderBy("_id")}><Button>ID</Button></button>
			<button class="ml-2" on:click={() => handleOrderBy("processo")}><Button>Processo</Button></button>
			<button class="ml-2" on:click={() => handleOrderBy("data")}><Button>Data do Acórdão</Button></button>
			<button class="ml-2" on:click={() => handleOrderBy("url")}><Button>URL</Button></button>
		</div>
			<h4 class="text-md mt-4 dark:text-white">Tipo de Ordenação:</h4>
		<div class="flex flex-row mt-2 ml-10">
			<button on:click={() => handleOrderType("asc")}><Button>Ascendente</Button></button>
			<button class="ml-2" on:click={() => handleOrderType("desc")}><Button>Descendente</Button></button>
		</div>
		</div>
	</div>
</div>
	{#if data?.success}
	{#if data.numPages < 1}
	<div class="flex flex-col mt-4 dark:text-white ml-20"></div>
	{:else}
		<div class="flex flex-col mt-4 dark:text-white ml-20 justify-evenly">
		{#each data.acordaos as acordao}
		<div class="flex flex-col mt-4">
			<div class="flex flex-row">
				<div class="flex flex-col w-2/3">
					<div class="flex flex-row">
						<div class="flex flex-row  w-1/4">
							<p class="text-xl text-pink-700 font-extrabold">Processo: </p>
							<p class="text-xl ml-1">{acordao.processo}</p>
						</div>
						<div class="flex flex-row ml-10 w-3/2">
							<p class="text-xl text-pink-700 font-bold">Data do Acórdão: </p>
							<p class="text-xl ml-2">{acordao.data_acordao}</p>
						</div>
					</div>
					<div class="flex flex-row">
						<p class="text-md text-pink-700 font-bold">URL: </p>
						<p class="text-md ml-2">{acordao.url}</p>
					</div>
				</div>
				<a href="/acordaos/{acordao._id}" class="ml-20"><Button>Ver Acórdão</Button></a>
			</div>
		</div>
		{/each}
		</div>
		<div class="mt-3 dark:text-white">
			{#if currentPage > 1 && currentPage < data.numPages}
			<div class="flex flex-row justify-evenly">
				<a
					href="/acordaos?page={currentPage - 1}&keywords={searchKeywords
						? searchKeywords
						: ''}&orderBy={orderBy ? `${orderBy};${orderType}` : '_id;desc'}"
				>
					<Button>Anterior</Button>
				</a>
				<a
				href="/acordaos?page={currentPage + 1}&keywords={searchKeywords
					? searchKeywords
					: ''}&orderBy={orderBy ? `${orderBy};${orderType}` : '_id;desc'}"
				>
					<Button>Próxima</Button>
				</a>
			</div>
			{:else if currentPage === 1  && currentPage < data.numPages}
			<div class="flex flex-row justify-evenly">
				<Button type="secondary">Anterior</Button>
				<a
				href="/acordaos?page={currentPage + 1}&keywords={searchKeywords
					? searchKeywords
					: ''}&orderBy={orderBy ? `${orderBy};${orderType}` : '_id;desc'}"
				>
					<Button>Próxima</Button>
				</a>
			</div>
			{:else if currentPage === 1 && currentPage === data.numPages}
			<div class="flex flex-row justify-evenly">
				<Button type="secondary">Anterior</Button>
				<Button type="secondary">Próxima</Button>
			</div>
			{:else if currentPage > 1 && currentPage === data.numPages}
			<div class="flex flex-row justify-evenly">
				<a
				href="/acordaos?page={currentPage - 1}&keywords={searchKeywords
					? searchKeywords
					: ''}&orderBy={orderBy ? `${orderBy};${orderType}` : '_id;desc'}"
				>
					<Button>Anterior</Button>
				</a>
				<Button type="secondary">Próxima</Button>
			</div>
			{/if}
		</div>
	{/if}
	{/if}
	</div>
</div>
