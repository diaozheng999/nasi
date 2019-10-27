[nasi](../globals.md) › ["P"](_p_.md)

# External module: "P"

## Index

### Type aliases

* [ConjunctionPredicate](_p_.md#conjunctionpredicate)
* [DisjunctionPredicate](_p_.md#disjunctionpredicate)
* [NegatedPredicate](_p_.md#negatedpredicate)
* [Predicate](_p_.md#predicate)
* [Type](_p_.md#type)
* [Typed](_p_.md#typed)
* [TypedPredicate](_p_.md#typedpredicate)

### Variables

* [CONJUNCTION](_p_.md#const-conjunction)
* [DISJUNCTION](_p_.md#const-disjunction)
* [NEGATE](_p_.md#const-negate)

### Functions

* [always](_p_.md#always)
* [and](_p_.md#and)
* [boundConjunctionExecutor](_p_.md#boundconjunctionexecutor)
* [boundDisjunctionExecutor](_p_.md#bounddisjunctionexecutor)
* [branch](_p_.md#branch)
* [eq](_p_.md#eq)
* [exists](_p_.md#exists)
* [existsWith](_p_.md#existswith)
* [infer](_p_.md#infer)
* [is](_p_.md#is)
* [isConjunction](_p_.md#isconjunction)
* [isDisjunction](_p_.md#isdisjunction)
* [isNegatable](_p_.md#isnegatable)
* [matches](_p_.md#matches)
* [never](_p_.md#never)
* [not](_p_.md#not)
* [or](_p_.md#or)
* [pred](_p_.md#pred)

## Type aliases

###  ConjunctionPredicate

Ƭ **ConjunctionPredicate**: *[Predicate](_p_.md#predicate)‹T› & object*

*Defined in [P.ts:25](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L25)*

___

###  DisjunctionPredicate

Ƭ **DisjunctionPredicate**: *[Predicate](_p_.md#predicate)‹T› & object*

*Defined in [P.ts:28](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L28)*

___

###  NegatedPredicate

Ƭ **NegatedPredicate**: *[Predicate](_p_.md#predicate)‹T› & object*

*Defined in [P.ts:24](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L24)*

___

###  Predicate

Ƭ **Predicate**: *function*

*Defined in [P.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L13)*

#### Type declaration:

▸ (`arg`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | T |

___

###  Type

Ƭ **Type**: *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:16](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L16)*

___

###  Typed

Ƭ **Typed**: *[TypedPredicate](_p_.md#typedpredicate)‹T, Q›*

*Defined in [P.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L18)*

___

###  TypedPredicate

Ƭ **TypedPredicate**: *function*

*Defined in [P.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L14)*

#### Type declaration:

▸ (`arg`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`arg` | T |

## Variables

### `Const` CONJUNCTION

• **CONJUNCTION**: *unique symbol* =  Symbol("nasi/CONJUNCTION")

*Defined in [P.ts:21](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L21)*

___

### `Const` DISJUNCTION

• **DISJUNCTION**: *unique symbol* =  Symbol("nasi/DISJUNCTION")

*Defined in [P.ts:22](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L22)*

___

### `Const` NEGATE

• **NEGATE**: *unique symbol* =  Symbol("nasi/NEGATE")

*Defined in [P.ts:20](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L20)*

## Functions

###  always

▸ **always**(`__`: any): *boolean*

*Defined in [P.ts:48](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`__` | any |

**Returns:** *boolean*

___

###  and

▸ **and**<**T**>(...`predicates`: Array‹[Predicate](_p_.md#predicate)‹T››): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:117](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L117)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...predicates` | Array‹[Predicate](_p_.md#predicate)‹T›› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  boundConjunctionExecutor

▸ **boundConjunctionExecutor**<**T**>(`predicates`: Array‹[Predicate](_p_.md#predicate)‹T››, `arg`: T): *boolean*

*Defined in [P.ts:93](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L93)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`predicates` | Array‹[Predicate](_p_.md#predicate)‹T›› |
`arg` | T |

**Returns:** *boolean*

___

###  boundDisjunctionExecutor

▸ **boundDisjunctionExecutor**<**T**>(`predicates`: Array‹[Predicate](_p_.md#predicate)‹T››, `arg`: T): *boolean*

*Defined in [P.ts:105](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L105)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`predicates` | Array‹[Predicate](_p_.md#predicate)‹T›› |
`arg` | T |

**Returns:** *boolean*

___

###  branch

▸ **branch**<**T**>(`predicate`: [Predicate](_p_.md#predicate)‹T›, `ifTrue`: [Predicate](_p_.md#predicate)‹T›, `ifFalse`: [Predicate](_p_.md#predicate)‹T›): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:178](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L178)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](_p_.md#predicate)‹T› |
`ifTrue` | [Predicate](_p_.md#predicate)‹T› |
`ifFalse` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  eq

▸ **eq**<**T**>(`obj`: T): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:56](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L56)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`obj` | T |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  exists

▸ **exists**<**T**>(`key`: keyof T): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:191](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L191)*

**Type parameters:**

▪ **T**: *__type*

**Parameters:**

Name | Type |
------ | ------ |
`key` | keyof T |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  existsWith

▸ **existsWith**<**T**, **K**>(`key`: K, `predicate`: [Predicate](_p_.md#predicate)‹T[K]›): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:195](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L195)*

**Type parameters:**

▪ **T**: *__type*

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`key` | K |
`predicate` | [Predicate](_p_.md#predicate)‹T[K]› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  infer

▸ **infer**<**T**>(`precedant`: [Predicate](_p_.md#predicate)‹T›, `antecedent`: [Predicate](_p_.md#predicate)‹T›): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:171](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L171)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`precedant` | [Predicate](_p_.md#predicate)‹T› |
`antecedent` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  is

▸ **is**<**T**>(`obj`: T): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:52](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L52)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`obj` | T |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  isConjunction

▸ **isConjunction**<**T**>(`p`: [Predicate](_p_.md#predicate)‹T›): *boolean*

*Defined in [P.ts:36](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L36)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *boolean*

___

###  isDisjunction

▸ **isDisjunction**<**T**>(`p`: [Predicate](_p_.md#predicate)‹T›): *boolean*

*Defined in [P.ts:40](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L40)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *boolean*

___

###  isNegatable

▸ **isNegatable**<**T**>(`p`: [Predicate](_p_.md#predicate)‹T›): *boolean*

*Defined in [P.ts:32](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L32)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *boolean*

___

###  matches

▸ **matches**(`regex`: RegExp): *[Predicate](_p_.md#predicate)‹string›*

*Defined in [P.ts:60](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`regex` | RegExp |

**Returns:** *[Predicate](_p_.md#predicate)‹string›*

___

###  never

▸ **never**(`__`: any): *boolean*

*Defined in [P.ts:44](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`__` | any |

**Returns:** *boolean*

___

###  not

▸ **not**<**T**, **Q**>(`predicate`: [Typed](_p_.md#typed)‹T, Q›): *[Typed](_p_.md#typed)‹T, Types.Not‹T, Q››*

*Defined in [P.ts:64](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L64)*

**Type parameters:**

▪ **T**

▪ **Q**: *T*

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Typed](_p_.md#typed)‹T, Q› |

**Returns:** *[Typed](_p_.md#typed)‹T, Types.Not‹T, Q››*

▸ **not**<**T**>(`predicate`: [Predicate](_p_.md#predicate)‹T›): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:67](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L67)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  or

▸ **or**<**T**>(...`predicates`: Array‹[Predicate](_p_.md#predicate)‹T››): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:144](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L144)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`...predicates` | Array‹[Predicate](_p_.md#predicate)‹T›› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*

___

###  pred

▸ **pred**<**T**>(`predicate`: [Predicate](_p_.md#predicate)‹T›): *[Predicate](_p_.md#predicate)‹T›*

*Defined in [P.ts:206](https://github.com/diaozheng999/nasi/blob/5f965cb/src/P.ts#L206)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`predicate` | [Predicate](_p_.md#predicate)‹T› |

**Returns:** *[Predicate](_p_.md#predicate)‹T›*
