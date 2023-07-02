<script>
	import Hamburger from './Hamburguer.svelte';
	import Menu from './Menu.svelte';

	export let sidebar = false;
</script>

<header class="flex justify-between bg-white dark:bg-indigo-950 p-2 items-center dark:text-white">
	<nav class="flex">
		<Hamburger bind:open={sidebar} />
	</nav>

	<Menu />
</header>
