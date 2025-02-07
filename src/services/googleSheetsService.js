import { getGoogleSheets } from "./googleAuthService.js";

/**
 * Salva dados em uma planilha do Google Sheets.
 *
 * @param {string} spreadsheetID - O ID da planilha do Google Sheets onde os dados serão salvos.
 * @param {Array<Object>} data - Um array de objetos contendo os dados dos alunos a serem salvos. Cada objeto deve ter uma propriedade 'ano' que indica o ano do aluno.
 * @returns {Promise<void>} - Uma promessa que resolve quando os dados forem salvos com sucesso.
 * @throws {Error} - Lança um erro se ocorrer algum problema ao salvar os dados na planilha do Google Sheets.
 */

export const saveDataToSheet = async (spreadsheetID, data) => {
  try {
    const sheets = await getGoogleSheets(); // criar o objeto do google sheets
    const series = {
      "1º ANO": "1º Ano",
      "2º ANO": "2º Ano",
      "3º ANO": "3º Ano",
      "4º ANO": "4º Ano",
      "5º ANO": "5º Ano",
      "6º ANO": "6º Ano",
      "7º ANO": "7º Ano",
      "8º ANO": "8º Ano",
      "9º ANO": "9º Ano",
    };

    //objeto vazio para amazenar os dados fornecidos pelo parametro data que irá separar os alunos por ano;
    const alunosPorAno = {};

    //separar os dados por ano
    data.forEach((aluno) => {
      //garantir que o ano esteja no formato correto em maiúsculas
      const seriesAluno = aluno.ano.toUpperCase();
      if (series[seriesAluno]) {
        //se no objeto "alunosPorAno" não existir o array de alunos do ano, então é criado um novo array e inicializa vazio
        if (!alunosPorAno[seriesAluno]) alunosPorAno[seriesAluno] = [];

        alunosPorAno[seriesAluno].push(aluno);
      }
    });
  } catch (error) {
    console.log("error ao salvar os dados no google sheets", error);
  }
};
