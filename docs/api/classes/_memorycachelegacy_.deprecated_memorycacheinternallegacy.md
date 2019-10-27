[nasi](../globals.md) › ["MemoryCacheLegacy"](../modules/_memorycachelegacy_.md) › [DEPRECATED_MemoryCacheInternalLegacy](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md)

# Class: DEPRECATED_MemoryCacheInternalLegacy

## Hierarchy

* **DEPRECATED_MemoryCacheInternalLegacy**

## Index

### Constructors

* [constructor](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#constructor)

### Properties

* [cache](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#private-cache)
* [maxEntries](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#private-maxentries)
* [trimThreshold](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#private-trimthreshold)

### Accessors

* [currentSize](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#currentsize)

### Methods

* [UNSAFE_get](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#unsafe_get)
* [UNSAFE_getLine](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#unsafe_getline)
* [UNSAFE_printAllCacheValues](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#unsafe_printallcachevalues)
* [UNSAFE_set](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#unsafe_set)
* [clear](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#clear)
* [constructCacheLine](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#private-constructcacheline)
* [get](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#get)
* [set](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#set)
* [setInternal](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#private-setinternal)
* [trim](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md#private-trim)

## Constructors

###  constructor

\+ **new DEPRECATED_MemoryCacheInternalLegacy**(`maxEntries`: number): *[DEPRECATED_MemoryCacheInternalLegacy](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md)*

*Defined in [MemoryCacheLegacy.ts:34](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`maxEntries` | number |

**Returns:** *[DEPRECATED_MemoryCacheInternalLegacy](_memorycachelegacy_.deprecated_memorycacheinternallegacy.md)*

## Properties

### `Private` cache

• **cache**: *SplayTree‹number, [ICacheLine](../interfaces/_memorycachelegacy_.icacheline.md)‹any, any››*

*Defined in [MemoryCacheLegacy.ts:32](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L32)*

___

### `Private` maxEntries

• **maxEntries**: *number*

*Defined in [MemoryCacheLegacy.ts:33](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L33)*

___

### `Private` trimThreshold

• **trimThreshold**: *number*

*Defined in [MemoryCacheLegacy.ts:34](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L34)*

## Accessors

###  currentSize

• **get currentSize**(): *number*

*Defined in [MemoryCacheLegacy.ts:29](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L29)*

**Returns:** *number*

## Methods

###  UNSAFE_get

▸ **UNSAFE_get**<**T**>(`key`: number): *Option.Type‹T›*

*Defined in [MemoryCacheLegacy.ts:95](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L95)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`key` | number |

**Returns:** *Option.Type‹T›*

___

###  UNSAFE_getLine

▸ **UNSAFE_getLine**<**T**>(`key`: number): *Option.Type‹[ICacheLine](../interfaces/_memorycachelegacy_.icacheline.md)‹T, any››*

*Defined in [MemoryCacheLegacy.ts:78](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L78)*

Returns the current cache line keyed by the precomputed hash. This will
not perform collision avoidance, but will remove the cache line should the
cache expires.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | number | the precomputed hash  |

**Returns:** *Option.Type‹[ICacheLine](../interfaces/_memorycachelegacy_.icacheline.md)‹T, any››*

___

###  UNSAFE_printAllCacheValues

▸ **UNSAFE_printAllCacheValues**(): *void*

*Defined in [MemoryCacheLegacy.ts:122](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L122)*

**Returns:** *void*

___

###  UNSAFE_set

▸ **UNSAFE_set**<**T**>(`key`: number, `value`: T, `expiry?`: undefined | number): *void*

*Defined in [MemoryCacheLegacy.ts:56](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L56)*

Perform a set operation with a precomputed hash. Doing this will NOT
perform any collision avoidance.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | number | the precomputed hash |
`value` | T | the data to cache |
`expiry?` | undefined &#124; number | if present, the epoch (in ms) that the data will expire. Defaults to 60 seconds from now.  |

**Returns:** *void*

___

###  clear

▸ **clear**(): *void*

*Defined in [MemoryCacheLegacy.ts:118](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L118)*

**Returns:** *void*

___

### `Private` constructCacheLine

▸ **constructCacheLine**<**T**, **K**>(`key`: number | K, `value`: T, `expiry?`: undefined | number): *[ICacheLine](../interfaces/_memorycachelegacy_.icacheline.md)‹T, K›*

*Defined in [MemoryCacheLegacy.ts:134](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L134)*

**Type parameters:**

▪ **T**

▪ **K**

**Parameters:**

Name | Type |
------ | ------ |
`key` | number &#124; K |
`value` | T |
`expiry?` | undefined &#124; number |

**Returns:** *[ICacheLine](../interfaces/_memorycachelegacy_.icacheline.md)‹T, K›*

___

###  get

▸ **get**<**T**, **K**>(`key`: K, `comparator?`: undefined | function): *undefined | T*

*Defined in [MemoryCacheLegacy.ts:103](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L103)*

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

###  set

▸ **set**<**T**, **K**>(`key`: K, `value`: T, `expiry?`: undefined | number): *void*

*Defined in [MemoryCacheLegacy.ts:68](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L68)*

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
`expiry?` | undefined &#124; number | if present, the epoch (in ms) that the data will expire. Defaults to 60 seconds from now.  |

**Returns:** *void*

___

### `Private` setInternal

▸ **setInternal**(`hash`: number, `key`: any, `value`: any, `expiry?`: undefined | number): *void*

*Defined in [MemoryCacheLegacy.ts:150](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`hash` | number |
`key` | any |
`value` | any |
`expiry?` | undefined &#124; number |

**Returns:** *void*

___

### `Private` trim

▸ **trim**(): *void*

*Defined in [MemoryCacheLegacy.ts:163](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCacheLegacy.ts#L163)*

**Returns:** *void*
