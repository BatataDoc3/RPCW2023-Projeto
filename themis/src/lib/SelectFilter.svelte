<script context="module">
	// @ts-ignore
	export const getDistinct = (items) => {
		return Array.from(new Set(items));
	};
</script>

<script>
	export let filterValue;
	export let preFilteredValues;
	$: uniqueValues = getDistinct($preFilteredValues);
</script>

<select bind:value={$filterValue} on:click|stopPropagation>
	<option value={undefined}>Todas</option>
	{#each uniqueValues as value}
		<option {value}>{value}</option>
	{/each}
</select>
