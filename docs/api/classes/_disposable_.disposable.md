[nasi](../globals.md) › ["Disposable"](../modules/_disposable_.md) › [Disposable](_disposable_.disposable.md)

# Class: Disposable

## Hierarchy

* **Disposable**

## Index

### Constructors

* [constructor](_disposable_.disposable.md#constructor)

### Properties

* [disposeFunction](_disposable_.disposable.md#private-disposefunction)
* [disposed](_disposable_.disposable.md#private-disposed)
* [Dispose](_disposable_.disposable.md#static-dispose)
* [Instance](_disposable_.disposable.md#static-instance)
* [IsDisposed](_disposable_.disposable.md#static-isdisposed)

### Accessors

* [isDisposed](_disposable_.disposable.md#isdisposed)

### Methods

* [dispose](_disposable_.disposable.md#dispose)
* [dispose](_disposable_.disposable.md#static-dispose)
* [tryDispose](_disposable_.disposable.md#static-trydispose)

## Constructors

###  constructor

\+ **new Disposable**(`disposeFunction`: function): *[Disposable](_disposable_.disposable.md)*

*Defined in [Disposable.ts:79](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L79)*

**Parameters:**

▪ **disposeFunction**: *function*

▸ (): *void*

**Returns:** *[Disposable](_disposable_.disposable.md)*

## Properties

### `Private` disposeFunction

• **disposeFunction**: *function*

*Defined in [Disposable.ts:79](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L79)*

#### Type declaration:

▸ (): *void*

___

### `Private` disposed

• **disposed**: *boolean* = false

*Defined in [Disposable.ts:78](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L78)*

___

### `Static` Dispose

▪ **Dispose**: *unique symbol* =  DISPOSE

*Defined in [Disposable.ts:43](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L43)*

___

### `Static` Instance

▪ **Instance**: *unique symbol* =  DISPOSABLE

*Defined in [Disposable.ts:45](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L45)*

___

### `Static` IsDisposed

▪ **IsDisposed**: *unique symbol* =  IS_DISPOSED

*Defined in [Disposable.ts:44](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L44)*

## Accessors

###  isDisposed

• **get isDisposed**(): *boolean*

*Defined in [Disposable.ts:102](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L102)*

**Returns:** *boolean*

## Methods

###  dispose

▸ **dispose**(): *void*

*Defined in [Disposable.ts:88](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L88)*

Execute the internally stored dispose function once and only once.

**Returns:** *void*

___

### `Static` dispose

▸ **dispose**(`disposable`: [DisposableType](../modules/_disposable_.md#disposabletype)): *void*

*Defined in [Disposable.ts:60](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`disposable` | [DisposableType](../modules/_disposable_.md#disposabletype) |

**Returns:** *void*

___

### `Static` tryDispose

▸ **tryDispose**(`disposable`: any): *void*

*Defined in [Disposable.ts:47](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`disposable` | any |

**Returns:** *void*
