import { sha256 } from 'js-sha256';

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte: any) {
    // tslint:disable-next-line:no-bitwise
    return ((byte & 0xFF).toString(16)).padStart(2, '0');
  }).join('');
}

function calculateChainId(extIds) {
  let extIdsHashBytes = [];
  extIds.forEach(extId => {
    const extIdHash = sha256.create();
    extIdHash.update(extId);
    extIdsHashBytes = extIdsHashBytes.concat(extIdHash.array());
  });

  const fullHash = sha256.create();
  fullHash.update(extIdsHashBytes);

  return fullHash.hex();
}

export {
  toHexString,
  calculateChainId
};
