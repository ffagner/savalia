import axios from "axios";

/**
 * Busca a lista de escolas do município informado.
 * @param {string} municipio - Nome do município.
 * @returns {Promise<Array>} - Lista de escolas do município.
 */

export const fetchEscolas = async (municipio) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/escolas?municipio=${municipio}`);
        return response.data;
    } catch (error) {
        console.log("error ao buscar as escolas", error);
    }
}

/**
 * Busca a lista de alunos da escola informada.
 * @param {string} escola - Nome da escola.
 * @returns {Promise<Array>} - Lista de alunos da escola.
 */

export const fetchExternalData = async (apiUrl) => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.log("error ao buscar os dados", error);
    }
}
