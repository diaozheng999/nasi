[nasi](../globals.md) › ["Semaphore"](../modules/_semaphore_.md) › [Semaphore](_semaphore_.semaphore.md)

# Class: Semaphore

An asynchronous semaphore implementation that is useful when dealing with
promises.

## Hierarchy

* **Semaphore**

## Index

### Constructors

* [constructor](_semaphore_.semaphore.md#constructor)

### Properties

* [debugName](_semaphore_.semaphore.md#private-debugname)
* [pendingWaits](_semaphore_.semaphore.md#private-pendingwaits)
* [value](_semaphore_.semaphore.md#private-value)

### Accessors

* [identity](_semaphore_.semaphore.md#identity)

### Methods

* [signal](_semaphore_.semaphore.md#signal)
* [tryFlushPendingWaits](_semaphore_.semaphore.md#private-tryflushpendingwaits)
* [wait](_semaphore_.semaphore.md#wait)
* [sleep](_semaphore_.semaphore.md#static-sleep)

## Constructors

###  constructor

\+ **new Semaphore**(`initialValue`: number, `debugName?`: undefined | string): *[Semaphore](_semaphore_.semaphore.md)*

*Defined in [Semaphore.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`initialValue` | number |
`debugName?` | undefined &#124; string |

**Returns:** *[Semaphore](_semaphore_.semaphore.md)*

## Properties

### `Private` debugName

• **debugName**: *string* = ""

*Defined in [Semaphore.ts:21](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L21)*

___

### `Private` pendingWaits

• **pendingWaits**: *Array‹function›* =  []

*Defined in [Semaphore.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L23)*

___

### `Private` value

• **value**: *number*

*Defined in [Semaphore.ts:20](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L20)*

## Accessors

###  identity

• **get identity**(): *string*

*Defined in [Semaphore.ts:40](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L40)*

The debug identity helpful for debugging

**Returns:** *string*

## Methods

###  signal

▸ **signal**(): *void*

*Defined in [Semaphore.ts:94](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L94)*

The V (verhogen) operation.

**Returns:** *void*

___

### `Private` tryFlushPendingWaits

▸ **tryFlushPendingWaits**(): *void*

*Defined in [Semaphore.ts:99](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L99)*

**Returns:** *void*

___

###  wait

▸ **wait**(`rejectAfter?`: undefined | number): *Promise‹void›*

*Defined in [Semaphore.ts:61](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L61)*

The P (proberen) operation.

Use this ONLY as part of a promise or async function.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rejectAfter?` | undefined &#124; number | if truthy (i.e. non-0), will reject the promise after the stated number of milliseconds. In an async function, this will equate to an exception. if truthy and < 0, will reject immediately should lock fail to acquire.  |

**Returns:** *Promise‹void›*

a promise that resolves when the lock has been successfully
acquired, or rejects if the lock has not been acquired after `rejectAfter`
milliseconds.

When resolved, this resolves to an object that can call `dispose` to
release the lock.

___

### `Static` sleep

▸ **sleep**(`duration`: number): *Promise‹void›*

*Defined in [Semaphore.ts:16](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Semaphore.ts#L16)*

Returns a promise that resolves after a while.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`duration` | number | number of milliseconds to sleep for  |

**Returns:** *Promise‹void›*
