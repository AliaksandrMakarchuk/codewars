import { RomanNumeralsEncoderDecoder } from "../RomanNumeralsEncoderDecoder/RomanNumeralsEncoderDecoder";

export function solution(roman: string): number {
    // complete the solution by transforming the
    // string roman numeral into an integer
    return RomanNumeralsEncoderDecoder.fromRoman(roman);
}