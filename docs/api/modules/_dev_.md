[nasi](../globals.md) › ["Dev"](_dev_.md)

# External module: "Dev"

## Index

### Variables

* [inDevMode](_dev_.md#let-indevmode)

### Functions

* [devOnly](_dev_.md#devonly)
* [select](_dev_.md#select)
* [setDevMode](_dev_.md#setdevmode)

## Variables

### `Let` inDevMode

• **inDevMode**: *boolean* = false

*Defined in [Dev.ts:8](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Dev.ts#L8)*

Dev.ts

**`author`** Diao Zheng

**`file`** External development flags

**`barrel`** export all

## Functions

###  devOnly

▸ **devOnly**<**TArgs**>(`thunk`: function, ...`args`: TArgs): *void*

*Defined in [Dev.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Dev.ts#L14)*

**Type parameters:**

▪ **TArgs**: *any[]*

**Parameters:**

▪ **thunk**: *function*

▸ (...`args`: TArgs): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TArgs |

▪... **args**: *TArgs*

**Returns:** *void*

___

###  select

▸ **select**<**TArgs**, **TReturn**>(`devMode`: function, `prodMode`: function, ...`args`: TArgs): *TReturn*

*Defined in [Dev.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Dev.ts#L23)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

▪ **devMode**: *function*

▸ (...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TArgs |

▪ **prodMode**: *function*

▸ (...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TArgs |

▪... **args**: *TArgs*

**Returns:** *TReturn*

___

###  setDevMode

▸ **setDevMode**(`mode`: boolean): *void*

*Defined in [Dev.ts:10](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Dev.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | boolean |

**Returns:** *void*
