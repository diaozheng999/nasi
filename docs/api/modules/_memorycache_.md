[nasi](../globals.md) › ["MemoryCache"](_memorycache_.md)

# External module: "MemoryCache"

## Index

### Classes

* [MemoryCacheInternal](../classes/_memorycache_.memorycacheinternal.md)

### Interfaces

* [ICacheLine](../interfaces/_memorycache_.icacheline.md)

### Variables

* [CACHE_DEFAULT_EXPIRY](_memorycache_.md#const-cache_default_expiry)
* [CACHE_SIZE](_memorycache_.md#const-cache_size)
* [MemoryCache](_memorycache_.md#const-memorycache)

### Functions

* [createMemoryCache](_memorycache_.md#creatememorycache)

## Variables

### `Const` CACHE_DEFAULT_EXPIRY

• **CACHE_DEFAULT_EXPIRY**: *60000* = 60000

*Defined in [MemoryCache.ts:19](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L19)*

The default time to expire (in milliseconds)

___

### `Const` CACHE_SIZE

• **CACHE_SIZE**: *4000* = 4000

*Defined in [MemoryCache.ts:15](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L15)*

The number of items to cache

___

### `Const` MemoryCache

• **MemoryCache**: *[MemoryCacheInternal](../classes/_memorycache_.memorycacheinternal.md)* =  new MemoryCacheInternal(CACHE_SIZE)

*Defined in [MemoryCache.ts:164](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L164)*

## Functions

###  createMemoryCache

▸ **createMemoryCache**(`cacheSize?`: undefined | number): *[MemoryCacheInternal](../classes/_memorycache_.memorycacheinternal.md)*

*Defined in [MemoryCache.ts:166](https://github.com/diaozheng999/nasi/blob/5f965cb/src/MemoryCache.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`cacheSize?` | undefined &#124; number |

**Returns:** *[MemoryCacheInternal](../classes/_memorycache_.memorycacheinternal.md)*
