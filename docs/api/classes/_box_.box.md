[nasi](../globals.md) › ["Box"](../modules/_box_.md) › [Box](_box_.box.md)

# Class: Box <**T**>

A container for a reference to something.

## Type parameters

▪ **T**

## Hierarchy

* **Box**

## Index

### Constructors

* [constructor](_box_.box.md#constructor)

### Properties

* [value](_box_.box.md#value)

### Methods

* [setValueTo](_box_.box.md#setvalueto)
* [updateValueFrom](_box_.box.md#updatevaluefrom)
* [valueOf](_box_.box.md#valueof)
* [empty](_box_.box.md#static-empty)

## Constructors

###  constructor

\+ **new Box**(`value`: T): *[Box](_box_.box.md)*

*Defined in [Box.ts:17](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Box.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *[Box](_box_.box.md)*

## Properties

###  value

• **value**: *T*

*Defined in [Box.ts:17](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Box.ts#L17)*

## Methods

###  setValueTo

▸ **setValueTo**(`other`: [Box](_box_.box.md)‹T›): *void*

*Defined in [Box.ts:27](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Box.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`other` | [Box](_box_.box.md)‹T› |

**Returns:** *void*

___

###  updateValueFrom

▸ **updateValueFrom**(`other`: [Box](_box_.box.md)‹T›): *void*

*Defined in [Box.ts:31](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Box.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`other` | [Box](_box_.box.md)‹T› |

**Returns:** *void*

___

###  valueOf

▸ **valueOf**(): *T*

*Defined in [Box.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Box.ts#L23)*

**Returns:** *T*

___

### `Static` empty

▸ **empty**<**T**>(): *[Box](_box_.box.md)‹T | undefined›*

*Defined in [Box.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Box.ts#L13)*

**Type parameters:**

▪ **T**

**Returns:** *[Box](_box_.box.md)‹T | undefined›*
