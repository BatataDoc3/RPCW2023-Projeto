<script>
	// @ts-nocheck

	import Button from '$lib/Button.svelte';
    import '../../app.css';
	import { session } from '../../stores';
	import { goto } from '$app/navigation';
	import { browser } from "$app/environment"; 
	/** @type {import('./$types').PageData} */


    let username_ = "";
	export let form;

	$: form, updateUser();

	function updateUser() {
		if (form && form?.success) {
			if(browser) {
				goto('/');
			}
		}
	}
</script>

<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">REGISTO DE UTILIZADOR</h1>
	<div class="flex-col mt-4 justify-center items-center">
		<form class="flex flex-col items-center after:justify-center mt-10" method="POST">
			<div class="flex flex-row">
				<div class="flex flex-col w-40">
					<label for="name" class="flex text-xl dark:text-white">Username: </label>
				</div>
				<input
					type="text"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="username_"
                    id="username_"
					placeholder="Username"
                    bind:value={username_}
                    required
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="email" class="flex text-xl dark:text-white stroke-pink-700">Email: </label>
				</div>
				<input
					type="email"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="email"
                    id="email"
					placeholder="Email"
                    required
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="nome" class="flex text-xl dark:text-white">Nome: </label>
				</div>
				<input
					type="text"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="firstname"
                    id="firstname"
                    placeholder="Nome Próprio"
                    required
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="apelido" class="flex text-xl dark:text-white">Apelido: </label>
				</div>
				<input
					type="text"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="lastname"
                    id="lastname"
					placeholder="Apelido"
                    required
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="password" class="flex text-xl dark:text-white">Password: </label>
				</div>
				<input
					type="password"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="password"
                    id="password"
					placeholder="Password"
                    required
                    minlength="8"
				/>
			</div>
            {#if form?.error}
                <p class="text-red-500 mt-2">{form.error}</p>
            {/if}
            {#if username_.includes(' ') || username_.includes('@') || username_.includes('/')}
                <p class="text-red-500 mt-2">O username não pode conter espaços, @ ou /.</p>
                <div class="flex mt-5">
                    <button on:click|preventDefault><Button>REGISTAR</Button></button>
                </div>
			{:else}
				<div class="flex mt-5">
				    <Button>REGISTAR</Button>
				</div>
			{/if}
		</form>
	</div>
</div>
