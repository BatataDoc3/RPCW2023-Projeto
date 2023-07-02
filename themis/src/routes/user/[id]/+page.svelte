<script>
	// @ts-nocheck

	import Button from '$lib/Button.svelte';
	import '../../../app.css';
	import { session } from '../../../stores';
	import { writable } from 'svelte/store';
	import { BACKEND_URL } from '../../../global';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	/** @type {import('./$types').Pageuser} */
	
	export let data;
	let user = undefined;

	export const err_ = writable(undefined);

	let notUpdated = false;
	let notDeleted = false;

	onMount (async () => { 
		user = await axios
		.get(`${BACKEND_URL}/users/${data.id}`, {
			headers: {
				Authorization: `Bearer ${$session.token}`
			}
		})
		.then((res) => {
			if (res.status !== 200) {
				throw error(res.status, { message: 'User not found'});
			} else {
				return res.data;
			}
		})
		.catch((err) => {
			goto('/error', { status: err.response.status, error: err.response.data });
		});
	});
	
	function promoteUser() {
		if (browser) {
			axios.put(`${BACKEND_URL}/users/promote/${data.id}`, {}, {
					headers: {
						Authorization: `Bearer ${$session.token}`,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						user.role = "MODERADOR";
					}
					else {
						notUpdated = true;
					}
				}).catch((err) => {
					goto('/error')
				});
		}
	}

	function demoteUser() {
		if (browser) {
			axios
				.put(`${BACKEND_URL}/users/demote/${data.id}`, {}, {
					headers: {
						Authorization: `Bearer ${$session.token}`,
					},
				})
				.then((res) => {
					if (res.status === 200) {
						user.role = "USER";
					}
					else {
						notUpdated = true;
					}
				}).catch((err) => {
					goto('/error');
				});
		}
	}

	function deleteUser() {
		console.log("delete");
		if(browser) {
			axios.delete(`${BACKEND_URL}/users/${data.id}`, {
				headers: {
					Authorization: `Bearer ${$session.token}`,
				},
			}).then((res) => {
					if (res.status === 200) {
						goto(`/`);
					}
					else {
						notDeleted = true;
					}
				}).catch((err) => {
					goto('/error')
				});
		}
	}
</script>

{#if user}
<div class="flex flex-col mt-10">
	<h1 class="flex justify-center text-6xl text-pink-700 uppercase font-bold">{user.firstname} {user.lastname}</h1>
	<h2 class="flex justify-center text-4xl dark:text-white font-bold">{user.username}</h2>
	<h3 class="flex justify-center text-md text-gray-500">{user.email}</h3>
	<h4 class="flex justify-center text-sm text-gray-500">Membro desde: {user.registeredOn}</h4>
	{#if user.username === $session.user}
		<div class="flex flex-row justify-center mt-7">
			<a href="/user/edit/{user.username}"><Button>Editar Perfil</Button></a>
		</div>
	{:else if $session.role === 'ADMIN'}
		<div class="flex flex-row justify-evenly mt-7">
			<button on:click={() => deleteUser()}><Button>Eliminar Utilizador</Button></button>
			{#if user.role === 'USER'}
				<button on:click={() => promoteUser()}><Button>Promover a Moderador</Button></button>
			{:else if user.role === 'MODERADOR'}
				<button on:click={() => demoteUser()}><Button>Despromover a Utilizador</Button></button>
			{/if}
		</div>
	{/if}
	{#if notUpdated}
		<p class="flex justify-center text-red-500">Não foi possível atualizar o utilizador</p>
	{/if}
	{#if notDeleted}
		<p class="flex justify-center text-red-500">Não foi possível eliminar o utilizador</p>
	{/if}
</div>
{/if}