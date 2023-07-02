<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { session } from '../stores';
	import { onMount } from 'svelte';


	let open = false;

	let loggedInOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Acórdãos', href: '/acordaos'},
		{ name: 'Sugerir Adição', href: '/acordaos/add'},
		{ name: 'Listas', href: `/user/lists` },
		{ name: 'Adicionar Lista', href: `/user/lists/add` },
		{ name: `${$session.user}`, href: `/user/${$session.user}` },
		{ name: 'Sobre Nós', href: '/about' },
		{ name: 'Terminar Sessão', href: '/logout' }
	];

	let simpleOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Iniciar Sessão', href: '/login' },
		{ name: 'Registar', href: '/register' },
		{ name: 'Constituição', href: 'https://www.parlamento.pt/Legislacao/Paginas/ConstituicaoRepublicaPortuguesa.aspx'},
		{ name: 'Sobre Nós', href: '/about' }
	];

	let adminOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Acórdãos', href: '/acordaos'},
		{ name: 'Sugerir Adição', href: '/acordaos/add'},
		{ name: 'Listas', href: `/user/lists` },
		{ name: 'Adicionar Lista', href: `/user/lists/add` },
		{ name: `${$session.user}`, href: `/user/${$session.user}` },
		{ name: 'Reviews', href: '/reviews'},
		{ name: 'Utilizadores', href: '/user/search'},
		{ name: 'Sobre Nós', href: '/about' },
		{ name: 'Terminar Sessão', href: '/logout' }
	]

	let modOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Acórdãos', href: '/acordaos'},
		{ name: 'Sugerir Adição', href: '/acordaos/add'},
		{ name: 'Listas', href: `/user/lists` },
		{ name: 'Adicionar Lista', href: `/user/lists/add` },
		{ name: `${$session.user}`, href: `/user/${$session.user}` },
		{ name: 'Reviews', href: '/reviews'},
		{ name: 'Sobre Nós', href: '/about' },
		{ name: 'Terminar Sessão', href: '/logout' }
	]

	onMount(() => {
		loggedInOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Acórdãos', href: '/acordaos'},
		{ name: 'Sugerir Adição', href: '/acordaos/add'},
		{ name: 'Listas', href: `/user/lists` },
		{ name: 'Adicionar Lista', href: `/user/lists/add` },
		{ name: `${$session.user}`, href: `/user/${$session.user}` },
		{ name: 'Sobre Nós', href: '/about' },
		{ name: 'Terminar Sessão', href: '/logout' }
		];

		adminOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Acórdãos', href: '/acordaos'},
		{ name: 'Sugerir Adição', href: '/acordaos/add'},
		{ name: 'Listas', href: `/user/lists` },
		{ name: 'Adicionar Lista', href: `/user/lists/add` },
		{ name: `${$session.user}`, href: `/user/${$session.user}` },
		{ name: 'Reviews', href: '/reviews'},
		{ name: 'Utilizadores', href: '/user/search'},
		{ name: 'Sobre Nós', href: '/about' },
		{ name: 'Terminar Sessão', href: '/logout' }
		];

		modOptions = [
		{ name: 'Página Principal', href: '/' },
		{ name: 'Acórdãos', href: '/acordaos'},
		{ name: 'Sugerir Adição', href: '/acordaos/add'},
		{ name: 'Listas', href: `/user/lists/` },
		{ name: 'Adicionar Lista', href: `/user/lists/add` },
		{ name: `${$session.user}`, href: `/user/${$session.user}` },
		{ name: 'Reviews', href: '/reviews'},
		{ name: 'Sobre Nós', href: '/about' },
		{ name: 'Terminar Sessão', href: '/logout' }
		]
	});
	
	function toggleSidebar() {
		open = !open;
	}

</script>

<svelte:head>
	<title>acorthemis</title>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
	</style> 
	<meta name="description" content="Acórdãos de forma fácil, útil e simples" />
</svelte:head>

{#if open}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex flex-col h-screen bg-white dark:bg-indigo-950" on:click={toggleSidebar}>
	{#if $session.user !== '' && $session.role === "ADMIN"}
		<Sidebar bind:open options={adminOptions} />
	{:else if $session.role === 'MODERADOR'}
		<Sidebar bind:open options={modOptions} />
	{:else if $session.user !== ''}
		<Sidebar bind:open options={loggedInOptions} />
	{:else}
		<Sidebar bind:open options={simpleOptions} />
	{/if}
	<Navbar bind:sidebar={open} />
	<div class="h-5/6 w-auto overflow-scroll">
		<slot />
	</div>

	<div class="flex justify-center w-screen text-sm text-slate-600 dark:text-white">
		<p>RPCW2023</p>
	</div>
</div>

{:else}
<div class="flex flex-col h-screen bg-white dark:bg-indigo-950">
	{#if $session.user !== "" && $session.role === "ADMIN"}
		<Sidebar bind:open options={adminOptions} />
	{:else if $session.role === 'MODERADOR'}
		<Sidebar bind:open options={modOptions} />
	{:else if $session.user !== ""}
		<Sidebar bind:open options={loggedInOptions} />
	{:else}
		<Sidebar bind:open options={simpleOptions} />
	{/if}
	<Navbar bind:sidebar={open} />
	<div class="h-5/6 w-auto overflow-scroll">
		<slot />
	</div>

	<div class="flex justify-center w-screen text-sm text-slate-600 dark:text-white">
		<p>RPCW2023</p>
	</div>
</div>
{/if}

<style global>
    * {
            font-family: 'Ubuntu', sans-serif;
    }
</style>

