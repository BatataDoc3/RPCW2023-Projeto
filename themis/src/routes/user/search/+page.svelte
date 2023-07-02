<script>
	import { BACKEND_URL } from './../../../global.js';
	import "../../../app.css";
	import LawHammerIcon from '$lib/LawHammerIcon.svelte';
	import Button from '$lib/Button.svelte';
	import { session } from '../../../stores';
    import axios from 'axios';
	import { goto } from '$app/navigation';

    let usertosearch = "";
	let userExists = true;

    $: userExists, handleSubmit;

	/**
	 * @param {Event} e
	 */
	function handleSubmit(e) {
        e.preventDefault();
        axios.get(BACKEND_URL + `/users/${usertosearch}`, {
            headers: {
                'Authorization': `Bearer ${$session.token}`
            }
        }).then((response) => {
            if (response.status == 200) {
                goto(`/user/${usertosearch}`);
            }
            else {
                userExists = false;
            }
        }).catch((error) => {
            userExists = false;
        });
	}
</script>

<div class="flex flex-col h-2/3 justify-evenly">
    <div class="flex flex-col mt-5 justify-center">
        <h1 class="flex text-6xl justify-center text-pink-700 uppercase font-bold">Pesquisar Utilizador</h1>
    </div>

<form
	class="flex flex-col w-full items-center"
	on:submit={handleSubmit}
>
	<div class="flex flex-row w-2/5">
		<input
			class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
			placeholder="Nome de Utilizador..."
			type="text"
			name="user"
            bind:value={usertosearch}
		/>
		<LawHammerIcon classAttribute="w-5 h-5 mt-2 ml-2 " />
	</div>
	<div class="mt-10">
		<Button on:click={handleSubmit}>Pesquisar</Button>
	</div>
    {#if !userExists}
        <p class="text-red-500 text-center mt-2">Utilizador não encontrado.</p>
    {/if}
</form>
</div>

