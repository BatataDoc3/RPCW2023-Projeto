<script>
	export let filterValue;
	export let values;
	export let preFilteredValues;
</script>

<label for="filter-input">
	{$values.length} out of {$preFilteredValues.length}
</label>
<input id="filter-input" type="text" bind:value={$filterValue} placeholder="filtrar..." />

<style>
	input {
		width: 8rem;
	}
</style>
