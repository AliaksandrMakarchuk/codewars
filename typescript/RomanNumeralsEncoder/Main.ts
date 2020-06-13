import { RomanNumeralsEncoderDecoder } from "../RomanNumeralsEncoderDecoder/RomanNumeralsEncoderDecoder";

export function solution(number: number): string {
    // convert the number to a roman numeral
    return RomanNumeralsEncoderDecoder.toRoman(number);
}