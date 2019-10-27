[nasi](../globals.md) › ["UnitConversion"](_unitconversion_.md)

# External module: "UnitConversion"

## Index

### Interfaces

* [IPresentable](../interfaces/_unitconversion_.ipresentable.md)

### Type aliases

* [Converter](_unitconversion_.md#converter)
* [ConverterSpec](_unitconversion_.md#converterspec)

### Variables

* [GB_IN_BYTES](_unitconversion_.md#const-gb_in_bytes)
* [MB_IN_BYTES](_unitconversion_.md#const-mb_in_bytes)
* [MIN_IN_SEC](_unitconversion_.md#const-min_in_sec)

### Functions

* [convert](_unitconversion_.md#const-convert)
* [dataFromBytes](_unitconversion_.md#const-datafrombytes)
* [integral](_unitconversion_.md#const-integral)
* [unlimited](_unitconversion_.md#unlimited)
* [voiceFromSeconds](_unitconversion_.md#const-voicefromseconds)
* [wrapNegativeZero](_unitconversion_.md#wrapnegativezero)

## Type aliases

###  Converter

Ƭ **Converter**: *function*

*Defined in [UnitConversion.ts:14](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L14)*

#### Type declaration:

▸ (`rawValue`: number): *[IPresentable](../interfaces/_unitconversion_.ipresentable.md)*

**Parameters:**

Name | Type |
------ | ------ |
`rawValue` | number |

___

###  ConverterSpec

Ƭ **ConverterSpec**: *function*

*Defined in [UnitConversion.ts:15](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L15)*

#### Type declaration:

▸ (`rawValue`: number): *keyof [string, string]*

**Parameters:**

Name | Type |
------ | ------ |
`rawValue` | number |

## Variables

### `Const` GB_IN_BYTES

• **GB_IN_BYTES**: *1073741824* = 1073741824

*Defined in [UnitConversion.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L18)*

___

### `Const` MB_IN_BYTES

• **MB_IN_BYTES**: *1048576* = 1048576

*Defined in [UnitConversion.ts:17](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L17)*

___

### `Const` MIN_IN_SEC

• **MIN_IN_SEC**: *60* = 60

*Defined in [UnitConversion.ts:19](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L19)*

## Functions

### `Const` convert

▸ **convert**(`spec`: [ConverterSpec](_unitconversion_.md#converterspec)): *[Converter](_unitconversion_.md#converter)*

*Defined in [UnitConversion.ts:44](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`spec` | [ConverterSpec](_unitconversion_.md#converterspec) |

**Returns:** *[Converter](_unitconversion_.md#converter)*

___

### `Const` dataFromBytes

▸ **dataFromBytes**(`rawValueInBytes`: number): *object*

*Defined in [UnitConversion.ts:76](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L76)*

A unit converter that takes in the value in bytes, and returns the nearest
value rounded up to the nearest MB or .01 GB.

Note though that there are a few caveats regarding this converter:
1. If usage is exactly 1GB in bytes, we show `1.00GB`,
   if usage is 1GB and 1 byte, we show `1.01GB`, and
   if usage is 1 byte to 1GB (i.e. 1073741823 bytes), we show `1024MB`
2. If usage is negative (not including -0), infinity or NaN, we show `∞` and
   assume that the customer is on an unlimited plan.
3. This can compute up to 2^53 bytes without losing any precision, i.e. we
   can only support up to 7 exabytes of monthly usage. This is approximately
   constantly getting 1GB/s (8Gbps) throughput constantly for the entire
   month.

**Parameters:**

Name | Type |
------ | ------ |
`rawValueInBytes` | number |

**Returns:** *object*

* **rawValue**: *number* =  Infinity

* **unit**: *string* = ""

* **value**: *string* = "∞"

___

### `Const` integral

▸ **integral**(`rawValue`: number): *object*

*Defined in [UnitConversion.ts:141](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L141)*

A unit converter that takes a double-precision floating point, i.e.
JavaScript number, and round it up to the nearest integer. This seems to work
with denormal numbers.

If usage is negative (not including -0), infinity or NaN, we show `∞` and
assume that the customer is on an unlimited plan.

**Parameters:**

Name | Type |
------ | ------ |
`rawValue` | number |

**Returns:** *object*

* **rawValue**: *number* =  Infinity

* **unit**: *string* = ""

* **value**: *string* = "∞"

___

###  unlimited

▸ **unlimited**(): *object*

*Defined in [UnitConversion.ts:21](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L21)*

**Returns:** *object*

* **rawValue**: *number* =  Infinity

* **unit**: *string* = ""

* **value**: *string* = "∞"

___

### `Const` voiceFromSeconds

▸ **voiceFromSeconds**(`rawValueInSeconds`: number): *object*

*Defined in [UnitConversion.ts:119](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L119)*

A unit converter that takes in the value in bytes, and returns the nearest
value rounded up to the nearest minute.

Note though that there are a few caveats regarding this converter:
1. If usage is exactly 1 second, we show `1min`,
   if usage is 59 seconds, we show `1min`, and
   if usage is 61 seconds, we show `2min`
2. If usage is negative (not including -0), infinity or NaN, we show `∞` and
   assume that the customer is on an unlimited plan.
3. This can compute up to 1.5011999e+14 seconds (which is around 4760
   millennia)

**Parameters:**

Name | Type |
------ | ------ |
`rawValueInSeconds` | number |

**Returns:** *object*

* **rawValue**: *number* =  Infinity

* **unit**: *string* = ""

* **value**: *string* = "∞"

___

###  wrapNegativeZero

▸ **wrapNegativeZero**(`n`: number): *number*

*Defined in [UnitConversion.ts:29](https://github.com/diaozheng999/nasi/blob/5f965cb/src/UnitConversion.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *number*
