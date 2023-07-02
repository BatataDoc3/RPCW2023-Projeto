<script>
    // @ts-nocheck
        import { session } from './../../../../stores';
        import Button from '$lib/Button.svelte';
        import { goto } from '$app/navigation';
        import { browser } from "$app/environment"; 
        import { BACKEND_URL } from '../../../../global';
        import { onMount } from 'svelte';
        import axios from 'axios';
    
        export let form;
        export let data;
    
        form, addInfo();

	    let dados = undefined;
        
	    onMount (async () => { 
            console.log(data.id)
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
        
        function addInfo() {
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
                                goto('/');
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
        <h1 class="flex text-6xl ml-20 text-pink-700 uppercase font-bold">Edição de Acórdão</h1>
    </div>
{#if dados}
    <form class="flex flex-col ml-40 mt-10" method="POST">
      <div class="flex flex-col mt-4 dark:text-white">
        
        <div class="flex flex-col mt-4">
            <h2 class="flex text-4xl rounded-md uppercase font-bold">
              <p class="bg-pink-700 text-uppercase text-white rounded-md">id do acórdão</p>
            </h2>
            <textarea
              class="ml-5 mt-2 rounded-md text-center w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
              name="acordao_id"
              id="acordao_id"
              placeholder="ID"
              value={dados._id ? dados._id : ''}
              required
              readonly
            />
        </div>
    
          <div class="flex flex-col mt-4">
            <h2 class="flex text-4xl rounded-md uppercase font-bold">
              <p class="bg-pink-700 text-uppercase text-white rounded-md">processo</p>
            </h2>
            <textarea
              class="ml-5 mt-2 rounded-md text-center w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
              name="processo"
              id="processo"
              placeholder="Processo"
              value={dados.processo ? dados.processo : ''}
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
                value={dados.relator ? dados.relator : ''}
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
                    value={dados.descritores ? dados.descritores.join(";") : ''}
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
                value={dados.numero_documento ? dados.numero_documento : ''}
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
                value={dados.data_acordao ? dados.data_acordao : ''}
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
                value={dados.especie ? dados.especie : ''}
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
                value={dados.requerente ? dados.requerente : ''}
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
                value={dados.texto_integral ? dados.texto_integral : ''}
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
                value={dados.url ? dados.url : ''}
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
                value={dados.tribunal ? dados.tribunal : ''}
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
                value={dados.votacao ? dados.votacao : ''}
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
                value={dados.privacidade ? dados.privacidade : ''}
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
                value={dados.n_convencional ? dados.n_convencional : ''}
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
                value={dados.decisao ? dados.decisao : ''}
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
                value={dados.sumario ? dados.sumario : ''}
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
                value={dados.requerido ? dados.requerido : ''}
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
                    value={dados.area_tematica_1 ? dados.area_tematica_1.join(";") : ''}
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
                    value={dados.area_tematica_2 ? dados.area_tematica_2.join(";") : ''}
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
                value={dados.indicacoes_eventuais ? dados.indicacoes_eventuais : ''}
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
                value={dados.tribunal_1_instancia ? dados.tribunal_1_instancia : ''}
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
                value={dados.autor ? dados.autor : ''}
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
                value={dados.reu ? dados.reu : ''}
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
                value={dados.seccao ? dados.seccao : ''}
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
                value={dados.tribunal_nome ? dados.tribunal_nome : ''}
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
                value={dados.recorrido_1 ? dados.recorrido_1 : ''}
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
                value={dados.meio_processual ? dados.meio_processual : ''}
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
                value={dados.recorrente ? dados.recorrente : ''}
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
                value={dados.recorrido_2 ? dados.recorrido_2 : ''}
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
                value={dados.decisao_texto_integral ? dados.decisao_texto_integral : ''}
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
                value={dados.tribunal_recorrido ? dados.tribunal_recorrido : ''}
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
                value={dados.processo_tribunal_recorrido ? dados.processo_tribunal_recorrido : ''}
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
                value={dados.tribunal_recurso ? dados.tribunal_recurso : ''}
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
                value={dados.processo_tribunal_recurso ? dados.processo_tribunal_recurso : ''}
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
                value={dados.magistrado ? dados.magistrado : ''}
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
                            value={dados.legislacao_nacional ? dados.legislacao_nacional.join(";") : ''}
                        />
                  </div>
    
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">normas apreciadas</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="normas_apreciadas"
                            id="normas_apreciadas"
                            placeholder="Normas apreciadas"
                            value={dados.normas_apreciadas ? dados.normas_apreciadas.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">constituição</h1>
                      <textarea 
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="constituicao"
                            id="constituicao"
                            placeholder="Constituição"
                            value={dados.constituicao ? dados.constituicao.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">normas julgadas inconst</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="normas_julgadas_inconst"
                                id="normas_julgadas_inconst"
                                placeholder="Normas julgadas inconst"
                                value={dados.normas_julgadas_inconst ? dados.normas_julgadas_inconst.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">normas suscitadas</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="normas_suscitadas"
                            id="normas_suscitadas"
                            placeholder="Normas suscitadas"
                            value={dados.normas_suscitadas ? dados.normas_suscitadas.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência constitucional</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="jurisprudencia_constitucional"
                            id="jurisprudencia_constitucional"
                            placeholder="Jurisprudência constitucional"
                            value={dados.jurisprudencia_constitucional ? dados.jurisprudencia_constitucional.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">normas declaradas inconst</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="normas_declaradas_inconst"
                            id="normas_declaradas_inconst"
                            placeholder="Normas declaradas inconst"
                            value={dados.normas_declaradas_inconst ? dados.normas_declaradas_inconst.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">referências internacionais</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="referencias_internacionais"
                            id="referencias_internacionais"
                            placeholder="Referências internacionais"
                            value={dados.referencias_internacionais ? dados.referencias_internacionais.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex  uppercase text-pink-700 text-2xl">referência pareceres</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="referencia_pareceres"
                            id="referencia_pareceres"
                            placeholder="Referência pareceres"
                            value={dados.referencia_pareceres ? dados.referencia_pareceres.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">legislação comunitária</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="legislacao_comunitaria"
                                id="legislacao_comunitaria"
                                placeholder="Legislação comunitária"
                                value={dados.legislacao_comunitaria ? dados.legislacao_comunitaria.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">outras publicações</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="outras_publicacoes"
                                id="outras_publicacoes"
                                placeholder="Outras publicações"
                                value={dados.outras_publicacoes ? dados.outras_publicacoes.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">outra jurisprudência</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="outra_jurisprudencia"
                                id="outra_jurisprudencia"
                                placeholder="Outra jurisprudência"
                                value={dados.outra_jurisprudencia ? dados.outra_jurisprudencia.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">legislação estrangeira</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="legislacao_estrangeira"
                                id="legislacao_estrangeira"
                                placeholder="Legislação estrangeira"
                                value={dados.legislacao_estrangeira ? dados.legislacao_estrangeira.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência estrangeira</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="jurisprudencia_estrangeira"
                                id="jurisprudencia_estrangeira"
                                placeholder="Jurisprudência estrangeira"
                                value={dados.jurisprudencia_estrangeira ? dados.jurisprudencia_estrangeira.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência internacional</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="jurisprudencia_internacional"
                            id="jurisprudencia_internacional"
                            placeholder="Jurisprudência internacional"
                            value={dados.jurisprudencia_internacional ? dados.jurisprudencia_internacional.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">objeto</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="objecto"
                                id="objecto"
                                placeholder="Objeto"
                                value={dados.objecto ? dados.objecto.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">jurisprudência nacional</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="jurisprudencia_nacional"
                                id="jurisprudencia_nacional"
                                placeholder="Jurisprudência nacional"
                                value={dados.jurisprudencia_nacional ? dados.jurisprudencia_nacional.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">referência doutrina</h1>
                      <textarea
                            class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                            name="referencia_doutrina"
                            id="referencia_doutrina"
                            placeholder="Referência doutrina"
                            value={dados.referencia_doutrina ? dados.referencia_doutrina.join(";") : ''}
                        />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">referência publicação</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="referencia_publicacao"
                                id="referencia_publicacao"
                                placeholder="Referência publicação"
                                value={dados.referencia_publicacao ? dados.referencia_publicacao.join(";") : ''}
                            />
                  </div>
                  <div class="flex flex-col mt-1">
                      <h1 class="flex uppercase text-pink-700 text-2xl">recusa aplicação</h1>
                        <textarea
                                class="ml-5 rounded-md text-center mt-2 w-2/3 text-black h-20 overflow-scroll stroke-pink-700"
                                name="recusa_aplicacao"
                                id="recusa_aplicacao"
                                placeholder="Recusa aplicação"
                                value={dados.recusa_aplicacao ? dados.recusa_aplicacao.join(";") : ''}
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
              value={dados.anotacoes_extra ? dados.anotacoes_extra : ''}
            />
          </div>
      </div>
      <div class="flex items-center justify-center mr-40"><Button>Sugerir Edição</Button></div>
    </form>
{/if}