import {
  Account,
  Client,
  Avatars,
  OAuthProvider,
  ID,
} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
  platform: 'com.iml.ibben',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.project!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function loginWithEmail(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error('Failed to login');
    return session;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    if (!user) throw new Error('Failed to sign up');
    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function loginWithGoogle() {
  try {
    const redirectUri = Linking.createURL('/');

    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error('Failed to login');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== 'success') {
      throw new Error('Failed to login');
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if (!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error('Failed to login');
    return session;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    console.log('Attempting to get current user...');
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return { ...response, avatar: userAvatar.toString() };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
