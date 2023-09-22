import {
  addCipherOffset,
  charArrayToString,
  encryptString,
  mapCharCodesToChars,
  mapCharsToCharCodes,
  stringToCharArray,
} from "./caesar-cipher-encrypt";

test("stringToCharArray 'abc' => ['a','b','c']", () => {
  expect(stringToCharArray("abc")).toStrictEqual(["a", "b", "c"]);
});

test("charArrayToString ['a','b','c'] => 'abc'", () => {
  expect(charArrayToString(["a", "b", "c"])).toStrictEqual("abc");
});

test("mapCharsToCharCodes ['a','b','c'] => [97, 98, 99]", () => {
  expect(mapCharsToCharCodes(["a", "b", "c"])).toStrictEqual([97, 98, 99]);
});

test("addCipherOffset [97, 98, 99] => [98, 99, 100]", () => {
  expect(addCipherOffset([97, 98, 99], 1)).toStrictEqual([98, 99, 100]);
});

test("mapCharCodesToChars [97, 98, 99] => ['a','b','c']", () => {
  expect(mapCharCodesToChars([97, 98, 99])).toStrictEqual(["a", "b", "c"]);
});

test("encryptString 'Hello, how are you' => Ifmmp-!ipx!bsf!zpv", () => {
  expect(encryptString("Hello, how are you", 1)).toStrictEqual(
    "Ifmmp-!ipx!bsf!zpv"
  );
});
