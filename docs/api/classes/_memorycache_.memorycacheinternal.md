[nasi](../globals.md) › ["MemoryCache"](../modules/_memorycache_.md) › [MemoryCacheInternal](_memorycache_.memorycacheinternal.md)

# Class: MemoryCacheInternal

## Hierarchy

* **MemoryCacheInternal**

## Implements

* [IDisposable](../interfaces/_disposable_.idisposable.md)

## Index

### Constructors

* [constructor](_memorycache_.memorycacheinternal.md#constructor)

### Properties

* [__computed](_memorycache_.memorycacheinternal.md#__computed)
* [cache](_memorycache_.memorycacheinternal.md#private-cache)

### Accessors

* [currentSize](_memorycache_.memorycacheinternal.md#currentsize)

### Methods

* [UNSAFE_get](_memorycache_.memorycacheinternal.md#unsafe_get)
* [UNSAFE_getLine](_memorycache_.memorycacheinternal.md#unsafe_getline)
* [UNSAFE_printAllCacheValues](_memorycache_.memorycacheinternal.md#unsafe_printallcachevalues)
* [UNSAFE_set](_memorycache_.memorycacheinternal.md#unsafe_set)
* [clear](_memorycache_.memorycacheinternal.md#clear)
* [constructCacheLine](_memorycache_.memorycacheinternal.md#private-constructcacheline)
* [get](_memorycache_.memorycacheinternal.md#get)
* [mapExpiryToAge](_memorycache_.memorycacheinternal.md#private-mapexpirytoage)
* [set](_memorycache_.memorycacheinternal.md#set)
* [setInternal](_memorycache_.memorycacheinternal.md#private-setinternal)

## Constructors

###  constructor

\+ **new MemoryCacheInternal**(`maxEntries`: number): *[MemoryCacheInternal](_memorycache_.memorycacheinternal.md)*

*Defined in [MemoryCache.ts:34](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`maxEntries` | number |

**Returns:** *[MemoryCacheInternal](_memorycache_.memorycacheinternal.md)*

## Properties

###  __computed

• **__computed**: *[Disposable](_disposable_.disposable.md)* =  new Disposable(this.clear.bind(this))

*Implementation of [IDisposable](../interfaces/_disposable_.idisposable.md).[__computed](../interfaces/_disposable_.idisposable.md#__computed)*

*Defined in [MemoryCache.ts:32](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L32)*

___

### `Private` cache

• **cache**: *LRUCache‹number, [ICacheLine](../interfaces/_memorycache_.icacheline.md)‹any, any››*

*Defined in [MemoryCache.ts:34](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L34)*

## Accessors

###  currentSize

• **get currentSize**(): *number*

*Defined in [MemoryCache.ts:28](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L28)*

**Returns:** *number*

## Methods

###  UNSAFE_get

▸ **UNSAFE_get**<**T**>(`key`: number): *Option.Type‹T›*

*Defined in [MemoryCache.ts:94](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L94)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`key` | number |

**Returns:** *Option.Type‹T›*

___

###  UNSAFE_getLine

▸ **UNSAFE_getLine**<**T**>(`key`: number): *Option.Type‹[ICacheLine](../interfaces/_memorycache_.icacheline.md)‹T, any››*

*Defined in [MemoryCache.ts:90](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L90)*

Returns the current cache line keyed by the precomputed hash. This will
not perform collision avoidance, but will remove the cache line should the
cache expires.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | number | the precomputed hash  |

**Returns:** *Option.Type‹[ICacheLine](../interfaces/_memorycache_.icacheline.md)‹T, any››*

___

###  UNSAFE_printAllCacheValues

▸ **UNSAFE_printAllCacheValues**(): *void*

*Defined in [MemoryCache.ts:121](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L121)*

**Returns:** *void*

___

###  UNSAFE_set

▸ **UNSAFE_set**<**T**>(`key`: number, `value`: T, `expiry?`: number | object): *void*

*Defined in [MemoryCache.ts:54](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L54)*

Perform a set operation with a precomputed hash. Doing this will NOT
perform any collision avoidance.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | number | the precomputed hash |
`value` | T | the data to cache |
`expiry?` | number &#124; object | if present, the epoch (in ms) that the data will expire. Defaults to 60 seconds from now.  |

**Returns:** *void*

___

###  clear

▸ **clear**(): *void*

*Defined in [MemoryCache.ts:117](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L117)*

**Returns:** *void*

___

### `Private` constructCacheLine

▸ **constructCacheLine**<**T**, **K**>(`key`: number | K, `value`: T): *[ICacheLine](../interfaces/_memorycache_.icacheline.md)‹T, K›*

*Defined in [MemoryCache.ts:133](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L133)*

**Type parameters:**

▪ **T**

▪ **K**

**Parameters:**

Name | Type |
------ | ------ |
`key` | number &#124; K |
`value` | T |

**Returns:** *[ICacheLine](../interfaces/_memorycache_.icacheline.md)‹T, K›*

___

###  get

▸ **get**<**T**, **K**>(`key`: K, `comparator?`: undefined | function): *undefined | T*

*Defined in [MemoryCache.ts:102](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L102)*

**Type parameters:**

▪ **T**

▪ **K**

**Parameters:**

Name | Type |
------ | ------ |
`key` | K |
`comparator?` | undefined &#124; function |

**Returns:** *undefined | T*

___

### `Private` mapExpiryToAge

▸ **mapExpiryToAge**(`expiry?`: number | object): *undefined | number*

*Defined in [MemoryCache.ts:140](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L140)*

**Parameters:**

Name | Type |
------ | ------ |
`expiry?` | number &#124; object |

**Returns:** *undefined | number*

___

###  set

▸ **set**<**T**, **K**>(`key`: K, `value`: T, `expiry?`: number | object): *void*

*Defined in [MemoryCache.ts:75](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L75)*

Updates the cache key with the said value. Note that this is dependent
on hash not colliding (which is unlikely).

**Type parameters:**

▪ **T**

▪ **K**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | the key to store |
`value` | T | the data to cache |
`expiry?` | number &#124; object | if present, the epoch (in ms) that the data will expire. Defaults to 60 seconds from now.  |

**Returns:** *void*

___

### `Private` setInternal

▸ **setInternal**(`hash`: number, `key`: any, `value`: any, `age?`: undefined | number): *void*

*Defined in [MemoryCache.ts:150](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`hash` | number |
`key` | any |
`value` | any |
`age?` | undefined &#124; number |

**Returns:** *void*
