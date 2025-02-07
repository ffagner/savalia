import axios from "axios";

/**
 * Busca um token externo através de uma requisição POST.
 * 
 * @async
 * @function fetchExternalToken
 * @returns {Promise<Object>} Retorna os dados da resposta contendo o token.
 * @throws {Error} Lança um erro se a requisição falhar.
 * 
 * @example
 * fetchExternalToken()
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */

export const fetchExternalToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.API_URL}/token`,
            {
               username: "admin",
                password: "@admin@2025@", 
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );
        return response.data;

    } catch (error) {
        console.log("error ao buscar o token", error);
    }
}