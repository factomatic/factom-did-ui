import { sha256 } from 'js-sha256';
import { sha512 } from 'js-sha512';

function toHexString(byteArray) {
  return Array.from(byteArray, function (byte: any) {
    // tslint:disable-next-line:no-bitwise
    return ((byte & 0xFF).toString(16)).padStart(2, '0');
  }).join('');
}

function calculateChainId(extIds) {
  const extIdsHashBytes = extIds.reduce(function (total, currentExtId) {
    const extIdHash = sha256.create();
    extIdHash.update(currentExtId);
    return total.concat(extIdHash.array());
  }, []);

  const fullHash = sha256.create();
  fullHash.update(extIdsHashBytes);

  return fullHash.hex();
}

function calculateSha512(content: string): string {
  const hash = sha512.create();
  hash.update(content);
  return hash.hex();
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function exportPemKeys(keys) {
  const pubKey = await exportRSAPublicKey(keys);
  const privKey = await exportRSAPrivateKey(keys);

  return { publicKey: pubKey, privateKey: privKey };
}

async function exportRSAPublicKey(keys) {
  const spki = await window.crypto.subtle.exportKey('spki', keys.publicKey);
  return convertBinaryToPem(spki, "RSA PUBLIC KEY");
}

async function exportRSAPrivateKey(keys) {
  const pkcs8 = await window.crypto.subtle.exportKey('pkcs8', keys.privateKey);
  return convertBinaryToPem(pkcs8, "RSA PRIVATE KEY");
}

function convertBinaryToPem(binaryData, label) {
  const base64Cert = arrayBufferToBase64String(binaryData);
  let pemCert = "-----BEGIN " + label + "-----\r\n";
  let nextIndex = 0;

  while (nextIndex < base64Cert.length) {
    if (nextIndex + 64 <= base64Cert.length) {
      pemCert += base64Cert.substr(nextIndex, 64) + "\r\n";
    } else {
      pemCert += base64Cert.substr(nextIndex) + "\r\n";
    }

    nextIndex += 64;
  }

  pemCert += "-----END " + label + "-----\r\n";
  return pemCert;
}

function arrayBufferToBase64String(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);

  let byteString = '';
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }

  return btoa(byteString);
}

export {
  toHexString,
  calculateChainId,
  calculateSha512,
  capitalize,
  exportPemKeys
};
