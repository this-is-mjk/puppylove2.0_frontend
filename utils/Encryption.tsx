import CryptoJS from 'crypto-js';

export async function SHA256(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return passHash;
  }

  export async function GenerateKeys() {
    const keyPair = await crypto.subtle.generateKey(
      { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['encrypt', 'decrypt']
    );
  
    const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
  
    return {
      pubKey: Buffer.from(publicKey).toString('base64'),
      privKey: Buffer.from(privateKey).toString('base64')
    };
  }

  export async function Encryption(SHA: string, publicKey: string) {
    const publicKeyBuffer = Buffer.from(publicKey, 'base64');
    const publicKeyImported = await crypto.subtle.importKey(
      'spki',
      publicKeyBuffer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['encrypt']
    );
  
    const encodedData = new TextEncoder().encode(SHA);
    const encryptedArrayBuffer = await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKeyImported,
      encodedData
    );
  
    return Buffer.from(encryptedArrayBuffer).toString('base64');
  }

  export async function Decryption(ENC: string, privateKey: string) {
    const privateKeyBuffer = Buffer.from(privateKey, 'base64');
    const privateKeyImported = await crypto.subtle.importKey(
      'pkcs8',
      privateKeyBuffer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['decrypt']
    );
  
    const encryptedData = Buffer.from(ENC, 'base64');
    const decryptedArrayBuffer = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privateKeyImported,
      encryptedData
    );
  
    return new TextDecoder().decode(decryptedArrayBuffer);
  }

  // AES encryption of pvtKey using password
export async function Encryption_AES(privateKey: string, pass: string) {
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    const encrypted = CryptoJS.AES.encrypt(privateKey, pass, options);
    const ivString = CryptoJS.enc.Base64.stringify(iv);
    const encryptedData = encrypted.toString();
    return ivString + ':' + encryptedData;
  }
  
  // AES decryption of pvtKey using password
  export async function Decryption_AES(ENC: string, pass: string) {
    const [ivString, encryptedData] = ENC.split(':');
    const iv = CryptoJS.enc.Base64.parse(ivString);
    const options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    const decrypted = CryptoJS.AES.decrypt(encryptedData, pass, options);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  