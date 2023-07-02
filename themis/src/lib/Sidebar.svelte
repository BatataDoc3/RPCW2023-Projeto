<script>
	export let open = false;
	/**@type {{ name: string; href: string; }[]} */
	export let options;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<aside class="absolute h-full bg-gray-200 dark:bg-violet-950 shadow-lg" class:open>
	<nav class="mt-20 text-xl dark:text-white">
		{#each options as option}
			{#if option.name ==="Constituição"}
			<a class="block mb-3 ml-4 mr-36 mt-3" href={option.href} target="_blank">{option.name}</a>
			{:else}
			<a class="block mb-3 ml-4 mr-36 mt-3" href={option.href}>{option.name}</a>
			{/if}
			<div class="border-b border-gray-400 ml-2 mr-2" />
		{/each}
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.open {
		left: 0;
	}
</style>
