
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const credentialsPath = path.join(__dirname, "..", "config", "authKey.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

/**
 * Cria um objeto de autenticação do Google.
 * 
 * @constant {google.auth.GoogleAuth} auth - Objeto de autenticação do Google.
 * @param {Object} credentials - Credenciais de autenticação.
 * @param {string[]} scopes - Escopos de acesso para a API do Google.
 * @see {@link https://developers.google.com/identity/protocols/oauth2/scopes|Google API Scopes}
 */
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"],
});

export const getAuthClient = () => auth.getClient();
export const getGoogleSheets = async () => google.sheets({ version: "v4", auth: auth });
export const getGoogleDrive = async () => google.drive({ version: "v3", auth: auth });
