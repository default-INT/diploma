import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";


const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";


const filePath = FileSystem.documentDirectory + 'tokens.json';

/**
 *
 * @param accessToken {string}
 * @param refreshToken {string}
 */
export const writeTokens = async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 *
 * @returns {Promise<void>}
 */
export const deleteTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

/**
 *
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
export const readTokens = async () => {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    return {
        accessToken, refreshToken
    };
}