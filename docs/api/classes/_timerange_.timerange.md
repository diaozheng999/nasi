[nasi](../globals.md) › ["TimeRange"](../modules/_timerange_.md) › [TimeRange](_timerange_.timerange.md)

# Class: TimeRange

This is an immutable object that indicates a time range.

## Hierarchy

* **TimeRange**

## Index

### Constructors

* [constructor](_timerange_.timerange.md#constructor)

### Properties

* [cachedEndDate](_timerange_.timerange.md#private-optional-cachedenddate)
* [cachedStartDate](_timerange_.timerange.md#private-optional-cachedstartdate)
* [end](_timerange_.timerange.md#private-end)
* [isWellDefined](_timerange_.timerange.md#private-iswelldefined)
* [start](_timerange_.timerange.md#private-start)
* [Undefined](_timerange_.timerange.md#static-undefined)
* [timeRangeSerialisationToken](_timerange_.timerange.md#static-private-timerangeserialisationtoken)

### Accessors

* [endDate](_timerange_.timerange.md#enddate)
* [startDate](_timerange_.timerange.md#startdate)

### Methods

* [contains](_timerange_.timerange.md#contains)
* [equals](_timerange_.timerange.md#equals)
* [hasEndDate](_timerange_.timerange.md#hasenddate)
* [hasStartDate](_timerange_.timerange.md#hasstartdate)
* [intersect](_timerange_.timerange.md#intersect)
* [isValid](_timerange_.timerange.md#isvalid)
* [isValidAtTimestamp](_timerange_.timerange.md#isvalidattimestamp)
* [union](_timerange_.timerange.md#union)
* [wellDefined](_timerange_.timerange.md#welldefined)
* [createNewRangeFromExistingRanges](_timerange_.timerange.md#static-private-createnewrangefromexistingranges)
* [deserialise](_timerange_.timerange.md#static-deserialise)
* [serialise](_timerange_.timerange.md#static-serialise)

## Constructors

###  constructor

\+ **new TimeRange**(`start`: number, `end`: number): *[TimeRange](_timerange_.timerange.md)*

*Defined in [TimeRange.ts:61](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L61)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`start` | number |  -Infinity |
`end` | number |  Infinity |

**Returns:** *[TimeRange](_timerange_.timerange.md)*

## Properties

### `Private` `Optional` cachedEndDate

• **cachedEndDate**? : *Option.Nullable‹Date›*

*Defined in [TimeRange.ts:59](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L59)*

___

### `Private` `Optional` cachedStartDate

• **cachedStartDate**? : *Option.Nullable‹Date›*

*Defined in [TimeRange.ts:58](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L58)*

___

### `Private` end

• **end**: *number*

*Defined in [TimeRange.ts:56](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L56)*

___

### `Private` isWellDefined

• **isWellDefined**: *boolean* = true

*Defined in [TimeRange.ts:61](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L61)*

___

### `Private` start

• **start**: *number*

*Defined in [TimeRange.ts:55](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L55)*

___

### `Static` Undefined

▪ **Undefined**: *[TimeRange](_timerange_.timerange.md)* =  new TimeRange(NaN, NaN)

*Defined in [TimeRange.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L13)*

___

### `Static` `Private` timeRangeSerialisationToken

▪ **timeRangeSerialisationToken**: *"__M1TR"* = "__M1TR"

*Defined in [TimeRange.ts:29](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L29)*

## Accessors

###  endDate

• **get endDate**(): *undefined | Date*

*Defined in [TimeRange.ts:99](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L99)*

**Returns:** *undefined | Date*

___

###  startDate

• **get startDate**(): *undefined | Date*

*Defined in [TimeRange.ts:85](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L85)*

**Returns:** *undefined | Date*

## Methods

###  contains

▸ **contains**(`range`: [TimeRange](_timerange_.timerange.md)): *boolean*

*Defined in [TimeRange.ts:166](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`range` | [TimeRange](_timerange_.timerange.md) |

**Returns:** *boolean*

___

###  equals

▸ **equals**(`range`: [TimeRange](_timerange_.timerange.md)): *boolean*

*Defined in [TimeRange.ts:181](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L181)*

**Parameters:**

Name | Type |
------ | ------ |
`range` | [TimeRange](_timerange_.timerange.md) |

**Returns:** *boolean*

___

###  hasEndDate

▸ **hasEndDate**(): *boolean*

*Defined in [TimeRange.ts:116](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L116)*

**Returns:** *boolean*

___

###  hasStartDate

▸ **hasStartDate**(): *boolean*

*Defined in [TimeRange.ts:112](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L112)*

**Returns:** *boolean*

___

###  intersect

▸ **intersect**(`range`: [TimeRange](_timerange_.timerange.md)): *[TimeRange](_timerange_.timerange.md)*

*Defined in [TimeRange.ts:120](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`range` | [TimeRange](_timerange_.timerange.md) |

**Returns:** *[TimeRange](_timerange_.timerange.md)*

___

###  isValid

▸ **isValid**(`atTime?`: Date): *boolean*

*Defined in [TimeRange.ts:152](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`atTime?` | Date |

**Returns:** *boolean*

___

###  isValidAtTimestamp

▸ **isValidAtTimestamp**(`timestamp`: number): *boolean*

*Defined in [TimeRange.ts:162](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`timestamp` | number |

**Returns:** *boolean*

___

###  union

▸ **union**(`range`: [TimeRange](_timerange_.timerange.md)): *[TimeRange](_timerange_.timerange.md)*

*Defined in [TimeRange.ts:131](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`range` | [TimeRange](_timerange_.timerange.md) |

**Returns:** *[TimeRange](_timerange_.timerange.md)*

___

###  wellDefined

▸ **wellDefined**(): *boolean*

*Defined in [TimeRange.ts:185](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L185)*

**Returns:** *boolean*

___

### `Static` `Private` createNewRangeFromExistingRanges

▸ **createNewRangeFromExistingRanges**(`lower`: [TimeRange](_timerange_.timerange.md), `upper`: [TimeRange](_timerange_.timerange.md)): *[TimeRange](_timerange_.timerange.md)*

*Defined in [TimeRange.ts:37](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L37)*

Returns a new time range with the lower bound that is lower.start and upper
bound that is upper.end.

**`requires`** lower.isWellDefined && upper.isWellDefined

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`lower` | [TimeRange](_timerange_.timerange.md) | a TimeRange whose lower bound is taken |
`upper` | [TimeRange](_timerange_.timerange.md) | a TimeRange whose upper bound is taken |

**Returns:** *[TimeRange](_timerange_.timerange.md)*

___

### `Static` deserialise

▸ **deserialise**(`s`: string): *undefined | [TimeRange](_timerange_.timerange.md)*

*Defined in [TimeRange.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`s` | string |

**Returns:** *undefined | [TimeRange](_timerange_.timerange.md)*

___

### `Static` serialise

▸ **serialise**(`range`: [TimeRange](_timerange_.timerange.md)): *string*

*Defined in [TimeRange.ts:21](https://github.com/diaozheng999/nasi/blob/5f965cb/src/TimeRange.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`range` | [TimeRange](_timerange_.timerange.md) |

**Returns:** *string*
