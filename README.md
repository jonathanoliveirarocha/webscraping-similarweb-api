# webscraping-similarweb-api

## Sumário:

1. [Apresentação Geral](#apresentação-geral)
2. [Informações Armazenadas](#informações-armazenadas)
3. [Endpoints](#endpoints)
4. [Estrutura de Arquivos](#estrutura-de-arquivos)
5. [Rodando o Projeto Localmente ](#rodando-o-projeto-localmente)



## Apresentação Geral

### Sobre o Projeto :

Este projeto foi desenvolvido com o intuito de realizar o webscraping de informações da página <a href="https://www.similarweb.com">SimilarWeb</a>. SimilarWeb é uma plataforma que contém métricas cadastradas de diversos sites na web, possibilitando análises úteis para tomadas de decisão.

### Tecnologias Utilizadas :

- Node.js
- Express
- MongoDB
- Selenium WebDriver (Atente-se à observasão!)

> Obs: Como o site leva a uma página de validação em caso de execução por bots (mesmo enviando os headers para simular a execução de um navegador), não foi possível extrair o conteúdo HTML da página diretamente por meio do "cheerio". Sendo assim, para passar pelo sistema de "Challenge Validation", tive que optar pelo uso do Selenium para a raspagem dos dados.

## Informações Armazenadas

As informações possível incluem:
- "url"  A URL do site armazenado
- "websiteRank" - Classificação global
- "totalVisits" - Total de visitas recebidas
- "websiteCategory" - Categoria
- "websiteRankChange" - Percentual de cresicmento
- "durationAverageVisit" - Duração média da visita
- "pagesPerVisit" - Páginas por visita
- "rejectionRate" - Taxa de rejeição
- "countryListContainer" - 5 Principais países e seus valores percentuais
- "genderDistContainer" - Distribuição por Gênero 
- "ageDistContainer" - Distribuição por Idade entre 6 faixas diferentes

## Endpoints

### POST /salve_info:

**Descrição:** Recebe uma URL, faz o scraping dos dados e os amazena no banco. Ela retorna um Status 201, juntamente com o ID dos dados cadastrados.

> Obs: A resposta demora alguns segundos, pois a mesma depende da execução do Selenium. Todos os dados são armazenados em formato de String!

#### Exemplo de Entrada:

```bash
    {
	    "url": "https://www.exemplo.com/"
    }
```

#### Exemplo de Saída:

```bash
    {
	    "id": "65839c9b19dbcf4465e071ef"
    }
```

### GET /get_info:

**Descrição:** Recebe uma URL, e retorna os dados armazenados referentes há ela, caso houver.

#### Exemplo de Entrada:

```bash
    {
	    "url": "https://www.exemplo.com/"
    }
```

#### Exemplo de Saída:

```bash
    {
        "countryListContainer": {
            "first": {
                "name": "United States",
                "value": "19.59%"
            },
            "second": {
                "name": "Brazil",
                "value": "8.92%"
            },
            "third": {
                "name": "India",
                "value": "4.09%"
            },
            "fourth": {
                "name": "Argentina",
                "value": "3.27%"
            },
            "fifth": {
                "name": "United Kingdom",
                "value": "3.12%"
            },
            "others": {
                "name": "Others",
                "value": "61.01%"
            }
        },
        "genderDistContainer": {
            "male": "46.67%",
            "female": "53.33%"
        },
        "ageDistContainer": {
            "range_18_24": "18.4%",
            "range_25_34": "31.25%",
            "range_35_44": "20.61%",
            "range_45_54": "14.26%",
            "range_55_64": "10.48%",
            "range_65_or_more": "4.99%"
        },
        "_id": "65839c9b19dbcf4465e071ef",
        "url": "https://www.instagram.com/",
        "websiteRank": "#4",
        "totalVisits": "6.6B",
        "websiteCategory": "Computers Electronics and Technology > Social Media Networks",
        "websiteRankChange": "1.83%",
        "durationAverageVisit": "00:08:19",
        "pagesPerVisit": "11.53",
        "rejectionRate": "35.23%",
        "__v": 0
    }
```

## Estrutura de Arquivos

Para o desenvolvimento da API, optei por utilizar MVC, para facilitar a organização e a divisão de responsabilidades.

### Pastas:

- **/src/config:** Define as configurações do projeto
- **/src/controllers:** Define as funções de manipulação das requisições
- **/src/functions:** Define as funções utilitárias para fins específicos
- **/src/models:** Define os models para armazenamento no Banco de Dados
- **/src/routes:** Define as rotas da api
- **/src/services:** Define os arquivos específicos para manipulação do Banco de Dados


## Rodando o Projeto Localmente 

1. Primeiramente certifique-se de possuir o <a href="https://nodejs.org/en">Node.js</a> instalado em sua máquina.

   > Programa desenvolvido na versão 18.12.1 do Node.js.

2. Crie um arquivo chamado ".env" na pasta raíz do projeto e substitua o dado pela sua URI de conexão ao MongoDB:

   ```bash
   DATABASE_URI = "<SUA_URI>"
   ```

3. Agora basta executar o arquivo "start.bat".
