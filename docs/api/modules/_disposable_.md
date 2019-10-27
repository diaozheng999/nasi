[nasi](../globals.md) › ["Disposable"](_disposable_.md)

# External module: "Disposable"

## Index

### Classes

* [Disposable](../classes/_disposable_.disposable.md)

### Interfaces

* [ICustomDisposable](../interfaces/_disposable_.icustomdisposable.md)
* [IDisposable](../interfaces/_disposable_.idisposable.md)

### Type aliases

* [DisposableType](_disposable_.md#disposabletype)

### Variables

* [DISPOSABLE](_disposable_.md#const-disposable)
* [DISPOSE](_disposable_.md#const-dispose)
* [IS_DISPOSED](_disposable_.md#const-is_disposed)

### Functions

* [isCustomDisposable](_disposable_.md#iscustomdisposable)

## Type aliases

###  DisposableType

Ƭ **DisposableType**: *[IDisposable](../interfaces/_disposable_.idisposable.md) | [ICustomDisposable](../interfaces/_disposable_.icustomdisposable.md) | [Disposable](../classes/_disposable_.disposable.md)*

*Defined in [Disposable.ts:26](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L26)*

## Variables

### `Const` DISPOSABLE

• **DISPOSABLE**: *unique symbol* =  Symbol.for("nasi/DISPOSABLE")

*Defined in [Disposable.ts:12](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L12)*

___

### `Const` DISPOSE

• **DISPOSE**: *unique symbol* =  Symbol.for("nasi/DISPOSE")

*Defined in [Disposable.ts:10](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L10)*

___

### `Const` IS_DISPOSED

• **IS_DISPOSED**: *unique symbol* =  Symbol.for("nasi/IS_DISPOSED")

*Defined in [Disposable.ts:11](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L11)*

## Functions

###  isCustomDisposable

▸ **isCustomDisposable**(`disposable`: [DisposableType](_disposable_.md#disposabletype)): *boolean*

*Defined in [Disposable.ts:32](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Disposable.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`disposable` | [DisposableType](_disposable_.md#disposabletype) |

**Returns:** *boolean*
