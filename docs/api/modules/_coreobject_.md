[nasi](../globals.md) › ["CoreObject"](_coreobject_.md)

# External module: "CoreObject"

## Index

### Functions

* [keys](_coreobject_.md#keys)
* [split](_coreobject_.md#split)

## Functions

###  keys

▸ **keys**<**K**>(`obj`: K): *IterableIterator‹keyof K›*

*Defined in [CoreObject.ts:10](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CoreObject.ts#L10)*

**Type parameters:**

▪ **K**: *__type*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | K |

**Returns:** *IterableIterator‹keyof K›*

___

###  split

▸ **split**<**K**, **S**>(`obj`: K, `keysToKeep`: keyof S[]): *keyof [Pick<K, S>, Pick<K, Exclude<keyof K, S>>]*

*Defined in [CoreObject.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/CoreObject.ts#L18)*

**Type parameters:**

▪ **K**: *__type*

▪ **S**: *keyof K*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | K |
`keysToKeep` | keyof S[] |

**Returns:** *keyof [Pick<K, S>, Pick<K, Exclude<keyof K, S>>]*
