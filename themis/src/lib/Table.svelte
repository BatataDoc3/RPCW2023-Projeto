<script>
	import { readable } from 'svelte/store';
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import {
		addSortBy,
		addTableFilter,
		addPagination,
		addColumnFilters,
		textPrefixFilter
	} from 'svelte-headless-table/plugins';
	import { textFilter, minFilter, numberRangeFilter, matchFilter } from '../filters/filters';
	import TextFilter from './TextFilter.svelte';
	import SelectFilter from './SelectFilter.svelte';

	const data = readable([
		{
			number: 'n457',
			desc: 'teste',
			category: 'test',
			date: '2021-05-05'
		},
		{
			number: 'n459',
			desc: 'testu',
			category: 'test2',
			date: '2023-05-05'
		}
	]);

	const table = createTable(data, {
		sort: addSortBy(),
		filter: addTableFilter(),
		page: addPagination(),
		columnFilter: addColumnFilters()
	});

	const columns = table.createColumns([
		table.column({
			header: 'Número',
			accessor: 'number',
			plugins: {
				columnFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
				}
			}
		}),
		table.column({
			header: 'Descrição',
			accessor: 'desc',
			plugins: {
				columnFilter: {
					fn: textPrefixFilter,
					initialFilterValue: '',
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(TextFilter, { filterValue, values, preFilteredValues })
				}
			}
		}),
		table.column({
			header: 'Categoria',
			accessor: 'category',
			plugins: {
				columnFilter: {
					fn: matchFilter,
					render: ({ filterValue, values, preFilteredValues }) =>
						createRender(SelectFilter, { filterValue, preFilteredValues })
				}
			}
		}),
		table.column({
			header: 'Data',
			accessor: 'date'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { sortKeys } = pluginStates.sort;
	const { filterValue } = pluginStates.filter;
	const { pageIndex, pageCount, pageSize, hasNextPage, hasPreviousPage } = pluginStates.page;
</script>

<label for="page-size">Page size</label>
<input id="page-size" type="number" min={1} bind:value={$pageSize} />
<input type="text" bind:value={$filterValue} placeholder="Search rows..." />
<table {...$tableAttrs}>
	<thead>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<th {...attrs}>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div on:click={props.sort.toggle}>
									<Render of={cell.render()} />
									{#if props.sort.order === 'asc'}
										⬇️
									{:else if props.sort.order === 'desc'}
										⬆️
									{/if}
								</div>
								<div class="flex flex-col">
									{#if props.columnFilter?.render}
										<Render of={props.columnFilter.render} />
									{/if}
								</div>
							</th>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</thead>
	<tbody {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<tr {...rowAttrs}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							<td {...attrs}>
								<Render of={cell.render()} />
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>
<div>
	<button on:click={() => $pageIndex--} disabled={!$hasPreviousPage}>Previous page</button>
	{$pageIndex + 1} out of {$pageCount}
	<button on:click={() => $pageIndex++} disabled={!$hasNextPage}>Next page</button>
</div>

<style>
	table {
		border-spacing: 0;
		border-top: 1px solid black;
		border-left: 1px solid black;
	}
	th,
	td {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		padding: 0.5rem;
	}
</style>
