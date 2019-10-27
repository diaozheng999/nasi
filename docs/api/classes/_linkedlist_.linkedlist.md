[nasi](../globals.md) › ["LinkedList"](../modules/_linkedlist_.md) › [LinkedList](_linkedlist_.linkedlist.md)

# Class: LinkedList <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **LinkedList**

## Implements

* Iterable‹T›

## Index

### Constructors

* [constructor](_linkedlist_.linkedlist.md#constructor)

### Properties

* [head](_linkedlist_.linkedlist.md#private-head)
* [length](_linkedlist_.linkedlist.md#length)
* [tail](_linkedlist_.linkedlist.md#private-tail)

### Methods

* [__@iterator](_linkedlist_.linkedlist.md#__@iterator)
* [addToEnd](_linkedlist_.linkedlist.md#addtoend)
* [addToFront](_linkedlist_.linkedlist.md#addtofront)
* [drain](_linkedlist_.linkedlist.md#drain)
* [pop](_linkedlist_.linkedlist.md#pop)
* [push](_linkedlist_.linkedlist.md#push)
* [removeFromEnd](_linkedlist_.linkedlist.md#removefromend)
* [removeFromFront](_linkedlist_.linkedlist.md#removefromfront)
* [shift](_linkedlist_.linkedlist.md#shift)
* [unshift](_linkedlist_.linkedlist.md#unshift)

## Constructors

###  constructor

\+ **new LinkedList**(...`items`: T[]): *[LinkedList](_linkedlist_.linkedlist.md)*

*Defined in [LinkedList.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`...items` | T[] |

**Returns:** *[LinkedList](_linkedlist_.linkedlist.md)*

## Properties

### `Private` head

• **head**: *[Option](../modules/_option_.md#option)‹[LinkedListItem](_linkedlistitem_.linkedlistitem.md)‹T››*

*Defined in [LinkedList.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L13)*

___

###  length

• **length**: *number* = 0

*Defined in [LinkedList.ts:11](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L11)*

___

### `Private` tail

• **tail**: *[Option](../modules/_option_.md#option)‹[LinkedListItem](_linkedlistitem_.linkedlistitem.md)‹T››*

*Defined in [LinkedList.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L14)*

## Methods

###  __@iterator

▸ **__@iterator**(): *IterableIterator‹T›*

*Defined in [LinkedList.ts:79](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L79)*

**Returns:** *IterableIterator‹T›*

___

###  addToEnd

▸ **addToEnd**(`value`: T): *void*

*Defined in [LinkedList.ts:27](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*

___

###  addToFront

▸ **addToFront**(`value`: T): *void*

*Defined in [LinkedList.ts:39](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*

___

###  drain

▸ **drain**(`effect`: function): *void*

*Defined in [LinkedList.ts:71](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L71)*

**Parameters:**

▪ **effect**: *function*

▸ (`value`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*

___

###  pop

▸ **pop**(): *undefined | T*

*Defined in [LinkedList.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L23)*

**Returns:** *undefined | T*

___

###  push

▸ **push**(`value`: T): *void*

*Defined in [LinkedList.ts:22](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*

___

###  removeFromEnd

▸ **removeFromEnd**(): *undefined | T*

*Defined in [LinkedList.ts:51](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L51)*

**Returns:** *undefined | T*

___

###  removeFromFront

▸ **removeFromFront**(): *undefined | T*

*Defined in [LinkedList.ts:61](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L61)*

**Returns:** *undefined | T*

___

###  shift

▸ **shift**(): *undefined | T*

*Defined in [LinkedList.ts:24](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L24)*

**Returns:** *undefined | T*

___

###  unshift

▸ **unshift**(`value`: T): *void*

*Defined in [LinkedList.ts:25](https://github.com/diaozheng999/nasi/blob/5f965cb/src/LinkedList.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*
