<script>
	import '../app.css';
	import LawHammerIcon from '$lib/LawHammerIcon.svelte';
	import Modal from '$lib/Modal.svelte';
	import Button from '$lib/Button.svelte';
	import Themis from '$lib/Themis.svelte';
	import { session } from '../stores';

	/** @type boolean*/
	let loggedIn;
	let showModal = false; // Flag to control the modal visibility
	let showThemis = false;
	/** @type String | null*/
	let user = $session.user;

	if(user === '') {
		loggedIn = false;
	} else {
		loggedIn = true;
	}

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
	/**
	 * @param {Event} e
	 */
	function handleSubmit(e) {
		if (!loggedIn) {
			e.preventDefault(); // Prevent form submission
			openModal(); // Open the modal if not logged in
		}
	}

	function makeThemisAppear() {
		showThemis = true;
	}

	function makeThemisDisappear() {
		showThemis = false;
	}
</script>

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
		<h6 class="text-center text-xl dark:text-white">Está na hora de acordar a Themis.</h6>
	</div>

	<form
		class="flex flex-col h-1/2 w-full items-center"
		action="/acordaos"
		method="get"
		on:submit={handleSubmit}
	>
		<div class="flex flex-row w-2/5">
			<input
				class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
				placeholder="Pesquisar..."
				type="text"
				name="keywords"
			/>
			<LawHammerIcon classAttribute="w-5 h-5 mt-2 ml-2 " />
		</div>

		<div class="mt-10">
			{#if user === ''}
				<Button>Pesquisar</Button>
			{:else}
				<Button on:click={openModal}>Pesquisar</Button>
			{/if}
		</div>
	</form>
	<Modal {showModal} on:click={closeModal}>
		<div class="flex flex-col">
			<h1 class="flex text-3xl font-bold justify-center">Indentifica-te</h1>
			<p class="flex text-center">
				Embora a Themis tenha os olhos tapados, para acederes a esta ação, precisas de te
				identificar.
			</p>
			<div class="flex mt-2 justify-center">
				<a href="/login"
					><Button><p class="m-2">Inicia já a tua sessão</p></Button>
				</a>
			</div>
		</div>
	</Modal>
</div>

<style>
	.themis-container.show {
		transition: height 0.3s ease-in-out;
	}
</style>
