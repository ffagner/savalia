import { fetchEscolas, fetchExternalData } from "../services/externalApiService.js"
import { findSpreadsheet } from "../services/googleDriveService.js"
import { saveDataToSheet } from "../services/googleSheetsService.js"

/**
 * Exibe o formulário renderizando a página inicial.
 *
 * @param {Object} req - O objeto de solicitação HTTP.
 * @param {Object} res - O objeto de resposta HTTP.
 */
export const showForm = (req, res) => {
    res.render("index", {message: "null"});
};

/**
 * Busca a lista de escolas do município informado.
 * @param {string} municipio - Nome do município.
 * @returns {Promise<Array>} - Lista de escolas do município.
 */

export const getEscolas = async (req, res) => {
    const { municipio } = req.query;
    if (!municipio) {
        return res.status(400).json({ error: "O parâmetro 'municipio' é obrigatório." });
    }

    try {
        const escolas = await fetchEscolas(municipio);
        res.json(escolas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar as escolas." });
    }
}

/**
 * Submete o formulário com os dados fornecidos pelo usuário.
 *
 * @param {Object} req - O objeto de requisição do Express.
 * @param {Object} req.body - O corpo da requisição contendo os dados do formulário.
 * @param {string} req.body.escola - O nome da escola.
 * @param {string} req.body.planilha - O identificador da planilha.
 * @param {string} req.body.folderId - O identificador da pasta.
 * @param {Object} res - O objeto de resposta do Express.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando a operação estiver concluída.
 *
 * @throws {Error} - Retorna um erro se os parâmetros 'escola', 'planilha' ou 'folderId' não forem fornecidos.
 * @throws {Error} - Retorna um erro se a planilha não for encontrada.
 * @throws {Error} - Retorna um erro se ocorrer um problema ao salvar os dados.
 */

export const submitForm = async (req, res) => {
    const  {escola, planilha, folderId} = req.body;
    if (!escola || !planilha || !folderId) {
        return res.status(400).json({ error: "Os parâmetros 'escola', 'planilha' e 'folderId' são obrigatórios." });
    }

    try {
        const spreadsheetId = await findSpreadsheet(escola, folderId);
        if (!spreadsheetId) {
            return res.status(404).json({ error: "Planilha não encontrada." });
        }

        const data = await fetchExternalData(planilha);
        await saveDataToSheet(spreadsheetId, data);
        res.render("success", { message: "Dados salvos com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar os dados." });
    }
}