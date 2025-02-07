import { getGoogleDrive } from "./googleAuthService.js";

/**
 * Encontra uma planilha no Google Drive com base no nome da escola e no ID da pasta.
 *
 * @param {string} schoolName - O nome da escola a ser procurado.
 * @param {string} folderId - O ID da pasta onde a planilha está localizada.
 * @returns {Promise<Object|null>} - Retorna um objeto contendo o ID e o nome da planilha se encontrada, caso contrário, retorna null.
 * @throws {Error} - Lança um erro se ocorrer um problema ao buscar o arquivo no Google Drive.
 */

export const findSpreadsheet = async (schoolName, folderId) => {
    try {
    const drive = await getGoogleDrive(); // criar o objeto do google drive
    const resData = await drive.files.list({
        q: `name contains '${schoolName}' and '${folderId}' in parents and mimeType = 'application/vnd.google-apps.spreadsheet'`,
        fields: "files(id, name)",
    }) // buscar o arquivo no google drive

    return resData.data.files.length > 0 ? resData.data.files[0] : null; // se o arquivo existir retornar o id do arquivo, senão retornar null
    } catch (error) {
        console.log("error ao buscar o arquivo no google drive", error);
        return null;
    }
}

