[nasi](../globals.md) › ["Mutex"](../modules/_mutex_.md) › [Mutex](_mutex_.mutex.md)

# Class: Mutex

A Mutex that guards against an exclusive resource when using async functions
or promises.

Although this is equivalent to a binary semaphore, IT IS NOT A SEMAPHORE.

## Hierarchy

* **Mutex**

## Index

### Constructors

* [constructor](_mutex_.mutex.md#constructor)

### Properties

* [semaphore](_mutex_.mutex.md#private-semaphore)

### Accessors

* [identity](_mutex_.mutex.md#identity)

### Methods

* [UNSAFE_AcquireReadonlyAccess](_mutex_.mutex.md#unsafe_acquirereadonlyaccess)
* [acquire](_mutex_.mutex.md#acquire)
* [guardedRelease](_mutex_.mutex.md#private-guardedrelease)
* [lock](_mutex_.mutex.md#lock)
* [release](_mutex_.mutex.md#private-release)

## Constructors

###  constructor

\+ **new Mutex**(`debugName?`: undefined | string): *[Mutex](_mutex_.mutex.md)*

*Defined in [Mutex.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`debugName?` | undefined &#124; string |

**Returns:** *[Mutex](_mutex_.mutex.md)*

## Properties

### `Private` semaphore

• **semaphore**: *[Semaphore](_semaphore_.semaphore.md)*

*Defined in [Mutex.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L23)*

## Accessors

###  identity

• **get identity**(): *string*

*Defined in [Mutex.ts:30](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L30)*

The debug identity helpful for debugging

**Returns:** *string*

## Methods

###  UNSAFE_AcquireReadonlyAccess

▸ **UNSAFE_AcquireReadonlyAccess**(`rejectAfter?`: undefined | number, `dependencies?`: [Lock](../modules/_mutex_.md#lock)[]): *Promise‹void›*

*Defined in [Mutex.ts:40](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L40)*

Blocks until the "writelock" aka blocking operation has finished.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rejectAfter?` | undefined &#124; number | the number of milliseconds to wait before rejecting the lock attempt |
`dependencies?` | [Lock](../modules/_mutex_.md#lock)[] | a list of dependent locks to prevent some deadlocks.  |

**Returns:** *Promise‹void›*

___

###  acquire

▸ **acquire**(`rejectAfter?`: undefined | number, `dependencies?`: [Lock](../modules/_mutex_.md#lock)[]): *Promise‹[Lock](../modules/_mutex_.md#lock)›*

*Defined in [Mutex.ts:48](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`rejectAfter?` | undefined &#124; number |
`dependencies?` | [Lock](../modules/_mutex_.md#lock)[] |

**Returns:** *Promise‹[Lock](../modules/_mutex_.md#lock)›*

___

### `Private` guardedRelease

▸ **guardedRelease**(`dependencies`: [Disposable](_disposable_.disposable.md)[]): *void*

*Defined in [Mutex.ts:76](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`dependencies` | [Disposable](_disposable_.disposable.md)[] |

**Returns:** *void*

___

###  lock

▸ **lock**<**T**>(`fn`: function, `rejectAfter?`: undefined | number): *Promise‹T›*

*Defined in [Mutex.ts:62](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L62)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **fn**: *function*

▸ (): *Promise‹T›*

▪`Optional`  **rejectAfter**: *undefined | number*

**Returns:** *Promise‹T›*

___

### `Private` release

▸ **release**(): *void*

*Defined in [Mutex.ts:72](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Mutex.ts#L72)*

**Returns:** *void*
