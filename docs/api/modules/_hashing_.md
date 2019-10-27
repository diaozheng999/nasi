[nasi](../globals.md) › ["Hashing"](_hashing_.md)

# External module: "Hashing"

## Index

### Interfaces

* [IContext](../interfaces/_hashing_.icontext.md)

### Variables

* [M](_hashing_.md#const-m)
* [OBJECT_KEY_BUCKET_MASK](_hashing_.md#const-object_key_bucket_mask)
* [OBJECT_KEY_BUCKET_SIZE_POWER_OF_2](_hashing_.md#const-object_key_bucket_size_power_of_2)
* [P](_hashing_.md#const-p)
* [context](_hashing_.md#let-context)

### Functions

* [UNSAFE_exposeCurrentContext](_hashing_.md#unsafe_exposecurrentcontext)
* [UNSAFE_hash](_hashing_.md#unsafe_hash)
* [UNSAFE_hashBuffer](_hashing_.md#unsafe_hashbuffer)
* [generateContext](_hashing_.md#generatecontext)
* [getCurrentContext](_hashing_.md#getcurrentcontext)
* [hash](_hashing_.md#hash)
* [hashArray](_hashing_.md#hasharray)
* [hashFloat](_hashing_.md#hashfloat)
* [hashNumber](_hashing_.md#hashnumber)
* [hashObject](_hashing_.md#hashobject)
* [hashPrimitive](_hashing_.md#hashprimitive)
* [hashString](_hashing_.md#hashstring)
* [randomInt](_hashing_.md#randomint)
* [regenerateContext](_hashing_.md#regeneratecontext)
* [rot27](_hashing_.md#rot27)
* [setContext](_hashing_.md#setcontext)
* [validateContext](_hashing_.md#validatecontext)

## Variables

### `Const` M

• **M**: *536870912* = 536870912

*Defined in [Hashing.ts:74](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L74)*

M is the hashed universe size.
This is chosen to be 2^29 because we want to guarantee that we can find a
prime that's larger than this, as well as below the machine word size (31
bits)

___

### `Const` OBJECT_KEY_BUCKET_MASK

• **OBJECT_KEY_BUCKET_MASK**: *number* =  OBJECT_KEY_BUCKET_SIZE_POWER_OF_2 - 1

*Defined in [Hashing.ts:87](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L87)*

This is the bitmask (so done because mod takes too long), this is defined
because:
  a mod 2^n === a & (2^n - 1)

___

### `Const` OBJECT_KEY_BUCKET_SIZE_POWER_OF_2

• **OBJECT_KEY_BUCKET_SIZE_POWER_OF_2**: *32* = 32

*Defined in [Hashing.ts:80](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L80)*

Number of buckets to hash to while hashing objects. This must be a power of
2 due to internal optimisations.

___

### `Const` P

• **P**: *Integer.Type[]* =  [
  1073737591 | 0, 1073737597 | 0, 1073737619 | 0, 1073737627 | 0,
  1073737631 | 0, 1073737661 | 0, 1073737703 | 0, 1073737711 | 0,
  1073737723 | 0, 1073737771 | 0, 1073737829 | 0, 1073737837 | 0,
  1073737877 | 0, 1073737879 | 0, 1073737909 | 0, 1073737939 | 0,
  1073737943 | 0, 1073737967 | 0, 1073737981 | 0, 1073738011 | 0,
  1073738101 | 0, 1073738117 | 0, 1073738119 | 0, 1073738143 | 0,
  1073738161 | 0, 1073738189 | 0, 1073738191 | 0, 1073738219 | 0,
  1073738243 | 0, 1073738249 | 0, 1073738269 | 0, 1073738273 | 0,
  1073738297 | 0, 1073738321 | 0, 1073738353 | 0, 1073738383 | 0,
  1073738387 | 0, 1073738441 | 0, 1073738503 | 0, 1073738521 | 0,
  1073738563 | 0, 1073738579 | 0, 1073738623 | 0, 1073738651 | 0,
  1073738671 | 0, 1073738711 | 0, 1073738737 | 0, 1073738741 | 0,
  1073738747 | 0, 1073738753 | 0, 1073738789 | 0, 1073738801 | 0,
  1073738807 | 0, 1073738821 | 0, 1073738843 | 0, 1073738863 | 0,
  1073738867 | 0, 1073738903 | 0, 1073738917 | 0, 1073738929 | 0,
  1073738933 | 0, 1073738951 | 0, 1073738957 | 0, 1073738977 | 0,
  1073738983 | 0, 1073739041 | 0, 1073739059 | 0, 1073739067 | 0,
  1073739089 | 0, 1073739101 | 0, 1073739143 | 0, 1073739151 | 0,
  1073739167 | 0, 1073739169 | 0, 1073739179 | 0, 1073739187 | 0,
  1073739307 | 0, 1073739311 | 0, 1073739313 | 0, 1073739347 | 0,
  1073739353 | 0, 1073739361 | 0, 1073739367 | 0, 1073739379 | 0,
  1073739421 | 0, 1073739437 | 0, 1073739449 | 0, 1073739451 | 0,
  1073739473 | 0, 1073739493 | 0, 1073739523 | 0, 1073739559 | 0,
  1073739577 | 0, 1073739599 | 0, 1073739617 | 0, 1073739619 | 0,
  1073739631 | 0, 1073739649 | 0, 1073739679 | 0, 1073739683 | 0,
  1073739721 | 0, 1073739739 | 0, 1073739749 | 0, 1073739767 | 0,
  1073739817 | 0, 1073739853 | 0, 1073739859 | 0, 1073739881 | 0,
  1073739883 | 0, 1073739893 | 0, 1073739911 | 0, 1073739917 | 0,
  1073739937 | 0, 1073739949 | 0, 1073739983 | 0, 1073740013 | 0,
  1073740049 | 0, 1073740061 | 0, 1073740067 | 0, 1073740079 | 0,
  1073740123 | 0, 1073740127 | 0, 1073740133 | 0, 1073740139 | 0,
  1073740147 | 0, 1073740163 | 0, 1073740177 | 0, 1073740183 | 0,
  1073740189 | 0, 1073740201 | 0, 1073740249 | 0, 1073740379 | 0,
  1073740391 | 0, 1073740403 | 0, 1073740439 | 0, 1073740463 | 0,
  1073740477 | 0, 1073740489 | 0, 1073740501 | 0, 1073740517 | 0,
  1073740523 | 0, 1073740529 | 0, 1073740537 | 0, 1073740541 | 0,
  1073740543 | 0, 1073740567 | 0, 1073740571 | 0, 1073740609 | 0,
  1073740649 | 0, 1073740691 | 0, 1073740693 | 0, 1073740697 | 0,
  1073740781 | 0, 1073740783 | 0, 1073740793 | 0, 1073740807 | 0,
  1073740819 | 0, 1073740847 | 0, 1073740853 | 0, 1073740879 | 0,
  1073740909 | 0, 1073740933 | 0, 1073740951 | 0, 1073740963 | 0,
  1073741047 | 0, 1073741077 | 0, 1073741101 | 0, 1073741173 | 0,
  1073741189 | 0, 1073741197 | 0, 1073741213 | 0, 1073741237 | 0,
  1073741287 | 0, 1073741309 | 0, 1073741311 | 0, 1073741329 | 0,
  1073741371 | 0, 1073741381 | 0, 1073741387 | 0, 1073741399 | 0,
  1073741419 | 0, 1073741441 | 0, 1073741467 | 0, 1073741477 | 0,
  1073741503 | 0, 1073741527 | 0, 1073741561 | 0, 1073741567 | 0,
  1073741621 | 0, 1073741651 | 0, 1073741663 | 0, 1073741671 | 0,
] as any

*Defined in [Hashing.ts:95](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L95)*

a dense array of primes to pick from
http://compoasso.free.fr/primelistweb/page/prime/liste_online_en.php
We want to ensure the invariant that, for any p,
2^30 >= p >= M.

___

### `Let` context

• **context**: *[IContext](../interfaces/_hashing_.icontext.md)* =  generateContext()

*Defined in [Hashing.ts:200](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L200)*

The stored current internal context

## Functions

###  UNSAFE_exposeCurrentContext

▸ **UNSAFE_exposeCurrentContext**(): *[IContext](../interfaces/_hashing_.icontext.md)*

*Defined in [Hashing.ts:486](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L486)*

Exposes the actual context object used by the hash function. Note that
updating this value will inadvertently cause all hashes to not equal to
previous hashes. If you need to get the current context to perform certain
actions, please use `getCurrentContext` instead.

**Returns:** *[IContext](../interfaces/_hashing_.icontext.md)*

the current context object

___

###  UNSAFE_hash

▸ **UNSAFE_hash**(`x`: number, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:214](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L214)*

Hashes a current machine word using the given context. This function is only
defined if the machine word in question is an integer. Undefined behaviour
will result if x is not a valid integer.

Also note that should x not be a 31-bit machine word, then the speed of this
function may be slowed down on 32-bit systems.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | number | a 31-bit machine word to be hashed. |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) | the context on which to hash. |

**Returns:** *Integer.Type*

the hashed machine word.

___

###  UNSAFE_hashBuffer

▸ **UNSAFE_hashBuffer**(`buffer`: ArrayBuffer, `initValue`: Integer.Type, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:250](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L250)*

Hashes a buffer using a given buffer and initial value. This algorithm
is O(n) worst-time on the buffer size. This algorithm assumes machine
endianness. This algorithm walks the buffer from left to right with stride
of 4 bytes, so make sure that buffer is a proper multiple.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buffer` | ArrayBuffer | the length of the buffer. Ensure that byte length is a multiple of 4. |
`initValue` | Integer.Type | a 31-bit machine word that represents the initial value to hash from |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) | the context to which the value is hashed.  |

**Returns:** *Integer.Type*

___

###  generateContext

▸ **generateContext**(): *[IContext](../interfaces/_hashing_.icontext.md)*

*Defined in [Hashing.ts:160](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L160)*

Generates a context for our hash function. This is equivalent to picking
a random hash in the hash family.

**Returns:** *[IContext](../interfaces/_hashing_.icontext.md)*

___

###  getCurrentContext

▸ **getCurrentContext**(): *[IContext](../interfaces/_hashing_.icontext.md)*

*Defined in [Hashing.ts:494](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L494)*

Provides a copy of the current context used by the hash function.

**Returns:** *[IContext](../interfaces/_hashing_.icontext.md)*

a copy of the cuurrent context object

___

###  hash

▸ **hash**(`obj`: any, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:370](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L370)*

Hashes an object to a number. Does not hash functions, symbols or bignums.
Hashing a top-level symbol or function will result in a TypeError being
thrown, hashing a symbol or bignum in an array or object value will result
in that value being replaced with a default value (i.e. all symbols and
functions hash to the same value), and setting a symbol as a object key
will result in that key and value being ignored in the hashing process.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`obj` | any | - | the object to hash |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | if provided, this context will be used. Otherwise, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  hashArray

▸ **hashArray**(`arr`: ArrayLike‹any›, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:425](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L425)*

Hashes an array or arraylike.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`arr` | ArrayLike‹any› | - | An array-like to hash. Note that string objects hashed with this function returns a different value than `hashString`. |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | if provided, this context will be used. Otherwise, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  hashFloat

▸ **hashFloat**(`n`: number, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:330](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L330)*

Hashes a JavaScript number as a floating point. This hash function differs
from `hashNumber` regarding the following:
1. Representations of `NaN` hash to different values. (e.g.
h(0x7ff0....0) != h(0x7fff....f))
2. `0` and `-0` are hashed to different values.
3. Does not distinguish between integers and floats. All values are hashed
as floats.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`n` | number | - | the number to be hashed |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | if provided, this context will be used. Otherwise, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  hashNumber

▸ **hashNumber**(`n`: number, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:292](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L292)*

Hashes a JavaScript number. This hash function has the following properties:
1. All representations of `NaN` hash to the same value.
2. `0` and `-0` hash to the same value.
3. Integers are hashed with a different algorithm than floats.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`n` | number | - | the number to be hashed. |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | if provided, this context will be used. Otherwise, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  hashObject

▸ **hashObject**(`obj`: any, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:456](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L456)*

Hashes an object. Note that this function uses `hash` function for
recursively hashing members. Values generated using hashObject for `null`,
string objects and arrays differ from values generated using `hash`.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`obj` | any | - | The object to hash |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | if provided, this context will be used. Otherwise, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  hashPrimitive

▸ **hashPrimitive**(`prim`: boolean | undefined | null, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:343](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L343)*

Hashes a "primitive" value, here boolean, undefined and null to their
respective counterparts.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`prim` | boolean &#124; undefined &#124; null | - | the "primitive" value to be hashed. |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | if provided, this context will be used. Otherwise, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  hashString

▸ **hashString**(`s`: string, `ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *Integer.Type*

*Defined in [Hashing.ts:271](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L271)*

Hashes a string using a given context

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`s` | string | - | The string to hash |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) |  context | An optional context to use. If not provided, will use the current stored context.  |

**Returns:** *Integer.Type*

___

###  randomInt

▸ **randomInt**(`fieldSize`: number): *Integer.Type*

*Defined in [Hashing.ts:152](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L152)*

Generate a random number in the field [n] almost uniformly.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fieldSize` | number | n (This is required to be a int31. However, the type definitions are relaxed to avoid extreneous typecasting in the following code, since this function is not exported anyway.)  |

**Returns:** *Integer.Type*

___

###  regenerateContext

▸ **regenerateContext**(): *[IContext](../interfaces/_hashing_.icontext.md)*

*Defined in [Hashing.ts:222](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L222)*

Regenerates a context for the internal hashing function.

**Returns:** *[IContext](../interfaces/_hashing_.icontext.md)*

the previously used context.

___

###  rot27

▸ **rot27**(`x`: Integer.Type): *Integer.Type*

*Defined in [Hashing.ts:195](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L195)*

Rotates a 31-bit number to the left by 27 bits, e.g.

          3         2         1         0
  rot27( 10111011010100111111001010101010 )
       = 01010111011010100111111001010101

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Integer.Type | the number to be rotated. |

**Returns:** *Integer.Type*

the rotated number.

___

###  setContext

▸ **setContext**(`ctx`: [IContext](../interfaces/_hashing_.icontext.md)): *[IContext](../interfaces/_hashing_.icontext.md)*

*Defined in [Hashing.ts:233](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L233)*

Updates the current context with a copy of the given context.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ctx` | [IContext](../interfaces/_hashing_.icontext.md) | The context to be set |

**Returns:** *[IContext](../interfaces/_hashing_.icontext.md)*

the previously used context.

___

###  validateContext

▸ **validateContext**(`ctx`: any): *boolean*

*Defined in [Hashing.ts:498](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Hashing.ts#L498)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | any |

**Returns:** *boolean*
