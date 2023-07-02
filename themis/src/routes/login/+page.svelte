<script>
	import '../../app.css';
	import Button from '$lib/Button.svelte';
	import Themis from '$lib/Themis.svelte';
	import { session } from '../../stores';
	import { goto } from '$app/navigation';
	import { browser } from "$app/environment"; 

	export let form;
	$: form, updateUser();

	function updateUser() {
		if (form && form?.success) {
			session.set({user: form.user.username, role: form.user.role, token: form.token});
			if(browser) {
				//window.localStorage.setItem('username', form.user.username);
				//window.localStorage.setItem('role', form.user.role);
				//window.localStorage.setItem('jwt', form.token);
				goto('/');
			}
		}
	}

	let showThemis = false;

	function makeThemisAppear() {
		showThemis = true;
	}

	function makeThemisDisappear() {
		showThemis = false;
	}
</script>

<svelte:head>
	<title>acorthemis</title>
	<meta name="description" content="Acórdãos de forma fácil, útil e simples" />
</svelte:head>

<div class="flex flex-col w-full h-5/6 justify-evenly">
	<div class="flex flex-col h-1/2 justify-center w-full">
		<h1 class="name flex justify-center text-9xl font-bold text-center dark:text-white">
			acor
			<div class="flex flex-col justify-center items-center">
				<p
					class="text-pink-700 hover:underline hover:decoration-4 hover:{makeThemisAppear} hover:decoration-black dark:hover:decoration-white hover:underline-offset-8"
					on:mouseenter={makeThemisAppear}
					on:mouseleave={makeThemisDisappear}
				>
					themis
				</p>
				{#if showThemis}
					<div class="absolute top-20 z-0 hidden overflow-visible md:block">
						<Themis classAttribute="w-20 h-20" />
					</div>
				{/if}
			</div>
		</h1>
	</div>

	<form
		class="flex flex-col h-1/2 w-full items-center"
		method="POST"
	>	
	<div class="flex flex-col w-4/12">
			<input
				class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
				placeholder="Username"
				type="text"
				name="username"
                id="username"
			/>

            <input
            	class="placeholder:italic placeholder:text-slate-400 block mt-2 bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
				placeholder="Password"
				type="password"
				name="password"
				id="password"
			/>
		</div>
		{#if form?.error}
		<div class ="text-center text-red-500">Username ou Password errada.</div>
		{/if}
		<div class="dark:text-white mt-2">
			Não tem conta? Registe-se <a href="/register" class="text-pink-700">aqui.</a>
		</div>
		<div class="mt-10">
			<Button>LOGIN</Button>
		</div>
	</form>
</div>

<style>
	.themis-container.show {
		transition: height 0.3s ease-in-out;
	}
</style>
