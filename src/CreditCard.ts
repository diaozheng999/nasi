/**
 * CreditCard.ts
 * @author Diao Zheng
 * @file Defines various utility methods to process Credit Card numbers.
 */

// @barrel export all

/**
 * Indicates a type of credit card that's supported. Currently, this defines
 * all documented payment types in WireCard's elastic payment API.
 */
export type Type =
  | "AMEX" // American Express
  | "AURA" // Aura
  | "CABCHARGE" // CabCharge
  | "CUP" // China UnionPay
  | "DINERS" // Diner's Club
  | "DISCOVER" // Discover
  | "ELO" // Elo
  | "HIPER" // Hiper
  | "HIPERCARD" // Hipercard
  | "JCB" // JCB Credit Card
  | "MAESTRO" // Maestro
  | "MASTERCARD" // Mastercard
  | "UATP" // UATP
  | "UPI" // UPI
  | "UPOP" // UnionPay Online Payments
  | "VISA" // VISA
;

/**
 * Chunking credit-card numbers based on
 * https://baymard.com/checkout-usability/credit-card-patterns
 *
 * To further differentiate between various stylings of the same length:
 *   e.g. (union-pay vs. maestro 19-digit cards), an optional type parameter
 * can be passed in.
 * @param cardNumber The (possibly masked) card number.
 * @param type the optional type of card that is used to generate the correct
 * format.
 */
export function chunkCreditCardNumber(
  cardNumber: string,
  type?: Type,
): string[]
{
  switch (cardNumber.length) {
  case 13:
    // maestro 13-digit
    return [
      cardNumber.substr(0, 4),
      cardNumber.substr(4, 4),
      cardNumber.substr(8, 5),
    ];
  case 14:
    // Diners Club
    return [
      cardNumber.substr(0, 4),
      cardNumber.substr(4, 6),
      cardNumber.substr(10, 4),
    ];
  case 15:
    if (type === "UATP") {
      // UATP cards are styled 4-5-6
      return [
        cardNumber.substr(0, 4),
        cardNumber.substr(4, 5),
        cardNumber.substr(9, 6),
      ];
    }

    // amex-style: 4-6-5
    return [
      cardNumber.substr(0, 4),
      cardNumber.substr(4, 6),
      cardNumber.substr(10, 5),
    ];

  case 16:
    // standard (VISA style)
    return [
      cardNumber.substr(0, 4),
      cardNumber.substr(4, 4),
      cardNumber.substr(8, 4),
      cardNumber.substr(12, 4),
    ];

  case 18:
    // some Russion Maestro cards
    return [
      cardNumber.substr(0, 8),
      cardNumber.substr(8, 10),
    ];

  case 19:
    if (type === "MAESTRO") {
      // maestro uses 4-4-4-4-3
      return [
        cardNumber.substr(0, 4),
        cardNumber.substr(4, 4),
        cardNumber.substr(8, 4),
        cardNumber.substr(12, 4),
        cardNumber.substr(16, 3),
      ];
    }
    // assume unionpay style: 6-13
    return [
      cardNumber.substr(0, 6),
      cardNumber.substr(6, 13),
    ];
  }
  return [ cardNumber ];
}
