<script>
	export let showModal = true;
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 justify-center items-center"
		on:click|self
	>
		<div class="flex bg-slate-200 rounded-md w-1/3">
			<div class="m-5">
				<slot />
			</div>
		</div>
	</div>
{/if}
