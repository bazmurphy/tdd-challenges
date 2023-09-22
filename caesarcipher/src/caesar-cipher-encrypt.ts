// namespace CaesarCipherEncrypt {

export function encryptString(input: string, offset: number): string {
  const charArrayOne = stringToCharArray(input);
  const charCodes = mapCharsToCharCodes(charArrayOne);
  const charCodesOffset = addCipherOffset(charCodes, offset);
  const charArrayTwo = mapCharCodesToChars(charCodesOffset);
  const result = charArrayToString(charArrayTwo);
  return result;
}

export function stringToCharArray(input: string): string[] {
  return input.split("");
}

export function charArrayToString(input: string[]): string {
  return input.join("");
}

export function mapCharsToCharCodes(input: string[]): number[] {
  return input.map((char) => char.charCodeAt(0));
}

export function addCipherOffset(
  input: number[],
  offset: number | string
): number[] {
  return input.map((code) => code + Number(offset));
}

export function mapCharCodesToChars(input: number[]): string[] {
  return input.map((charCode) => String.fromCharCode(charCode));
}

// }
