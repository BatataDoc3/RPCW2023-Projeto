<script>
	// @ts-nocheck

	import Button from '$lib/Button.svelte';
	import '../../../../app.css';
	import {_data} from './+page.js';
	import { BACKEND_URL } from '../../../../global';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	/** @type {import('./$types').PageData} */

    export let form;

    $: form, updateData();

	$_data;
	let error = false;
	let new_password = '';

	function updateData() {
		if (form && form?.success) {
			if(browser) {
				goto(`/`);
			}
		}
	}
</script>

{#if $_data}
<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Editar Perfil</h1>
	<div class="flex-col mt-4 justify-center items-center">
		<form class="flex flex-col items-center after:justify-center mt-10" method="POST">
			<div class="flex flex-row">
				<div class="flex flex-col w-40">
					<label for="name" class="flex text-xl dark:text-white">Username: </label>
				</div>
				<input
					type="text"
					class="ml-5 rounded-md text-center w-60 overflow-hidden bg-gray-200 stroke-pink-700"
					name="username"
					id="username"
					placeholder={$_data.user.username}
					value={$_data.user.username}
					readonly
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="email" class="flex text-xl dark:text-white stroke-pink-700">Email: </label>
				</div>
				<input
					type="email"
					class="ml-5 rounded-md text-center w-60 overflow-hidden bg-gray-200 stroke-pink-700"
					name="email"
					id="email"
					placeholder={$_data.user.email}
					value={$_data.user.email}
					readonly
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
					placeholder={$_data.user.firstname}
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
					placeholder={$_data.user.lastname}
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="password" class="flex text-xl dark:text-white">Nova Password: </label>
				</div>
				<input
					type="password"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="password"
					placeholder="password"
					bind:value={new_password}
				/>
			</div>
			{#if form?.error}
				<p class="text-red-500 mt-2">{form.error}</p>
			{/if}
			{#if new_password.length < 8 && new_password.length > 0}
				<p class="text-red-500 mt-2">A password tem de ter pelo menos 8 caracteres.</p>
				<div class="flex mt-5">
					<button on:click|preventDefault><Button>Gravar Alterações</Button></button>
				</div>
			{:else if error}
				<p class="text-red-500 mt-2">Não foi possível atualizar os seus dados.</p>
				<div class="flex mt-5">
					<Button>Gravar Alterações</Button>
				</div>
			{:else}
				<div class="flex mt-5">
					<Button>Gravar Alterações</Button>
				</div>
			{/if}
		</form>
	</div>
</div>
{/if}