<script>
// @ts-nocheck
	import { session } from './../../../stores';
	import Button from '$lib/Button.svelte';
    import { goto } from '$app/navigation';
	import { browser } from "$app/environment"; 
    import { BACKEND_URL } from '../../../global';
    import axios from 'axios';

    export let form;

    $: form, addData();

    function addData() {
        if(form && form?.success) {
            if(browser) {
                if(form.review) {
                    form.review['user'] = $session.user;
                    axios.post(`${BACKEND_URL}/reviews`, form.review, {
                        headers: {
                            Authorization: `Bearer ${$session.token}`,
                        },
                    }).then((res) => {
                        if(res.status === 200) {
                            if(browser) {
                                goto('/');
                            }
                        }
                    }).catch((err) => {
                        goto('/error');
                    })
                }
            }
        }
	}

</script>

<div class="flex flex-col mt-5">
	<h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Adicionar Acórdão</h1>
</div>
<form class="flex flex-col ml-40 mt-10" method="POST">
  <div class="flex flex-col mt-4 dark:text-white">  

      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">processo</p>
        </h2>
        <textarea
          class="ml-5 mt-2 rounded-md text-center w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
          name="processo"
          id="processo"
          placeholder="Processo"
          required
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">relator</p>
        </h2>
        <textarea
            class="ml-5 rounded-md mt-2 text-center w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="relator"
            id="relator"
            placeholder="Relator"
        />
      </div>
        <div class="flex flex-col mt-4">
          <h2 class="flex text-4xl rounded-md uppercase font-bold">
            <p class="bg-pink-700 text-uppercase text-white rounded-md">descritores (separados por ;)</p>
          </h2>
            <textarea
                class="ml-5 rounded-md mt-2 text-center w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                name="descritores"
                id="descritores"
                placeholder="Descritores"
            />
        </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">número do documento</p>
        </h2>
        <textarea
            class="ml-5 rounded-md mt-2 text-center w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="numero_documento"
            id="numero_documento"
            placeholder="Número do documento"
        />
      </div>

      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">data do acórdão</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="data_acordao"
            id="data_acordao"
            placeholder="Data do acórdão"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">espécie</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="especie"
            id="especie"
            placeholder="Espécie"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">requerente</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="requerente"
            id="requerente"
            placeholder="Requerente"
        />
      </div>

      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">texto integral</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="texto_integral"
            id="texto_integral"
            placeholder="Texto integral"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">url</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="url"
            id="url"
            placeholder="URL"
            required
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="tribunal"
            id="tribunal"
            placeholder="Tribunal"
            required
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">votação</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="votacao"
            id="votacao"
            placeholder="Votação"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">privacidade</p>
        </h2>
        <textarea 
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="privacidade"
            id="privacidade"
            placeholder="Privacidade"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">número convencional</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="n_convencional"
            id="n_convencional"
            placeholder="Número convencional"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">decisão</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="decisao"
            id="decisao"
            placeholder="Decisão"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">sumário</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="sumario"
            id="sumario"
            placeholder="Sumário"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">requerido</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="requerido"
            id="requerido"
            placeholder="Requerido"
        />
      </div>
    
        <div class="flex flex-col mt-4">
          <h2 class="flex text-4xl rounded-md uppercase font-bold">
            <p class="bg-pink-700 text-uppercase text-white rounded-md">área temática 1 (separar por ;)</p>
          </h2>
          <textarea
                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                name="area_tematica_1"
                id="area_tematica_1"
                placeholder="Área temática 1"
            />
        </div>
    
        <div class="flex flex-col mt-4">
          <h2 class="flex text-4xl rounded-md uppercase font-bold">
            <p class="bg-pink-700 text-uppercase text-white rounded-md">área temática 2 (separar por ;)</p>
          </h2>
          <textarea
                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                name="area_tematica_2"
                id="area_tematica_2"
                placeholder="Área temática 2"
            />
        </div>

      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">indicações eventuais</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="indicacoes_eventuais"
            id="indicacoes_eventuais"
            placeholder="Indicações eventuais"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal 1ª instância</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="tribunal_1_instancia"
            id="tribunal_1_instancia"
            placeholder="Tribunal 1ª instância"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">autor</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="autor"
            id="autor"
            placeholder="Autor"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">réu</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="reu"
            id="reu"
            placeholder="Réu"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">secção</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="seccao"
            id="seccao"
            placeholder="Secção"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">Nome do tribunal</p>
        </h2>
        <textarea 
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="tribunal_nome"
            id="tribunal_nome"
            placeholder="Nome do tribunal"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">1º Recorrido</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="recorrido_1"
            id="recorrido_1"
            placeholder="1º Recorrido"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">meio processual</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="meio_processual"
            id="meio_processual"
            placeholder="Meio processual"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">recorrente</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="recorrente"
            id="recorrente"
            placeholder="Recorrente"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">2º Recorrido</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="recorrido_2"
            id="recorrido_2"
            placeholder="2º Recorrido"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">Texto integral (decisão)</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="decisao_texto_integral"
            id="decisao_texto_integral"
            placeholder="Texto integral (decisão)"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal recorrido</p>
        </h2>
        <textarea 
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="tribunal_recorrido"
            id="tribunal_recorrido"
            placeholder="Tribunal recorrido"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">
            processo tribunal recorrido
          </p>
        </h2>
        <textarea 
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="processo_tribunal_recorrido"
            id="processo_tribunal_recorrido"
            placeholder="Processo tribunal recorrido"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">tribunal recurso</p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="tribunal_recurso"
            id="tribunal_recurso"
            placeholder="Tribunal recurso"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">
            processo tribunal recurso
          </p>
        </h2>
        <textarea
            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="processo_tribunal_recurso"
            id="processo_tribunal_recurso"
            placeholder="Processo tribunal recurso"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">magistrado</p>
        </h2>
        <textarea
            class="flex flex-col ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
            name="magistrado"
            id="magistrado"
            placeholder="Magistrado"
        />
      </div>
    
      <div class="flex flex-col mt-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white rounded-md">referências (separar por ;)</p>
        </h2>
        <div class="flex flex-col mt-2">
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">Legislação Nacional</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="legislacao_nacional"
                        id="legislacao_nacional"
                        placeholder="Legislação Nacional"
                    />
              </div>

              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas apreciadas</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="normas_apreciadas"
                        id="normas_apreciadas"
                        placeholder="Normas apreciadas"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">constituição</h1>
                  <textarea 
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="constituicao"
                        id="constituicao"
                        placeholder="Constituição"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas julgadas inconst</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="normas_julgadas_inconst"
                            id="normas_julgadas_inconst"
                            placeholder="Normas julgadas inconst"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas suscitadas</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="normas_suscitadas"
                        id="normas_suscitadas"
                        placeholder="Normas suscitadas"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência constitucional</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="jurisprudencia_constitucional"
                        id="jurisprudencia_constitucional"
                        placeholder="Jurisprudência constitucional"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">normas declaradas inconst</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="normas_declaradas_inconst"
                        id="normas_declaradas_inconst"
                        placeholder="Normas declaradas inconst"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">referências internacionais</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="referencias_internacionais"
                        id="referencias_internacionais"
                        placeholder="Referências internacionais"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex  uppercase text-pink-700 text-2xl">referência pareceres</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="referencia_pareceres"
                        id="referencia_pareceres"
                        placeholder="Referência pareceres"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">legislação comunitária</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="legislacao_comunitaria"
                            id="legislacao_comunitaria"
                            placeholder="Legislação comunitária"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">outras publicações</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="outras_publicacoes"
                            id="outras_publicacoes"
                            placeholder="Outras publicações"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">outra jurisprudência</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="outra_jurisprudencia"
                            id="outra_jurisprudencia"
                            placeholder="Outra jurisprudência"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">legislação estrangeira</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="legislacao_estrangeira"
                            id="legislacao_estrangeira"
                            placeholder="Legislação estrangeira"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência estrangeira</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="jurisprudencia_estrangeira"
                            id="jurisprudencia_estrangeira"
                            placeholder="Jurisprudência estrangeira"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência internacional</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="jurisprudencia_internacional"
                        id="jurisprudencia_internacional"
                        placeholder="Jurisprudência internacional"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">objeto</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="objecto"
                            id="objecto"
                            placeholder="Objeto"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência nacional</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="jurisprudencia_nacional"
                            id="jurisprudencia_nacional"
                            placeholder="Jurisprudência nacional"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">referência doutrina</h1>
                  <textarea
                        class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                        name="referencia_doutrina"
                        id="referencia_doutrina"
                        placeholder="Referência doutrina"
                    />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">referência publicação</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="referencia_publicacao"
                            id="referencia_publicacao"
                            placeholder="Referência publicação"
                        />
              </div>
              <div class="flex flex-col mt-1">
                  <h1 class="flex uppercase text-pink-700 text-2xl">recusa aplicação</h1>
                    <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="recusa_aplicacao"
                            id="recusa_aplicacao"
                            placeholder="Recusa aplicação"
                        />
              </div>
        </div>
        </div>
    
      <div class="flex flex-col mt-4 mb-4">
        <h2 class="flex text-4xl rounded-md uppercase font-bold">
          <p class="bg-pink-700 text-uppercase text-white  rounded-md">anotações extra</p>
        </h2>
        <textarea
          class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
          name="anotacoes_extra"
          id="anotacoes_extra"
          placeholder="Anotações extra"
        />
      </div>
  </div>
  <div class="flex items-center justify-center mr-40"><Button>Sugerir</Button></div>
</form>