[nasi](../globals.md) › ["Hashing"](../modules/_hashing_.md) › [IContext](_hashing_.icontext.md)

# Interface: IContext

A context that serves as the basis for our universal hashing algorithm.
The hashes generated are universal, and are solely deterministic based on
the randomly generated values given inside this object.

## Hierarchy

* **IContext**

## Index

### Properties

* [a](_hashing_.icontext.md#a)
* [array](_hashing_.icontext.md#array)
* [b](_hashing_.icontext.md#b)
* [bigint](_hashing_.icontext.md#bigint)
* [boolean](_hashing_.icontext.md#boolean)
* [float](_hashing_.icontext.md#float)
* [int](_hashing_.icontext.md#int)
* [nan](_hashing_.icontext.md#nan)
* [null](_hashing_.icontext.md#null)
* [object](_hashing_.icontext.md#object)
* [p](_hashing_.icontext.md#p)
* [string](_hashing_.icontext.md#string)
* [undefined](_hashing_.icontext.md#undefined)

## Properties

###  a

• **a**: *Integer.Type*

*Defined in [Hashing.ts:35](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L35)*

the multiplier, (Range=[1, p))

___

###  array

• **array**: *Integer.Type*

*Defined in [Hashing.ts:51](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L51)*

magic constant (Range=[0, p)) as starting point for arrays

___

###  b

• **b**: *Integer.Type*

*Defined in [Hashing.ts:37](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L37)*

the intercept, (Range=[0, p))

___

###  bigint

• **bigint**: *Integer.Type*

*Defined in [Hashing.ts:63](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L63)*

magic constant (Range=[0, p)) as starting point for bigint.
Not yet implemented.

___

###  boolean

• **boolean**: *Integer.Type*

*Defined in [Hashing.ts:45](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L45)*

magic constant (Range=[0, p)) as starting point for boolean

___

###  float

• **float**: *Integer.Type*

*Defined in [Hashing.ts:49](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L49)*

magic constant (Range=[0, p)) as starting point for numbers

___

###  int

• **int**: *Integer.Type*

*Defined in [Hashing.ts:47](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L47)*

magic constant (Range=[0, p)) as starting point for integers

___

###  nan

• **nan**: *Integer.Type*

*Defined in [Hashing.ts:65](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L65)*

magic constant (Range=[0, p)) as starting point for the value NaN

___

###  null

• **null**: *Integer.Type*

*Defined in [Hashing.ts:43](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L43)*

magic constant (Range=[0, p)) as starting point for null

___

###  object

• **object**: *Integer.Type*

*Defined in [Hashing.ts:56](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L56)*

magic constant (Range=[0, p)) as starting point for objects, and as
replacements for Symbols and Functions in objects.

___

###  p

• **p**: *Integer.Type*

*Defined in [Hashing.ts:39](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L39)*

a prime >= M which serves as the finite field

___

###  string

• **string**: *Integer.Type*

*Defined in [Hashing.ts:58](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L58)*

magic constant (Range=[0, p)) as starting point for string

___

###  undefined

• **undefined**: *Integer.Type*

*Defined in [Hashing.ts:41](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L41)*

magic constant (Range=[0, p)) as starting point for undefined
