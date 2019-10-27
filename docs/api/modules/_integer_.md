[nasi](../globals.md) › ["Integer"](_integer_.md)

# External module: "Integer"

## Index

### Type aliases

* [Type](_integer_.md#type)
* [int31](_integer_.md#int31)

### Variables

* [INTERNAL_INT31_SYMBOL](_integer_.md#const-internal_int31_symbol)
* [INT_MAX](_integer_.md#const-int_max)
* [INT_MIN](_integer_.md#const-int_min)

### Functions

* [UNSAFE_ofNumber](_integer_.md#unsafe_ofnumber)
* [ofNumber](_integer_.md#ofnumber)

### Object literals

* [Typed](_integer_.md#const-typed)

## Type aliases

###  Type

Ƭ **Type**: *[int31](_integer_.md#int31)*

*Defined in [Integer.ts:15](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L15)*

___

###  int31

Ƭ **int31**: *[Opaque](_types_.md#opaque)‹number, unique symbol›*

*Defined in [Integer.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L13)*

## Variables

### `Const` INTERNAL_INT31_SYMBOL

• **INTERNAL_INT31_SYMBOL**: *unique symbol* =  Symbol()

*Defined in [Integer.ts:11](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L11)*

___

### `Const` INT_MAX

• **INT_MAX**: *1073741823* = 1073741823

*Defined in [Integer.ts:22](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L22)*

Maximum signed integer allowed.
This is 2^31 - 1 since this is the value taken to be a boxed signed integer
for most virtual machines under 2's complement.

___

### `Const` INT_MIN

• **INT_MIN**: *-1073741824* =  -1073741824

*Defined in [Integer.ts:29](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L29)*

Minimum signed integer allowed.
This is -2^31 since this is the value taken to be a boxed signed integer
for most virtual machines under 2's complement.

## Functions

###  UNSAFE_ofNumber

▸ **UNSAFE_ofNumber**(`n`: number): *[int31](_integer_.md#int31)*

*Defined in [Integer.ts:44](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *[int31](_integer_.md#int31)*

___

###  ofNumber

▸ **ofNumber**(`n`: number): *Option.Type‹[int31](_integer_.md#int31)›*

*Defined in [Integer.ts:36](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *Option.Type‹[int31](_integer_.md#int31)›*

## Object literals

### `Const` Typed

### ▪ **Typed**: *object*

*Defined in [Integer.ts:31](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L31)*

###  INT_MAX

• **INT_MAX**: *number & object* =  UNSAFE_ofNumber(INT_MAX)

*Defined in [Integer.ts:32](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L32)*

###  INT_MIN

• **INT_MIN**: *number & object* =  UNSAFE_ofNumber(INT_MIN)

*Defined in [Integer.ts:33](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Integer.ts#L33)*
