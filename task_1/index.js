import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)


function decodedWidthSuffiksId(arrEncodedObjects, translationsListObject)
{
  const transKeys = Object.keys(translationsListObject);
  const ecodedClon = structuredClone(arrEncodedObjects);
  const uniqueIds = [];

  ecodedClon.forEach((encodedItem) =>
  {
    const encodedItemKeys = Object.keys(encodedItem);
    encodedItemKeys.forEach((itemKey) =>
    {
      if(itemKey.endsWith('Id') && itemKey !== 'groupId' && transKeys.includes(encodedItem[itemKey]))
      {
        encodedItem[itemKey] = translationsListObject[encodedItem[itemKey]];
      }

      if(itemKey.endsWith('Id') 
      && itemKey !== 'groupId' 
      && !transKeys.includes(encodedItem[itemKey])
      && parseInt(encodedItem[itemKey])
      && !uniqueIds.includes(encodedItem[itemKey]))
      {
        uniqueIds.push(encodedItem[itemKey]);
      }
    })
  })

  return { decoded: ecodedClon, uniqueIds: uniqueIds, };
}

const decoded = decodedWidthSuffiksId(encoded, translations);
console.log(decoded)
