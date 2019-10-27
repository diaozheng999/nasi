[nasi](../globals.md) › ["F"](_f_.md)

# External module: "F"

## Index

### Type aliases

* [ChainedFunc](_f_.md#chainedfunc)
* [Func](_f_.md#func)
* [MemoisedFunc](_f_.md#memoisedfunc)
* [Predicate](_f_.md#predicate)
* [Type](_f_.md#type)

### Variables

* [CHAIN_HEAD](_f_.md#const-chain_head)
* [CHAIN_TAIL](_f_.md#const-chain_tail)
* [MEMO](_f_.md#const-memo)
* [UNIT](_f_.md#const-unit)

### Functions

* [chain](_f_.md#chain)
* [compose](_f_.md#compose)
* [curry](_f_.md#curry)
* [curry2](_f_.md#curry2)
* [curryRight](_f_.md#curryright)
* [getFromMemoisation](_f_.md#getfrommemoisation)
* [getMap](_f_.md#getmap)
* [isChained](_f_.md#ischained)
* [isMemoised](_f_.md#ismemoised)
* [memoise](_f_.md#memoise)
* [memoisedExecutor](_f_.md#memoisedexecutor)
* [normalise](_f_.md#normalise)
* [pipe](_f_.md#pipe)
* [updateMemoisation](_f_.md#updatememoisation)

## Type aliases

###  ChainedFunc

Ƭ **ChainedFunc**: *[Func](_f_.md#func)‹TArgs, TReturn› & object*

*Defined in [F.ts:29](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L29)*

___

###  Func

Ƭ **Func**: *function*

*Defined in [F.ts:11](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L11)*

#### Type declaration:

▸ (...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TArgs |

___

###  MemoisedFunc

Ƭ **MemoisedFunc**: *[Func](_f_.md#func)‹TArgs, TReturn› & object*

*Defined in [F.ts:24](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L24)*

___

###  Predicate

Ƭ **Predicate**: *[Func](_f_.md#func)‹[T], boolean›*

*Defined in [F.ts:15](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L15)*

___

###  Type

Ƭ **Type**: *[Func](_f_.md#func)‹TArgs, TReturn›*

*Defined in [F.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L13)*

## Variables

### `Const` CHAIN_HEAD

• **CHAIN_HEAD**: *unique symbol* =  Symbol("nasi/CHAIN_HEAD")

*Defined in [F.ts:17](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L17)*

___

### `Const` CHAIN_TAIL

• **CHAIN_TAIL**: *unique symbol* =  Symbol("nasi/CHAIN_TAIL")

*Defined in [F.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L18)*

___

### `Const` MEMO

• **MEMO**: *unique symbol* =  Symbol("nasi/MEMO")

*Defined in [F.ts:20](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L20)*

___

### `Const` UNIT

• **UNIT**: *unique symbol* =  Symbol("nasi/UNIT")

*Defined in [F.ts:22](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L22)*

## Functions

###  chain

▸ **chain**<**TArgs**, **TIntermediate**, **TReturn**>(`f1`: [Func](_f_.md#func)‹TArgs, TIntermediate›, `f2`: [Func](_f_.md#func)‹[TIntermediate], TReturn›): *[Func](_f_.md#func)‹TArgs, TReturn›*

*Defined in [F.ts:56](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L56)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TIntermediate**

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f1` | [Func](_f_.md#func)‹TArgs, TIntermediate› |
`f2` | [Func](_f_.md#func)‹[TIntermediate], TReturn› |

**Returns:** *[Func](_f_.md#func)‹TArgs, TReturn›*

___

###  compose

▸ **compose**<**TArgs**, **TIntermediate**, **TReturn**>(`f1`: [Func](_f_.md#func)‹[TIntermediate], TReturn›, `f2`: [Func](_f_.md#func)‹TArgs, TIntermediate›): *function*

*Defined in [F.ts:80](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L80)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TIntermediate**

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f1` | [Func](_f_.md#func)‹[TIntermediate], TReturn› |
`f2` | [Func](_f_.md#func)‹TArgs, TIntermediate› |

**Returns:** *function*

▸ (...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TArgs |

___

###  curry

▸ **curry**<**T1**, **TArgs**, **TReturn**>(`f`: function): *[Func](_f_.md#func)‹[T1], [Func](_f_.md#func)‹TArgs, TReturn››*

*Defined in [F.ts:164](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L164)*

**Type parameters:**

▪ **T1**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

▪ **f**: *function*

▸ (`arg0`: T1, ...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | T1 |
`...args` | TArgs |

**Returns:** *[Func](_f_.md#func)‹[T1], [Func](_f_.md#func)‹TArgs, TReturn››*

___

###  curry2

▸ **curry2**<**T0**, **T1**, **TArgs**, **TReturn**>(`f`: function): *[Func](_f_.md#func)‹[T0, T1], [Func](_f_.md#func)‹TArgs, TReturn››*

*Defined in [F.ts:170](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L170)*

**Type parameters:**

▪ **T0**

▪ **T1**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

▪ **f**: *function*

▸ (`arg0`: T0, `arg1`: T1, ...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | T0 |
`arg1` | T1 |
`...args` | TArgs |

**Returns:** *[Func](_f_.md#func)‹[T0, T1], [Func](_f_.md#func)‹TArgs, TReturn››*

___

###  curryRight

▸ **curryRight**<**T0**, **T1**, **TArgs**, **TReturn**>(`f`: function): *[Func](_f_.md#func)‹[T1], function›*

*Defined in [F.ts:176](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L176)*

**Type parameters:**

▪ **T0**

▪ **T1**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

▪ **f**: *function*

▸ (`arg0`: T0, `arg1`: T1, ...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`arg0` | T0 |
`arg1` | T1 |
`...args` | TArgs |

**Returns:** *[Func](_f_.md#func)‹[T1], function›*

___

###  getFromMemoisation

▸ **getFromMemoisation**<**TArgs**, **TReturn**>(`memoised`: Map‹any, any›, `args`: TArgs): *[Option](_option_.md#option)‹TReturn›*

*Defined in [F.ts:114](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L114)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`memoised` | Map‹any, any› |
`args` | TArgs |

**Returns:** *[Option](_option_.md#option)‹TReturn›*

___

###  getMap

▸ **getMap**<**TArgs**, **TReturn**>(`memoised`: Map‹any, any›, `args`: TArgs): *Map‹unique symbol, TReturn›*

*Defined in [F.ts:94](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L94)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`memoised` | Map‹any, any› |
`args` | TArgs |

**Returns:** *Map‹unique symbol, TReturn›*

___

###  isChained

▸ **isChained**<**TArgs**, **TIntermediate**, **TReturn**>(`f`: [Func](_f_.md#func)‹TArgs, TReturn›): *boolean*

*Defined in [F.ts:35](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L35)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TIntermediate**

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Func](_f_.md#func)‹TArgs, TReturn› |

**Returns:** *boolean*

___

###  isMemoised

▸ **isMemoised**<**TArgs**, **TReturn**>(`f`: [Func](_f_.md#func)‹TArgs, TReturn›): *boolean*

*Defined in [F.ts:41](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L41)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Func](_f_.md#func)‹TArgs, TReturn› |

**Returns:** *boolean*

___

###  memoise

▸ **memoise**<**TArgs**, **TReturn**>(`func`: [Func](_f_.md#func)‹TArgs, TReturn›): *[MemoisedFunc](_f_.md#memoisedfunc)‹TArgs, TReturn›*

*Defined in [F.ts:146](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L146)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`func` | [Func](_f_.md#func)‹TArgs, TReturn› |

**Returns:** *[MemoisedFunc](_f_.md#memoisedfunc)‹TArgs, TReturn›*

___

###  memoisedExecutor

▸ **memoisedExecutor**<**TArgs**, **TReturn**>(`memoised`: Map‹TArgs, TReturn›, `func`: [Func](_f_.md#func)‹TArgs, TReturn›, ...`args`: TArgs): *TReturn*

*Defined in [F.ts:131](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L131)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`memoised` | Map‹TArgs, TReturn› |
`func` | [Func](_f_.md#func)‹TArgs, TReturn› |
`...args` | TArgs |

**Returns:** *TReturn*

___

###  normalise

▸ **normalise**<**TArgs**, **TReturn**>(`f`: [Func](_f_.md#func)‹TArgs, TReturn›): *[Func](_f_.md#func)‹TArgs, TReturn›*

*Defined in [F.ts:47](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L47)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Func](_f_.md#func)‹TArgs, TReturn› |

**Returns:** *[Func](_f_.md#func)‹TArgs, TReturn›*

___

###  pipe

▸ **pipe**<**TArgs**, **TIntermediate**, **TReturn**>(`f1`: [Func](_f_.md#func)‹TArgs, TIntermediate›, `f2`: [Func](_f_.md#func)‹[TIntermediate], TReturn›): *function*

*Defined in [F.ts:87](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L87)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TIntermediate**

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f1` | [Func](_f_.md#func)‹TArgs, TIntermediate› |
`f2` | [Func](_f_.md#func)‹[TIntermediate], TReturn› |

**Returns:** *function*

▸ (...`args`: TArgs): *TReturn*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TArgs |

___

###  updateMemoisation

▸ **updateMemoisation**<**TArgs**, **TReturn**>(`memoised`: Map‹any, any›, `args`: TArgs, `value`: TReturn): *Map‹unique symbol, TReturn›*

*Defined in [F.ts:122](https://github.com/diaozheng999/nasi/blob/5f965cb/src/F.ts#L122)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`memoised` | Map‹any, any› |
`args` | TArgs |
`value` | TReturn |

**Returns:** *Map‹unique symbol, TReturn›*
