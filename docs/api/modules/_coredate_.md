[nasi](../globals.md) › ["CoreDate"](_coredate_.md)

# External module: "CoreDate"

## Index

### Variables

* [MAX_REPRESENTABLE](_coredate_.md#const-max_representable)
* [MIN_REPRESENTABLE](_coredate_.md#const-min_representable)

### Functions

* [wrapDate](_coredate_.md#wrapdate)

## Variables

### `Const` MAX_REPRESENTABLE

• **MAX_REPRESENTABLE**: *8640000000000000* = 8640000000000000

*Defined in [CoreDate.ts:10](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CoreDate.ts#L10)*

___

### `Const` MIN_REPRESENTABLE

• **MIN_REPRESENTABLE**: *-8640000000000000* =  -8.64e15

*Defined in [CoreDate.ts:11](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CoreDate.ts#L11)*

## Functions

###  wrapDate

▸ **wrapDate**(`timestamp?`: [Nullable](_option_.md#nullable)‹number›): *[Type](_colour_.md#type)‹Date›*

*Defined in [CoreDate.ts:41](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CoreDate.ts#L41)*

Function to convert timestamp (nullable AND/OR optional number) into
date (Date).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`timestamp?` | [Nullable](_option_.md#nullable)‹number› | nullable, optional number |

**Returns:** *[Type](_colour_.md#type)‹Date›*

 `undefined` if
   timestamp is either:
     - `undefined`
     - `null`
     - `POSITIVE_INFINITY`
     - `NEGATIVE_INFINITY`
     - `NAN`
     - greater than `8.64e15` where `8.64e15` is maximum timestamp that
       Javascript can convert to Date object
     - less than `-8.64e15` where `-8.64e15` is minimum timestamp that
       Javascript can convert to Date object.

`Date` object otherwise.

Note that both `0` and `-0` result in `new Date(0)`.

Refer to : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
The JavaScript Date object range is -100,000,000 days to 100,000,000 days
relative to January 1, 1970 UTC.
