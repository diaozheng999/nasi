[nasi](../globals.md) › ["Types"](_types_.md)

# External module: "Types"

Types.ts

**`author`** Diao Zheng

**`file`** Common (more advanced) type patterns

**`ignore_test`** 

**`barrel`** export all

## Index

### Interfaces

* [ITyped](../interfaces/_types_.ityped.md)

### Type aliases

* [ArgumentTupleType](_types_.md#argumenttupletype)
* [ArgumentType](_types_.md#argumenttype)
* [Deprecated](_types_.md#deprecated)
* [ExcludeKeys](_types_.md#excludekeys)
* [Not](_types_.md#not)
* [Opaque](_types_.md#opaque)
* [ReturnType](_types_.md#returntype)

## Type aliases

###  ArgumentTupleType

Ƭ **ArgumentTupleType**: *ArgumentTupleType<T>*

*Defined in [Types.ts:25](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L25)*

___

###  ArgumentType

Ƭ **ArgumentType**: *ArgumentType<T>*

*Defined in [Types.ts:16](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L16)*

The argument type of T (which is a function).
(In TypeScript 3.2, the spread operator can be inferred)

___

###  Deprecated

Ƭ **Deprecated**: *"__deprecated__"*

*Defined in [Types.ts:56](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L56)*

**`deprecated`** this type literally refer to a string type in JSON or interface
member that is deprecated. This is needed whenever a string typed member is
needed in JSON or interface to take care backward comparability.

___

###  ExcludeKeys

Ƭ **ExcludeKeys**: *Pick‹T, Exclude‹keyof T, K››*

*Defined in [Types.ts:49](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L49)*

**`deprecated`** (TypeScript 3.5)
use `Omit` instead.

___

###  Not

Ƭ **Not**: *Not<U, T>*

*Defined in [Types.ts:58](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L58)*

___

###  Opaque

Ƭ **Opaque**: *T & object*

*Defined in [Types.ts:10](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L10)*

An opaque type of T with a phantom label.

___

###  ReturnType

Ƭ **ReturnType**: *ReturnType<T>*

*Defined in [Types.ts:31](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Types.ts#L31)*

Export the return type of T (which is a function).
