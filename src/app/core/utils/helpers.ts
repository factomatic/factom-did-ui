import { sha256 } from 'js-sha256';
import { sha512 } from 'js-sha512';

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte: any) {
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

export {
  toHexString,
  calculateChainId,
  calculateSha512
};
