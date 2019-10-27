[nasi](../globals.md) › ["Registry"](../modules/_registry_.md) › [Registry](_registry_.registry.md)

# Class: Registry <**TKey, TValue**>

## Type parameters

▪ **TKey**: *string | number | symbol*

▪ **TValue**

## Hierarchy

* **Registry**

## Index

### Constructors

* [constructor](_registry_.registry.md#constructor)

### Properties

* [DEFAULT_VALUE](_registry_.registry.md#default_value)
* [fallback](_registry_.registry.md#private-fallback)
* [registeredKeys](_registry_.registry.md#private-registeredkeys)
* [registry](_registry_.registry.md#private-registry)
* [shouldProvideFallback](_registry_.registry.md#shouldprovidefallback)

### Methods

* [UNSAFE_resetKeys](_registry_.registry.md#unsafe_resetkeys)
* [addKey](_registry_.registry.md#addkey)
* [getValue](_registry_.registry.md#getvalue)
* [getValueRecursive](_registry_.registry.md#getvaluerecursive)
* [keys](_registry_.registry.md#keys)
* [mapValue](_registry_.registry.md#mapvalue)
* [mapValueRecursive](_registry_.registry.md#mapvaluerecursive)
* [mutateValue](_registry_.registry.md#mutatevalue)
* [unsafeGetValue](_registry_.registry.md#unsafegetvalue)
* [updateValue](_registry_.registry.md#updatevalue)

## Constructors

###  constructor

\+ **new Registry**(`defaultKey`: TKey, `defaultValue?`: [TValue](undefined), `shouldProvideFallback?`: undefined | false | true): *[Registry](_registry_.registry.md)*

*Defined in [Registry.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`defaultKey` | TKey |
`defaultValue?` | [TValue](undefined) |
`shouldProvideFallback?` | undefined &#124; false &#124; true |

**Returns:** *[Registry](_registry_.registry.md)*

## Properties

###  DEFAULT_VALUE

• **DEFAULT_VALUE**: *TKey*

*Defined in [Registry.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L14)*

___

### `Private` fallback

• **fallback**: *object*

*Defined in [Registry.ts:17](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L17)*

#### Type declaration:

___

### `Private` registeredKeys

• **registeredKeys**: *Set‹TKey›* =  new Set()

*Defined in [Registry.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L18)*

___

### `Private` registry

• **registry**: *object*

*Defined in [Registry.ts:16](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L16)*

#### Type declaration:

___

###  shouldProvideFallback

• **shouldProvideFallback**: *boolean*

*Defined in [Registry.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L13)*

## Methods

###  UNSAFE_resetKeys

▸ **UNSAFE_resetKeys**(): *void*

*Defined in [Registry.ts:116](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L116)*

**Returns:** *void*

___

###  addKey

▸ **addKey**(`key`: TKey, `fallback?`: [TKey](undefined)): *void*

*Defined in [Registry.ts:41](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | TKey |
`fallback?` | [TKey](undefined) |

**Returns:** *void*

___

###  getValue

▸ **getValue**(`key`: TKey): *Option.Type‹TValue›*

*Defined in [Registry.ts:61](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | TKey |

**Returns:** *Option.Type‹TValue›*

___

###  getValueRecursive

▸ **getValueRecursive**(`key`: TKey): *Option.Type‹TValue›*

*Defined in [Registry.ts:76](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | TKey |

**Returns:** *Option.Type‹TValue›*

___

###  keys

▸ **keys**(): *IterableIterator‹TKey›*

*Defined in [Registry.ts:112](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L112)*

**Returns:** *IterableIterator‹TKey›*

___

###  mapValue

▸ **mapValue**<**T**>(`key`: TKey, `f`: function): *Option.Type‹T›*

*Defined in [Registry.ts:72](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L72)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **key**: *TKey*

▪ **f**: *function*

▸ (`v`: TValue): *T*

**Parameters:**

Name | Type |
------ | ------ |
`v` | TValue |

**Returns:** *Option.Type‹T›*

___

###  mapValueRecursive

▸ **mapValueRecursive**<**T**>(`key`: TKey, `f`: function): *Option.Type‹T›*

*Defined in [Registry.ts:83](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L83)*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **key**: *TKey*

▪ **f**: *function*

▸ (`v`: TValue): *T*

**Parameters:**

Name | Type |
------ | ------ |
`v` | TValue |

**Returns:** *Option.Type‹T›*

___

###  mutateValue

▸ **mutateValue**(`key`: TKey, `f`: function): *boolean*

*Defined in [Registry.ts:103](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L103)*

**Parameters:**

▪ **key**: *TKey*

▪ **f**: *function*

▸ (`obj`: TValue): *void*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | TValue |

**Returns:** *boolean*

___

###  unsafeGetValue

▸ **unsafeGetValue**(`key`: TKey): *TValue*

*Defined in [Registry.ts:68](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | TKey |

**Returns:** *TValue*

___

###  updateValue

▸ **updateValue**(`key`: TKey, `value`: TValue): *void*

*Defined in [Registry.ts:54](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Registry.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | TKey |
`value` | TValue |

**Returns:** *void*
