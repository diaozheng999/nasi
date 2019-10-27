[nasi](../globals.md) › ["CreditCard"](_creditcard_.md)

# External module: "CreditCard"

CreditCard.ts

**`author`** Diao Zheng

**`file`** Defines various utility methods to process Credit Card numbers.

## Index

### Type aliases

* [Type](_creditcard_.md#type)

### Functions

* [chunkCreditCardNumber](_creditcard_.md#chunkcreditcardnumber)

## Type aliases

###  Type

Ƭ **Type**: *"AMEX" | "AURA" | "CABCHARGE" | "CUP" | "DINERS" | "DISCOVER" | "ELO" | "HIPER" | "HIPERCARD" | "JCB" | "MAESTRO" | "MASTERCARD" | "UATP" | "UPI" | "UPOP" | "VISA"*

*Defined in [CreditCard.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CreditCard.ts#L13)*

Indicates a type of credit card that's supported. Currently, this defines
all documented payment types in WireCard's elastic payment API.

## Functions

###  chunkCreditCardNumber

▸ **chunkCreditCardNumber**(`cardNumber`: string, `type?`: [Type](_creditcard_.md#type)): *string[]*

*Defined in [CreditCard.ts:43](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CreditCard.ts#L43)*

Chunking credit-card numbers based on
https://baymard.com/checkout-usability/credit-card-patterns

To further differentiate between various stylings of the same length:
  e.g. (union-pay vs. maestro 19-digit cards), an optional type parameter
can be passed in.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`cardNumber` | string | The (possibly masked) card number. |
`type?` | [Type](_creditcard_.md#type) | the optional type of card that is used to generate the correct format.  |

**Returns:** *string[]*
