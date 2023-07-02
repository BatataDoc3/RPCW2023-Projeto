<script>
	// @ts-nocheck

  import Button from '$lib/Button.svelte';
  import Modal from '$lib/Modal.svelte';
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
	let dados = undefined;

  let notDeleted = false, notAdded = false, showModal = false;

  $: showModal;

	export const err_ = writable(undefined);

	onMount (async () => { 
		dados = await axios
		.get(`${BACKEND_URL}/acordaos/${data.id}`, {
			headers: {
				Authorization: `Bearer ${$session.token}`
			}
		})
		.then((res) => {
			if (res.status !== 200) {
				throw error(res.status, { message: 'Acórdão not found'});
			} else {
				return res.data;
			}
		})
		.catch((err) => {
			goto('/error', { status: err.response.status, error: err.response.data });
		});
	});

  function deleteAcordao(id) {
      axios.delete(`${BACKEND_URL}/acordaos/${id}`, { headers: { Authorization: `Bearer ${session.get('token')}` } }).then((res) => {
          if (res.status === 200) {
              goto('/')
          } else {
              notDeleted = true;
          }
      })
    }

  let listas = undefined;
    
  function handleShowModal() {
    axios.get(`${BACKEND_URL}/lists?username=${$session.user}`).then((res) => {
      if(res.status !== 200) {
        throw error(res.status, { message: 'Lists not found'});
      } else {
        listas = res.data;
        showModal = true;
      }
    }).catch((err) => {
      goto('/error', { status: err.response.status, error: err.response.data });
    })
  }

  function handleAddToLista(lista_id) {
    axios.post(`${BACKEND_URL}/lists?listId=${lista_id}`, {
      "id_acordao": dados._id,
      "processo": dados.processo,
      "url": dados.url,
      "tribunal": dados.tribunal
    }, {
      headers: {
        Authorization: `Bearer ${$session.token}`
      }
    }).then((res) => {
      if(res.status === 200) {
        showModal = false;
      } else {
        notAdded = true;
      }
    }).catch((err) => {
      goto('/error', { status: err.response.status, error: err.response.data });
    })
  }
	

</script>

