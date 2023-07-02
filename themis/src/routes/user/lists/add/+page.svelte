<script>
	// @ts-nocheck
  
	import Button from "$lib/Button.svelte";
	import "../../../../app.css";
	import { goto } from "$app/navigation";
	import { session } from "./../../../../stores.js";
	import { browser } from "$app/environment";
	import axios from "axios";
	import { BACKEND_URL } from "./../../../../global";
	/** @type {import('./$types').PageData} */
  
	export let form;
  
	$: form, addLista();
  
	function addLista() {
	  if (form && form?.success) {
		form.data["username"] = $session.user;
		axios
		  .post(`${BACKEND_URL}/lists`, form.data, {
			headers: {
			  Authorization: `Bearer ${$session.token}`,
			},
		  })
		  .then((res) => {
			if (res.status === 200) {
			  if (browser) {
				goto("/");
			  }
			  return {
				success: true,
				error: undefined,
			  };
			}
		  })
		  .catch((err) => {
			return {
			  success: false,
			  error: "Error creating list.",
			};
		  });
	  }
	}
  </script>
  

<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">CRIAÇÃO DE LISTA</h1>
	<div class="flex-col mt-4 justify-center items-center">
		<form class="flex flex-col items-center after:justify-center mt-10" method="POST">
			<div class="flex flex-row">
				<div class="flex flex-col w-40">
					<label for="nome" class="flex text-xl dark:text-white">Nome: </label>
				</div>
				<input
					type="text"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="nome"
                    id="nome"
					placeholder="Nome da Lista"
                    required
				/>
			</div>
			<div class="flex flex-row mt-4">
				<div class="flex flex-col w-40">
					<label for="descricao" class="flex text-xl dark:text-white stroke-pink-700">Descrição: </label>
				</div>
				<textarea
					type="text"
					class="ml-5 rounded-md text-center w-60 overflow-hidden stroke-pink-700"
					name="descricao"
                    id="descricao"
					placeholder="Descrição"
                    required
				/>
			</div>
            {#if form?.error}
                <p class="text-red-500 mt-2">{form.error}</p>
            {/if}
            
			<div class="flex mt-5">
			    <Button>Criar Lista</Button>
			</div>
		</form>
	</div>
</div>
