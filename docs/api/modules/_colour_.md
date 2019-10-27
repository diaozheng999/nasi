[nasi](../globals.md) › ["Colour"](_colour_.md)

# External module: "Colour"

## Index

### Interfaces

* [IHsl](../interfaces/_colour_.ihsl.md)
* [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)
* [IRgb](../interfaces/_colour_.irgb.md)
* [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)

### Type aliases

* [ColourSpace](_colour_.md#colourspace)
* [Transform](_colour_.md#transform)
* [Type](_colour_.md#type)

### Variables

* [DEBUG_COLOR_HSL](_colour_.md#const-debug_color_hsl)
* [DEBUG_COLOR_HSL_NORMALIZED](_colour_.md#const-debug_color_hsl_normalized)
* [DEBUG_COLOR_RGB](_colour_.md#const-debug_color_rgb)
* [DEBUG_COLOR_RGB_NORMALIZED](_colour_.md#const-debug_color_rgb_normalized)
* [EPSILON](_colour_.md#const-epsilon)
* [ONE_MINUS_EPSILON](_colour_.md#const-one_minus_epsilon)

### Functions

* [almostEqual](_colour_.md#almostequal)
* [clampCycle](_colour_.md#clampcycle)
* [compose](_colour_.md#compose)
* [composite](_colour_.md#composite)
* [denormalise](_colour_.md#denormalise)
* [eq](_colour_.md#eq)
* [hsl](_colour_.md#hsl)
* [hsla](_colour_.md#hsla)
* [normalise](_colour_.md#normalise)
* [parse](_colour_.md#parse)
* [rgb](_colour_.md#rgb)
* [rgba](_colour_.md#rgba)
* [toHsl](_colour_.md#tohsl)
* [toRgb](_colour_.md#torgb)
* [toString](_colour_.md#tostring)

### Object literals

* [CSS3_COLOURS](_colour_.md#const-css3_colours)
* [DEBUG_COLOUR](_colour_.md#const-debug_colour)

## Type aliases

###  ColourSpace

Ƭ **ColourSpace**: *"hsl" | "rgb" | "hsl-normalised" | "rgb-normalised"*

*Defined in [Colour.ts:13](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L13)*

___

###  Transform

Ƭ **Transform**: *function*

*Defined in [Colour.ts:50](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L50)*

#### Type declaration:

▸ (`src`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`src` | T |

___

###  Type

Ƭ **Type**: *[IRgb](../interfaces/_colour_.irgb.md) | [IHsl](../interfaces/_colour_.ihsl.md) | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:101](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L101)*

## Variables

### `Const` DEBUG_COLOR_HSL

• **DEBUG_COLOR_HSL**: *[IHsl](../interfaces/_colour_.ihsl.md)* =  toHsl(DEBUG_COLOUR)

*Defined in [Colour.ts:46](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L46)*

Debug colour in HSL (0..360, 0..100)

___

### `Const` DEBUG_COLOR_HSL_NORMALIZED

• **DEBUG_COLOR_HSL_NORMALIZED**: *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)* =  normalise(toHsl(DEBUG_COLOUR))

*Defined in [Colour.ts:48](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L48)*

Debug colour in HSL (0..1, 0..1)

___

### `Const` DEBUG_COLOR_RGB

• **DEBUG_COLOR_RGB**: *[IRgb](../interfaces/_colour_.irgb.md)* =  toRgb(DEBUG_COLOUR)

*Defined in [Colour.ts:42](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L42)*

Debug colour in RGB (0..255)

___

### `Const` DEBUG_COLOR_RGB_NORMALIZED

• **DEBUG_COLOR_RGB_NORMALIZED**: *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)* =  normalise(toRgb(DEBUG_COLOUR))

*Defined in [Colour.ts:44](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L44)*

Debug colour in RGB (0..1)

___

### `Const` EPSILON

• **EPSILON**: *1e-8* = 1e-8

*Defined in [Colour.ts:21](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L21)*

The smallest value for floating point comparisons

___

### `Const` ONE_MINUS_EPSILON

• **ONE_MINUS_EPSILON**: *number* =  1 - EPSILON

*Defined in [Colour.ts:24](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L24)*

Precomputed value for 1 - epsilon (to avoid floating point errors)

## Functions

###  almostEqual

▸ **almostEqual**(`c1`: [Type](_colour_.md#type), `c2`: [Type](_colour_.md#type), `epsilon`: number): *boolean*

*Defined in [Colour.ts:594](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L594)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`c1` | [Type](_colour_.md#type) | - |
`c2` | [Type](_colour_.md#type) | - |
`epsilon` | number |  EPSILON |

**Returns:** *boolean*

___

###  clampCycle

▸ **clampCycle**(`value`: number, `period`: number): *number*

*Defined in [Colour.ts:59](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L59)*

Returns a value between [0, period) if value is not NaN or Infinity. NaN
otherwise.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number | The value to be clamped. Returns NaN if NaN or +/- Infinity |
`period` | number | A value (not NaN, not Infinity, positive) that represents the               period.  |

**Returns:** *number*

___

###  compose

▸ **compose**<**T**>(): *[Transform](_colour_.md#transform)‹T, T›*

*Defined in [Colour.ts:645](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L645)*

**Type parameters:**

▪ **T**: *[Type](_colour_.md#type)*

**Returns:** *[Transform](_colour_.md#transform)‹T, T›*

▸ **compose**<**T1**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:646](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L646)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:652](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L652)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:660](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L660)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **T4**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, T4›, `tx4`: [Transform](_colour_.md#transform)‹T4, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:670](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L670)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **T4**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, T4› |
`tx4` | [Transform](_colour_.md#transform)‹T4, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **T4**, **T5**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, T4›, `tx4`: [Transform](_colour_.md#transform)‹T4, T5›, `tx5`: [Transform](_colour_.md#transform)‹T5, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:682](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L682)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **T4**: *[Type](_colour_.md#type)*

▪ **T5**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, T4› |
`tx4` | [Transform](_colour_.md#transform)‹T4, T5› |
`tx5` | [Transform](_colour_.md#transform)‹T5, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **T4**, **T5**, **T6**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, T4›, `tx4`: [Transform](_colour_.md#transform)‹T4, T5›, `tx5`: [Transform](_colour_.md#transform)‹T5, T6›, `tx6`: [Transform](_colour_.md#transform)‹T6, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:696](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L696)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **T4**: *[Type](_colour_.md#type)*

▪ **T5**: *[Type](_colour_.md#type)*

▪ **T6**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, T4› |
`tx4` | [Transform](_colour_.md#transform)‹T4, T5› |
`tx5` | [Transform](_colour_.md#transform)‹T5, T6› |
`tx6` | [Transform](_colour_.md#transform)‹T6, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **T4**, **T5**, **T6**, **T7**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, T4›, `tx4`: [Transform](_colour_.md#transform)‹T4, T5›, `tx5`: [Transform](_colour_.md#transform)‹T5, T6›, `tx6`: [Transform](_colour_.md#transform)‹T6, T7›, `tx7`: [Transform](_colour_.md#transform)‹T7, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:712](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L712)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **T4**: *[Type](_colour_.md#type)*

▪ **T5**: *[Type](_colour_.md#type)*

▪ **T6**: *[Type](_colour_.md#type)*

▪ **T7**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, T4› |
`tx4` | [Transform](_colour_.md#transform)‹T4, T5› |
`tx5` | [Transform](_colour_.md#transform)‹T5, T6› |
`tx6` | [Transform](_colour_.md#transform)‹T6, T7› |
`tx7` | [Transform](_colour_.md#transform)‹T7, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **T4**, **T5**, **T6**, **T7**, **T8**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, T4›, `tx4`: [Transform](_colour_.md#transform)‹T4, T5›, `tx5`: [Transform](_colour_.md#transform)‹T5, T6›, `tx6`: [Transform](_colour_.md#transform)‹T6, T7›, `tx7`: [Transform](_colour_.md#transform)‹T7, T8›, `tx8`: [Transform](_colour_.md#transform)‹T8, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:730](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L730)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **T4**: *[Type](_colour_.md#type)*

▪ **T5**: *[Type](_colour_.md#type)*

▪ **T6**: *[Type](_colour_.md#type)*

▪ **T7**: *[Type](_colour_.md#type)*

▪ **T8**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, T4› |
`tx4` | [Transform](_colour_.md#transform)‹T4, T5› |
`tx5` | [Transform](_colour_.md#transform)‹T5, T6› |
`tx6` | [Transform](_colour_.md#transform)‹T6, T7› |
`tx7` | [Transform](_colour_.md#transform)‹T7, T8› |
`tx8` | [Transform](_colour_.md#transform)‹T8, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**<**T1**, **T2**, **T3**, **T4**, **T5**, **T6**, **T7**, **T8**, **T9**, **TR**>(`tx1`: [Transform](_colour_.md#transform)‹T1, T2›, `tx2`: [Transform](_colour_.md#transform)‹T2, T3›, `tx3`: [Transform](_colour_.md#transform)‹T3, T4›, `tx4`: [Transform](_colour_.md#transform)‹T4, T5›, `tx5`: [Transform](_colour_.md#transform)‹T5, T6›, `tx6`: [Transform](_colour_.md#transform)‹T6, T7›, `tx7`: [Transform](_colour_.md#transform)‹T7, T8›, `tx8`: [Transform](_colour_.md#transform)‹T8, T9›, `tx9`: [Transform](_colour_.md#transform)‹T9, TR›): *[Transform](_colour_.md#transform)‹T1, TR›*

*Defined in [Colour.ts:750](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L750)*

**Type parameters:**

▪ **T1**: *[Type](_colour_.md#type)*

▪ **T2**: *[Type](_colour_.md#type)*

▪ **T3**: *[Type](_colour_.md#type)*

▪ **T4**: *[Type](_colour_.md#type)*

▪ **T5**: *[Type](_colour_.md#type)*

▪ **T6**: *[Type](_colour_.md#type)*

▪ **T7**: *[Type](_colour_.md#type)*

▪ **T8**: *[Type](_colour_.md#type)*

▪ **T9**: *[Type](_colour_.md#type)*

▪ **TR**: *[Type](_colour_.md#type)*

**Parameters:**

Name | Type |
------ | ------ |
`tx1` | [Transform](_colour_.md#transform)‹T1, T2› |
`tx2` | [Transform](_colour_.md#transform)‹T2, T3› |
`tx3` | [Transform](_colour_.md#transform)‹T3, T4› |
`tx4` | [Transform](_colour_.md#transform)‹T4, T5› |
`tx5` | [Transform](_colour_.md#transform)‹T5, T6› |
`tx6` | [Transform](_colour_.md#transform)‹T6, T7› |
`tx7` | [Transform](_colour_.md#transform)‹T7, T8› |
`tx8` | [Transform](_colour_.md#transform)‹T8, T9› |
`tx9` | [Transform](_colour_.md#transform)‹T9, TR› |

**Returns:** *[Transform](_colour_.md#transform)‹T1, TR›*

▸ **compose**(...`transforms`: Array‹[Transform](_colour_.md#transform)‹[Type](_colour_.md#type), [Type](_colour_.md#type)››): *[Transform](_colour_.md#transform)‹[Type](_colour_.md#type), [Type](_colour_.md#type)›*

*Defined in [Colour.ts:772](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L772)*

**Parameters:**

Name | Type |
------ | ------ |
`...transforms` | Array‹[Transform](_colour_.md#transform)‹[Type](_colour_.md#type), [Type](_colour_.md#type)›› |

**Returns:** *[Transform](_colour_.md#transform)‹[Type](_colour_.md#type), [Type](_colour_.md#type)›*

___

###  composite

▸ **composite**(`above`: [Type](_colour_.md#type), `below?`: [Type](_colour_.md#type)): *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

*Defined in [Colour.ts:621](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L621)*

Compose two colours above and below. If below is not defined, it's assumed
to be white, i.e. rgba(255, 255, 255, 1)

All composition is done in RGB normalised colour space. This may result in
floating-point round-off errors if the existing colours are not in this
colour space.

Painter's algorithm is used to composite the two colours (above and below)
see https://en.wikipedia.org/wiki/Alpha_compositing

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`above` | [Type](_colour_.md#type) | the colour (including alpha) to be composited above |
`below?` | [Type](_colour_.md#type) | the colour (including alpha) to be composited below. Note that              if not provided, white is used.  |

**Returns:** *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

___

###  denormalise

▸ **denormalise**(`colour`: [IHslNormalised](../interfaces/_colour_.ihslnormalised.md) | [IHsl](../interfaces/_colour_.ihsl.md)): *[IHsl](../interfaces/_colour_.ihsl.md)*

*Defined in [Colour.ts:161](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L161)*

Returns a (possibly new) colour with hue in the range [0..360] (degrees)
and saturation and lightness in the range [0..100] (%)

Does not coelesce NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md) &#124; [IHsl](../interfaces/_colour_.ihsl.md) | If colour is already denormalised, it is returned instead.  |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md)*

▸ **denormalise**(`colour`: [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md) | [IRgb](../interfaces/_colour_.irgb.md)): *[IRgb](../interfaces/_colour_.irgb.md)*

*Defined in [Colour.ts:169](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L169)*

Returns a (possibly new) colour in the range [0..255]

Does not coelesce NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md) &#124; [IRgb](../interfaces/_colour_.irgb.md) | If colour is already denormalised, it is returned instead.  |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md)*

▸ **denormalise**(`colour`: [Type](_colour_.md#type)): *[IHsl](../interfaces/_colour_.ihsl.md) | [IRgb](../interfaces/_colour_.irgb.md)*

*Defined in [Colour.ts:174](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L174)*

**`inheritdoc`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [Type](_colour_.md#type) | If colour is already denormalised, it is returned instead.  |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md) | [IRgb](../interfaces/_colour_.irgb.md)*

___

###  eq

▸ **eq**(`a`: number, `b`: number, `epsilon`: number): *boolean*

*Defined in [Colour.ts:589](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L589)*

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |
`epsilon` | number |

**Returns:** *boolean*

___

###  hsl

▸ **hsl**(`h`: number, `s`: number, `l`: number, `normalised?`: undefined | false): *[IHsl](../interfaces/_colour_.ihsl.md)*

*Defined in [Colour.ts:434](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L434)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | number |
`s` | number |
`l` | number |
`normalised?` | undefined &#124; false |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md)*

▸ **hsl**(`h`: number, `s`: number, `l`: number, `normalised`: true): *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:435](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L435)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | number |
`s` | number |
`l` | number |
`normalised` | true |

**Returns:** *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

▸ **hsl**(`h`: number, `s`: number, `l`: number, `normalised`: boolean): *[IHsl](../interfaces/_colour_.ihsl.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:441](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L441)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | number |
`s` | number |
`l` | number |
`normalised` | boolean |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

___

###  hsla

▸ **hsla**(`h`: number, `s`: number, `l`: number, `a`: number, `normalised?`: undefined | false): *[IHsl](../interfaces/_colour_.ihsl.md)*

*Defined in [Colour.ts:456](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L456)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | number |
`s` | number |
`l` | number |
`a` | number |
`normalised?` | undefined &#124; false |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md)*

▸ **hsla**(`h`: number, `s`: number, `l`: number, `a`: number, `normalised`: true): *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:463](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L463)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | number |
`s` | number |
`l` | number |
`a` | number |
`normalised` | true |

**Returns:** *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

▸ **hsla**(`h`: number, `s`: number, `l`: number, `a`: number, `normalised`: boolean): *[IHsl](../interfaces/_colour_.ihsl.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:470](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L470)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | number |
`s` | number |
`l` | number |
`a` | number |
`normalised` | boolean |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

___

###  normalise

▸ **normalise**(`colour`: [IRgb](../interfaces/_colour_.irgb.md) | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)): *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

*Defined in [Colour.ts:110](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L110)*

Returns a (possibly new) colour with all values in the range [0..1]

Does not coelesce NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [IRgb](../interfaces/_colour_.irgb.md) &#124; [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md) | If colour is already normalised, it is returned instead.  |

**Returns:** *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

▸ **normalise**(`colour`: [IHsl](../interfaces/_colour_.ihsl.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)): *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:118](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L118)*

Returns a (possibly new) colour with all values in the range [0..1]

Does not coelesce NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [IHsl](../interfaces/_colour_.ihsl.md) &#124; [IHslNormalised](../interfaces/_colour_.ihslnormalised.md) | If colour is already normalised, it is returned instead.  |

**Returns:** *[IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

▸ **normalise**(`colour`: [Type](_colour_.md#type)): *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

*Defined in [Colour.ts:126](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L126)*

Returns a (possibly new) colour with all values in the range [0..1]

Does not coelesce NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [Type](_colour_.md#type) | If colour is already normalised, it is returned instead.  |

**Returns:** *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md) | [IHslNormalised](../interfaces/_colour_.ihslnormalised.md)*

___

###  parse

▸ **parse**(`h`: string): *[IRgb](../interfaces/_colour_.irgb.md) | [IHsl](../interfaces/_colour_.ihsl.md)*

*Defined in [Colour.ts:503](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L503)*

**Parameters:**

Name | Type |
------ | ------ |
`h` | string |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md) | [IHsl](../interfaces/_colour_.ihsl.md)*

___

###  rgb

▸ **rgb**(`r`: number, `g`: number, `b`: number, `normalised?`: undefined | false): *[IRgb](../interfaces/_colour_.irgb.md)*

*Defined in [Colour.ts:365](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L365)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |
`normalised?` | undefined &#124; false |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md)*

▸ **rgb**(`r`: number, `g`: number, `b`: number, `normalised`: true): *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

*Defined in [Colour.ts:366](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L366)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |
`normalised` | true |

**Returns:** *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

▸ **rgb**(`r`: number, `g`: number, `b`: number, `normalised`: boolean): *[IRgb](../interfaces/_colour_.irgb.md) | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

*Defined in [Colour.ts:372](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L372)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |
`normalised` | boolean |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md) | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

___

###  rgba

▸ **rgba**(`r`: number, `g`: number, `b`: number, `a`: number, `normalised?`: undefined | false): *[IRgb](../interfaces/_colour_.irgb.md)*

*Defined in [Colour.ts:387](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L387)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |
`a` | number |
`normalised?` | undefined &#124; false |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md)*

▸ **rgba**(`r`: number, `g`: number, `b`: number, `a`: number, `normalised`: true): *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

*Defined in [Colour.ts:394](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L394)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |
`a` | number |
`normalised` | true |

**Returns:** *[IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

▸ **rgba**(`r`: number, `g`: number, `b`: number, `a`: number, `normalised`: boolean): *[IRgb](../interfaces/_colour_.irgb.md) | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

*Defined in [Colour.ts:401](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L401)*

**Parameters:**

Name | Type |
------ | ------ |
`r` | number |
`g` | number |
`b` | number |
`a` | number |
`normalised` | boolean |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md) | [IRgbNormalised](../interfaces/_colour_.irgbnormalised.md)*

___

###  toHsl

▸ **toHsl**(`colour`: [Type](_colour_.md#type)): *[IHsl](../interfaces/_colour_.ihsl.md)*

*Defined in [Colour.ts:210](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L210)*

Converts a colour to HSL colour space, with hue in the range [0..360)
degrees, saturation and lightness in range [0, 100]%.

Does not process NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [Type](_colour_.md#type) | If colour is already in HSL denormalised, it is returned               instead.  |

**Returns:** *[IHsl](../interfaces/_colour_.ihsl.md)*

___

###  toRgb

▸ **toRgb**(`colour`: [Type](_colour_.md#type)): *[IRgb](../interfaces/_colour_.irgb.md)*

*Defined in [Colour.ts:274](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L274)*

Converts a colour to RGB colour space, with each colour in the range
[0, 255].

Does not process NaN/Infinity.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`colour` | [Type](_colour_.md#type) | If colour is already in HSL denormalised, it is returned               instead.  |

**Returns:** *[IRgb](../interfaces/_colour_.irgb.md)*

___

###  toString

▸ **toString**(`colour`: [Type](_colour_.md#type)): *string*

*Defined in [Colour.ts:321](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L321)*

Constructs a CSS-compatible string from a colour. If NaN/Infinity occurs,
the debug colour is returned instead.

If `colour.a` >= 1 - `EPSILON`, alpha is assumed to have the value 1 and not
printed.

**Parameters:**

Name | Type |
------ | ------ |
`colour` | [Type](_colour_.md#type) |

**Returns:** *string*

## Object literals

### `Const` CSS3_COLOURS

### ▪ **CSS3_COLOURS**: *object*

*Defined in [Colour.ts:789](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L789)*

CSS3 colours as defined in
https://facebook.github.io/react-native/docs/0.55/colours

###  aliceblue

• **aliceblue**: *string* = "#f0f8ff"

*Defined in [Colour.ts:790](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L790)*

###  antiquewhite

• **antiquewhite**: *string* = "#faebd7"

*Defined in [Colour.ts:791](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L791)*

###  aqua

• **aqua**: *string* = "#00ffff"

*Defined in [Colour.ts:792](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L792)*

###  aquamarine

• **aquamarine**: *string* = "#7fffd4"

*Defined in [Colour.ts:793](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L793)*

###  azure

• **azure**: *string* = "#f0ffff"

*Defined in [Colour.ts:794](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L794)*

###  beige

• **beige**: *string* = "#f5f5dc"

*Defined in [Colour.ts:795](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L795)*

###  bisque

• **bisque**: *string* = "#ffe4c4"

*Defined in [Colour.ts:796](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L796)*

###  black

• **black**: *string* = "#000000"

*Defined in [Colour.ts:797](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L797)*

###  blanchedalmond

• **blanchedalmond**: *string* = "#ffebcd"

*Defined in [Colour.ts:798](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L798)*

###  blue

• **blue**: *string* = "#0000ff"

*Defined in [Colour.ts:799](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L799)*

###  blueviolet

• **blueviolet**: *string* = "#8a2be2"

*Defined in [Colour.ts:800](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L800)*

###  brown

• **brown**: *string* = "#a52a2a"

*Defined in [Colour.ts:801](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L801)*

###  burlywood

• **burlywood**: *string* = "#deb887"

*Defined in [Colour.ts:802](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L802)*

###  cadetblue

• **cadetblue**: *string* = "#5f9ea0"

*Defined in [Colour.ts:803](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L803)*

###  chartreuse

• **chartreuse**: *string* = "#7fff00"

*Defined in [Colour.ts:804](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L804)*

###  chocolate

• **chocolate**: *string* = "#d2691e"

*Defined in [Colour.ts:805](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L805)*

###  coral

• **coral**: *string* = "#ff7f50"

*Defined in [Colour.ts:806](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L806)*

###  cornflowerblue

• **cornflowerblue**: *string* = "#6495ed"

*Defined in [Colour.ts:807](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L807)*

###  cornsilk

• **cornsilk**: *string* = "#fff8dc"

*Defined in [Colour.ts:808](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L808)*

###  crimson

• **crimson**: *string* = "#dc143c"

*Defined in [Colour.ts:809](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L809)*

###  cyan

• **cyan**: *string* = "#00ffff"

*Defined in [Colour.ts:810](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L810)*

###  darkblue

• **darkblue**: *string* = "#00008b"

*Defined in [Colour.ts:811](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L811)*

###  darkcyan

• **darkcyan**: *string* = "#008b8b"

*Defined in [Colour.ts:812](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L812)*

###  darkgoldenrod

• **darkgoldenrod**: *string* = "#b8860b"

*Defined in [Colour.ts:813](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L813)*

###  darkgray

• **darkgray**: *string* = "#a9a9a9"

*Defined in [Colour.ts:814](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L814)*

###  darkgreen

• **darkgreen**: *string* = "#006400"

*Defined in [Colour.ts:815](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L815)*

###  darkgrey

• **darkgrey**: *string* = "#a9a9a9"

*Defined in [Colour.ts:816](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L816)*

###  darkkhaki

• **darkkhaki**: *string* = "#bdb76b"

*Defined in [Colour.ts:817](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L817)*

###  darkmagenta

• **darkmagenta**: *string* = "#8b008b"

*Defined in [Colour.ts:818](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L818)*

###  darkolivegreen

• **darkolivegreen**: *string* = "#556b2f"

*Defined in [Colour.ts:819](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L819)*

###  darkorange

• **darkorange**: *string* = "#ff8c00"

*Defined in [Colour.ts:820](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L820)*

###  darkorchid

• **darkorchid**: *string* = "#9932cc"

*Defined in [Colour.ts:821](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L821)*

###  darkred

• **darkred**: *string* = "#8b0000"

*Defined in [Colour.ts:822](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L822)*

###  darksalmon

• **darksalmon**: *string* = "#e9967a"

*Defined in [Colour.ts:823](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L823)*

###  darkseagreen

• **darkseagreen**: *string* = "#8fbc8f"

*Defined in [Colour.ts:824](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L824)*

###  darkslateblue

• **darkslateblue**: *string* = "#483d8b"

*Defined in [Colour.ts:825](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L825)*

###  darkslategrey

• **darkslategrey**: *string* = "#2f4f4f"

*Defined in [Colour.ts:826](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L826)*

###  darkturquoise

• **darkturquoise**: *string* = "#00ced1"

*Defined in [Colour.ts:827](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L827)*

###  darkviolet

• **darkviolet**: *string* = "#9400d3"

*Defined in [Colour.ts:828](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L828)*

###  deeppink

• **deeppink**: *string* = "#ff1493"

*Defined in [Colour.ts:829](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L829)*

###  deepskyblue

• **deepskyblue**: *string* = "#00bfff"

*Defined in [Colour.ts:830](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L830)*

###  dimgray

• **dimgray**: *string* = "#696969"

*Defined in [Colour.ts:831](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L831)*

###  dimgrey

• **dimgrey**: *string* = "#696969"

*Defined in [Colour.ts:832](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L832)*

###  dodgerblue

• **dodgerblue**: *string* = "#1e90ff"

*Defined in [Colour.ts:833](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L833)*

###  firebrick

• **firebrick**: *string* = "#b22222"

*Defined in [Colour.ts:834](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L834)*

###  floralwhite

• **floralwhite**: *string* = "#fffaf0"

*Defined in [Colour.ts:835](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L835)*

###  forestgreen

• **forestgreen**: *string* = "#228b22"

*Defined in [Colour.ts:836](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L836)*

###  fuchsia

• **fuchsia**: *string* = "#ff00ff"

*Defined in [Colour.ts:837](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L837)*

###  gainsboro

• **gainsboro**: *string* = "#dcdcdc"

*Defined in [Colour.ts:838](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L838)*

###  ghostwhite

• **ghostwhite**: *string* = "#f8f8ff"

*Defined in [Colour.ts:839](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L839)*

###  gold

• **gold**: *string* = "#ffd700"

*Defined in [Colour.ts:840](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L840)*

###  goldenrod

• **goldenrod**: *string* = "#daa520"

*Defined in [Colour.ts:841](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L841)*

###  gray

• **gray**: *string* = "#808080"

*Defined in [Colour.ts:842](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L842)*

###  green

• **green**: *string* = "#008000"

*Defined in [Colour.ts:843](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L843)*

###  greenyellow

• **greenyellow**: *string* = "#adff2f"

*Defined in [Colour.ts:844](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L844)*

###  grey

• **grey**: *string* = "#808080"

*Defined in [Colour.ts:845](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L845)*

###  honeydew

• **honeydew**: *string* = "#f0fff0"

*Defined in [Colour.ts:846](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L846)*

###  hotpink

• **hotpink**: *string* = "#ff69b4"

*Defined in [Colour.ts:847](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L847)*

###  indianred

• **indianred**: *string* = "#cd5c5c"

*Defined in [Colour.ts:848](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L848)*

###  indigo

• **indigo**: *string* = "#4b0082"

*Defined in [Colour.ts:849](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L849)*

###  ivory

• **ivory**: *string* = "#fffff0"

*Defined in [Colour.ts:850](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L850)*

###  khaki

• **khaki**: *string* = "#f0e68c"

*Defined in [Colour.ts:851](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L851)*

###  lavender

• **lavender**: *string* = "#e6e6fa"

*Defined in [Colour.ts:852](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L852)*

###  lavenderblush

• **lavenderblush**: *string* = "#fff0f5"

*Defined in [Colour.ts:853](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L853)*

###  lawngreen

• **lawngreen**: *string* = "#7cfc00"

*Defined in [Colour.ts:854](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L854)*

###  lemonchiffon

• **lemonchiffon**: *string* = "#fffacd"

*Defined in [Colour.ts:855](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L855)*

###  lightblue

• **lightblue**: *string* = "#add8e6"

*Defined in [Colour.ts:856](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L856)*

###  lightcoral

• **lightcoral**: *string* = "#f08080"

*Defined in [Colour.ts:857](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L857)*

###  lightcyan

• **lightcyan**: *string* = "#e0ffff"

*Defined in [Colour.ts:858](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L858)*

###  lightgoldenrodyellow

• **lightgoldenrodyellow**: *string* = "#fafad2"

*Defined in [Colour.ts:859](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L859)*

###  lightgray

• **lightgray**: *string* = "#d3d3d3"

*Defined in [Colour.ts:860](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L860)*

###  lightgreen

• **lightgreen**: *string* = "#90ee90"

*Defined in [Colour.ts:861](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L861)*

###  lightgrey

• **lightgrey**: *string* = "#d3d3d3"

*Defined in [Colour.ts:862](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L862)*

###  lightpink

• **lightpink**: *string* = "#ffb6c1"

*Defined in [Colour.ts:863](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L863)*

###  lightsalmon

• **lightsalmon**: *string* = "#ffa07a"

*Defined in [Colour.ts:864](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L864)*

###  lightseagreen

• **lightseagreen**: *string* = "#20b2aa"

*Defined in [Colour.ts:865](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L865)*

###  lightskyblue

• **lightskyblue**: *string* = "#87cefa"

*Defined in [Colour.ts:866](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L866)*

###  lightslategrey

• **lightslategrey**: *string* = "#778899"

*Defined in [Colour.ts:867](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L867)*

###  lightsteelblue

• **lightsteelblue**: *string* = "#b0c4de"

*Defined in [Colour.ts:868](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L868)*

###  lightyellow

• **lightyellow**: *string* = "#ffffe0"

*Defined in [Colour.ts:869](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L869)*

###  lime

• **lime**: *string* = "#00ff00"

*Defined in [Colour.ts:870](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L870)*

###  limegreen

• **limegreen**: *string* = "#32cd32"

*Defined in [Colour.ts:871](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L871)*

###  linen

• **linen**: *string* = "#faf0e6"

*Defined in [Colour.ts:872](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L872)*

###  magenta

• **magenta**: *string* = "#ff00ff"

*Defined in [Colour.ts:873](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L873)*

###  maroon

• **maroon**: *string* = "#800000"

*Defined in [Colour.ts:874](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L874)*

###  mediumaquamarine

• **mediumaquamarine**: *string* = "#66cdaa"

*Defined in [Colour.ts:875](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L875)*

###  mediumblue

• **mediumblue**: *string* = "#0000cd"

*Defined in [Colour.ts:876](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L876)*

###  mediumorchid

• **mediumorchid**: *string* = "#ba55d3"

*Defined in [Colour.ts:877](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L877)*

###  mediumpurple

• **mediumpurple**: *string* = "#9370db"

*Defined in [Colour.ts:878](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L878)*

###  mediumseagreen

• **mediumseagreen**: *string* = "#3cb371"

*Defined in [Colour.ts:879](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L879)*

###  mediumslateblue

• **mediumslateblue**: *string* = "#7b68ee"

*Defined in [Colour.ts:880](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L880)*

###  mediumspringgreen

• **mediumspringgreen**: *string* = "#00fa9a"

*Defined in [Colour.ts:881](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L881)*

###  mediumturquoise

• **mediumturquoise**: *string* = "#48d1cc"

*Defined in [Colour.ts:882](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L882)*

###  mediumvioletred

• **mediumvioletred**: *string* = "#c71585"

*Defined in [Colour.ts:883](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L883)*

###  midnightblue

• **midnightblue**: *string* = "#191970"

*Defined in [Colour.ts:884](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L884)*

###  mintcream

• **mintcream**: *string* = "#f5fffa"

*Defined in [Colour.ts:885](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L885)*

###  mistyrose

• **mistyrose**: *string* = "#ffe4e1"

*Defined in [Colour.ts:886](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L886)*

###  moccasin

• **moccasin**: *string* = "#ffe4b5"

*Defined in [Colour.ts:887](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L887)*

###  navajowhite

• **navajowhite**: *string* = "#ffdead"

*Defined in [Colour.ts:888](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L888)*

###  navy

• **navy**: *string* = "#000080"

*Defined in [Colour.ts:889](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L889)*

###  oldlace

• **oldlace**: *string* = "#fdf5e6"

*Defined in [Colour.ts:890](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L890)*

###  olive

• **olive**: *string* = "#808000"

*Defined in [Colour.ts:891](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L891)*

###  olivedrab

• **olivedrab**: *string* = "#6b8e23"

*Defined in [Colour.ts:892](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L892)*

###  orange

• **orange**: *string* = "#ffa500"

*Defined in [Colour.ts:893](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L893)*

###  orangered

• **orangered**: *string* = "#ff4500"

*Defined in [Colour.ts:894](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L894)*

###  orchid

• **orchid**: *string* = "#da70d6"

*Defined in [Colour.ts:895](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L895)*

###  palegoldenrod

• **palegoldenrod**: *string* = "#eee8aa"

*Defined in [Colour.ts:896](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L896)*

###  palegreen

• **palegreen**: *string* = "#98fb98"

*Defined in [Colour.ts:897](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L897)*

###  paleturquoise

• **paleturquoise**: *string* = "#afeeee"

*Defined in [Colour.ts:898](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L898)*

###  palevioletred

• **palevioletred**: *string* = "#db7093"

*Defined in [Colour.ts:899](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L899)*

###  papayawhip

• **papayawhip**: *string* = "#ffefd5"

*Defined in [Colour.ts:900](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L900)*

###  peachpuff

• **peachpuff**: *string* = "#ffdab9"

*Defined in [Colour.ts:901](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L901)*

###  peru

• **peru**: *string* = "#cd853f"

*Defined in [Colour.ts:902](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L902)*

###  pink

• **pink**: *string* = "#ffc0cb"

*Defined in [Colour.ts:903](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L903)*

###  plum

• **plum**: *string* = "#dda0dd"

*Defined in [Colour.ts:904](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L904)*

###  powderblue

• **powderblue**: *string* = "#b0e0e6"

*Defined in [Colour.ts:905](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L905)*

###  purple

• **purple**: *string* = "#800080"

*Defined in [Colour.ts:906](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L906)*

###  rebeccapurple

• **rebeccapurple**: *string* = "#663399"

*Defined in [Colour.ts:907](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L907)*

###  red

• **red**: *string* = "#ff0000"

*Defined in [Colour.ts:908](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L908)*

###  rosybrown

• **rosybrown**: *string* = "#bc8f8f"

*Defined in [Colour.ts:909](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L909)*

###  royalblue

• **royalblue**: *string* = "#4169e1"

*Defined in [Colour.ts:910](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L910)*

###  saddlebrown

• **saddlebrown**: *string* = "#8b4513"

*Defined in [Colour.ts:911](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L911)*

###  salmon

• **salmon**: *string* = "#fa8072"

*Defined in [Colour.ts:912](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L912)*

###  sandybrown

• **sandybrown**: *string* = "#f4a460"

*Defined in [Colour.ts:913](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L913)*

###  seagreen

• **seagreen**: *string* = "#2e8b57"

*Defined in [Colour.ts:914](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L914)*

###  seashell

• **seashell**: *string* = "#fff5ee"

*Defined in [Colour.ts:915](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L915)*

###  sienna

• **sienna**: *string* = "#a0522d"

*Defined in [Colour.ts:916](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L916)*

###  silver

• **silver**: *string* = "#c0c0c0"

*Defined in [Colour.ts:917](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L917)*

###  skyblue

• **skyblue**: *string* = "#87ceeb"

*Defined in [Colour.ts:918](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L918)*

###  slateblue

• **slateblue**: *string* = "#6a5acd"

*Defined in [Colour.ts:919](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L919)*

###  slategray

• **slategray**: *string* = "#708090"

*Defined in [Colour.ts:920](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L920)*

###  snow

• **snow**: *string* = "#fffafa"

*Defined in [Colour.ts:921](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L921)*

###  springgreen

• **springgreen**: *string* = "#00ff7f"

*Defined in [Colour.ts:922](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L922)*

###  steelblue

• **steelblue**: *string* = "#4682b4"

*Defined in [Colour.ts:923](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L923)*

###  tan

• **tan**: *string* = "#d2b48c"

*Defined in [Colour.ts:924](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L924)*

###  teal

• **teal**: *string* = "#008080"

*Defined in [Colour.ts:925](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L925)*

###  thistle

• **thistle**: *string* = "#d8bfd8"

*Defined in [Colour.ts:926](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L926)*

###  tomato

• **tomato**: *string* = "#ff6347"

*Defined in [Colour.ts:927](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L927)*

###  turquoise

• **turquoise**: *string* = "#40e0d0"

*Defined in [Colour.ts:928](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L928)*

###  violet

• **violet**: *string* = "#ee82ee"

*Defined in [Colour.ts:929](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L929)*

###  wheat

• **wheat**: *string* = "#f5deb3"

*Defined in [Colour.ts:930](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L930)*

###  white

• **white**: *string* = "#ffffff"

*Defined in [Colour.ts:931](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L931)*

###  whitesmoke

• **whitesmoke**: *string* = "#f5f5f5"

*Defined in [Colour.ts:932](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L932)*

###  yellow

• **yellow**: *string* = "#ffff00"

*Defined in [Colour.ts:933](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L933)*

###  yellowgreen

• **yellowgreen**: *string* = "#9acd32"

*Defined in [Colour.ts:934](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L934)*

___

### `Const` DEBUG_COLOUR

### ▪ **DEBUG_COLOUR**: *object*

*Defined in [Colour.ts:33](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L33)*

The debug colour to print if any of the colour values becomes NaN after
a transform.

This is #FF00FF (magenta). If you see this it means colour transform has
become NaN at some point.

###  a

• **a**: *number* = 1

*Defined in [Colour.ts:37](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L37)*

###  b

• **b**: *number* = 255

*Defined in [Colour.ts:36](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L36)*

###  colourSpace

• **colourSpace**: *"rgb"* = "rgb"

*Defined in [Colour.ts:38](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L38)*

###  g

• **g**: *number* = 0

*Defined in [Colour.ts:35](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L35)*

###  r

• **r**: *number* = 255

*Defined in [Colour.ts:34](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Colour.ts#L34)*