{#if dados}
<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Detalhes Acórdão</h1>
</div>

<div class="flex flex-row justify-start mt-4 ml-36 dark:text-white">
  {#if $session.role === 'ADMIN'}
  <div class="flex flex-col mt-4">
      <button on:click={() => {deleteAcordao(dados._id)}}>
      <Button type='reject'>
          <p class="m-2">Eliminar Acórdão</p>
      </Button>
      </button>
  </div>
  {/if}
  <div class="flex flex-row mt-4 ml-4">
      <button on:click={() => {handleShowModal()}}>
          <Button>
              <p class="m-2">Adicionar a Lista</p>
      </Button>
      </button>
  </div>
  <div class="flex flex-row mt-4 ml-4">
    <button on:click={() => {goto(`/acordaos/edit/${dados._id}`)}}>
        <Button>
            <p class="m-2">Sugerir Edição</p>
    </Button>
    </button>
</div>
</div>

{#if notDeleted}
    <div class="flex flex-row justify-center mt-4 ml-36 mr-36 dark:text-white">
        <p class="text-red-500">Não foi possível eliminar</p>
    </div>
{/if}

<div class="flex flex-col ml-36 mr-36 mt-4 dark:bg-indigo-900 bg-gray-300 rounded-md">
  
  <div class="flex flex-col ml-4 mr-4 mt-4 dark:text-white">  
    {#if dados._id}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">id</p>
        </h2>
        <p class="flex  mt-2">{dados._id}</p>
      </div>
    {/if}

    {#if dados.processo}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">processo</p>
        </h2>
        <p class="flex  mt-2">{dados.processo}</p>
      </div>
    {/if}
    
    {#if dados.relator}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">relator</p>
        </h2>
        <p class="flex  mt-2">{dados.relator}</p>
      </div>
    {/if}

    {#if dados.descritores}
      {#if dados.descritores.length > 0}
        <div class="flex flex-col mt-4">
          <h2 class="flex text-4xl rounded-md uppercase font-bold">
            <p class="bg-pink-700 text-uppercase text-white rounded-md">descritores</p>
          </h2>
          <ul>
          {#each dados.descritores as descritor}
            <li class="flex  mt-2">{descritor}</li>
          {/each}
          </ul>
        </div>
      {/if}
    {/if}
    
    {#if dados.n_documento}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">número do documento</p>
        </h2>
        <p class="flex  mt-2">{dados.n_documento}</p>
      </div>
    {/if}

    {#if dados.data_acordao}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">data do acórdão</p>
        </h2>
        <p class="flex  mt-2">{dados.data_acordao}</p>
      </div>
    {/if}
    
    {#if dados.especie}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">espécie</p>
        </h2>
        <p class="flex  mt-2">{dados.especie}</p>
      </div>
    {/if}
    
    {#if dados.requerente}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">requerente</p>
        </h2>
        <p class="flex  mt-2">{dados.requerente}</p>
      </div>
    {/if}
    
    {#if dados.texto_integral}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">texto integral</p>
        </h2>
        <p class="flex  mt-2">{dados.texto_integral}</p>
      </div>
    {/if}
    
    {#if dados.url}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">url</p>
        </h2>
        <p class="flex  mt-2">{dados.url}</p>
      </div>
    {/if}
    
    {#if dados.tribunal}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal</p>
        </h2>
        <p class="flex  mt-2">{dados.tribunal}</p>
      </div>
    {/if}
    
    {#if dados.votacao}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">votação</p>
        </h2>
        <p class="flex  mt-2">{dados.votacao}</p>
      </div>
    {/if}
    
    {#if dados.privacidade}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">privacidade</p>
        </h2>
        <p class="flex  mt-2">{dados.privacidade}</p>
      </div>
    {/if}
    
    {#if dados.n_convencional}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">número convencional</p>
        </h2>
        <p class="flex  mt-2">{dados.n_convencional}</p>
      </div>
    {/if}
    
    {#if dados.decisao}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">decisão</p>
        </h2>
        <p class="flex  mt-2">{dados.decisao}</p>
      </div>
    {/if}
    
    {#if dados.sumario}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">sumário</p>
        </h2>
        <p class="flex  mt-2">{dados.sumario}</p>
      </div>
    {/if}
    
    {#if dados.requerido}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">requerido</p>
        </h2>
        <p class="flex  mt-2">{dados.requerido}</p>
      </div>
    {/if}
    
    {#if dados.area_tematica_1}
      {#if dados.area_tematica_1.length > 0}
        <div class="flex flex-col mt-4">
          <h2 class="flex text-4xl rounded-md uppercase font-bold">
            <p class="bg-pink-700 text-uppercase text-white rounded-md">área temática 1</p>
          </h2>
          <ul>
          {#each dados.area_tematica_1 as area1}
            <li class="flex  mt-2">{area1}</li>
          {/each}
          </ul>
        </div>
      {/if}
    {/if}
    
    {#if dados.area_tematica_2}
      {#if dados.area_tematica_1.length > 0}
        <div class="flex flex-col mt-4">
          <h2 class="flex text-4xl rounded-md uppercase font-bold">
            <p class="bg-pink-700 text-uppercase text-white rounded-md">área temática 2</p>
          </h2>
          <ul>
          {#each dados.area_tematica_2 as area2}
            <li class="flex  mt-2">{area2}</li>
          {/each}
          </ul>
        </div>
      {/if}
    {/if}

    {#if dados.indicacoes_eventuais}  
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">indicações eventuais</p>
        </h2>
        <p class="flex  mt-2">{dados.indicacoes_eventuais}</p>
      </div>
    {/if}
    
    {#if dados.tribunal_1_instancia}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal 1ª instância</p>
        </h2>
        <p class="flex  mt-2">{dados.tribunal_1_instancia}</p>
      </div>
    {/if}
    
    {#if dados.autor}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">autor</p>
        </h2>
        <p class="flex  mt-2">{dados.autor}</p>
      </div>
    {/if}
    
    {#if dados.reu}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">réu</p>
        </h2>
        <p class="flex  mt-2">{dados.reu}</p>
      </div>
    {/if}
    
    {#if dados.seccao}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">secção</p>
        </h2>
        <p class="flex  mt-2">{dados.seccao}</p>
      </div>
    {/if}
    
    {#if dados.tribunal_nome}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">Nome do tribunal</p>
        </h2>
        <p class="flex  mt-2">{dados.tribunal_nome}</p>
      </div>
    {/if}
    
    {#if dados.recorrido_1}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">1º Recorrido</p>
        </h2>
        <p class="flex  mt-2">{dados.recorrido_1}</p>
      </div>
    {/if}
    
    {#if dados.meio_processual}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">meio processual</p>
        </h2>
        <p class="flex  mt-2">{dados.meio_processual}</p>
      </div>
    {/if}
    
    {#if dados.recorrente}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">recorrente</p>
        </h2>
        <p class="flex  mt-2">{dados.recorrente}</p>
      </div>
    {/if}
    
    {#if dados.recorrido_2}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">2º Recorrido</p>
        </h2>
        <p class="flex  mt-2">{dados.recorrido_2}</p>
      </div>
    {/if}
    
    {#if dados.decisao_texto_integral}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">Texto integral (decisão)</p>
        </h2>
        <p class="flex  mt-2">{dados.decisao_texto_integral}</p>
      </div>
    {/if}
    
    {#if dados.tribunal_recorrido}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal recorrido</p>
        </h2>
        <p class="flex  mt-2">{dados.tribunal_recorrido}</p>
      </div>
    {/if}
    
    {#if dados.processo_tribunal_recorrido}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">
            processo tribunal recorrido
          </p>
        </h2>
        <p class="flex  mt-2">{dados.processo_tribunal_recorrido}</p>
      </div>
    {/if}
    
    {#if dados.tribunal_recurso}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal recurso</p>
        </h2>
        <p class="flex  mt-2">{dados.tribunal_recurso}</p>
      </div>
    {/if}
    
    {#if dados.processo_tribunal_recurso}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">
            processo tribunal recurso
          </p>
        </h2>
        <p class="flex  mt-2">{dados.processo_tribunal_recurso}</p>
      </div>
    {/if}
    
    {#if dados.magistrado}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">magistrado</p>
        </h2>
        <p class="flex  mt-2">{dados.magistrado}</p>
      </div>
    {/if}
    
    {#if dados.referencias}
      {#if Object.entries(dados.referencias).length > 0}
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">referências</p>
        </h2>
        <div class="flex flex-col mt-2">
          {#if dados.referencias.legislacao_nacional}
          {#if dados.referencias.legislacao_nacional.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">Legislação Nacional</h1>
                  <p class="flex">{dados.referencias.legislacao_nacional}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.normas_apreciadas}
          {#if dados.referencias.normas_apreciadas.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas apreciadas</h1>
                  <p class="flex">{dados.referencias.normas_apreciadas}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.constituicao}
          {#if dados.referencias.legislacao_nacional.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">constituição</h1>
                  <p class="flex">{dados.referencias.constituicao}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.normas_julgadas_inconst}
          {#if dados.referencias.normas_julgadas_inconst.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas julgadas inconst</h1>
                  <p class="flex">{dados.referencias.normas_julgadas_inconst}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.normas_suscitadas}
          {#if dados.referencias.normas_suscitadas.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas suscitadas</h1>
                  <p class="flex">{dados.referencias.normas_suscitadas}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.jurisprudencia_constitucional}
          {#if dados.referencias.jurisprudencia_constitucional.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência constitucional</h1>
                  <p class="flex">{dados.referencias.jurisprudencia_constitucional}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.normas_declaradas_inconst}
          {#if dados.referencias.normas_declaradas_inconst.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas declaradas inconst</h1>
                  <p class="flex">{dados.referencias.normas_declaradas_inconst}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.referencias_internacionais}
          {#if dados.referencias.referencias_internacionais.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">referências internacionais</h1>
                  <p class="flex">{dados.referencias.referencias_internacionais}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.referencia_pareceres}
          {#if dados.referencias.referencia_pareceres.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex  uppercase text-pink-700 text-2xl">referência pareceres</h1>
                  <p class="flex">{dados.referencias.referencia_pareceres}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.legislacao_comunitaria}
          {#if dados.referencias.legislacao_comunitaria.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">legislação comunitária</h1>
                  <p class="flex">{dados.referencias.legislacao_comunitaria}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.outras_publicacoes}
          {#if dados.referencias.outras_publicacoes.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">outras publicações</h1>
                  <p class="flex">{dados.referencias.outras_publicacoes}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.outra_jurisprudencia}
          {#if dados.referencias.outra_jurisprudencia.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">outra jurisprudência</h1>
                  <p class="flex">{dados.referencias.outra_jurisprudencia}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.legislacao_estrangeira}
          {#if dados.referencias.legislacao_estrangeira.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">legislação estrangeira</h1>
                  <p class="flex">{dados.referencias.legislacao_estrangeira}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.jurisprudencia_estrangeira}
          {#if dados.referencias.jurisprudencia_estrangeira.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência estrangeira</h1>
                  <p class="flex">{dados.referencias.jurisprudencia_estrangeira}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.jurisprudencia_internacional}
          {#if dados.referencias.jurisprudencia_internacional.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência internacional</h1>
                  <p class="flex">{dados.referencias.jurisprudencia_internacional}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.objecto}
          {#if dados.referencias.objecto.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">objeto</h1>
                  <p class="flex">{dados.referencias.objecto}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.jurisprudencia_nacional}
          {#if dados.referencias.jurisprudencia_nacional.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência nacional</h1>
                  <p class="flex">{dados.referencias.jurisprudencia_nacional}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.referencia_doutrina}
          {#if dados.referencias.referencia_doutrina.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">referência doutrina</h1>
                  <p class="flex">{dados.referencias.referencia_doutrina}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.referencia_publicacao}
          {#if dados.referencias.referencia_publicacao.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">referência publicação</h1>
                  <p class="flex">{dados.referencias.referencia_publicacao}</p>
              </div>
              {/if}
          {/if}
          {#if dados.referencias.recusa_aplicacao}
          {#if dados.referencias.recusa_aplicacao.length > 0}
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">recusa aplicação</h1>
                  <p class="flex">{dados.referencias.recusa_aplicacao}</p>
              </div>
              {/if}
          {/if}
        </div>
        </div>
      {/if}
    {/if}
    
    {#if dados.anotacoes_extra}
      <div class="flex flex-col mt-4 mb-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white  rounded-md">anotações extra</p>
        </h2>
        <p class="flex  mt-2">{dados.anotacoes_extra}</p>
      </div>
    {/if}
  </div>

  {#if showModal}
    <Modal>
      {#each listas as lista}
        <button on:click={() => handleAddToLista(lista._id)}>
          <Button>
          {lista.nome}
          </Button>
        </button>
      {/each}
    </Modal>
  {/if}
</div>
{/if}
