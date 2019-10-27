[nasi](../globals.md) › ["Option"](_option_.md)

# External module: "Option"

## Index

### Type aliases

* [NotNull](_option_.md#notnull)
* [Nullable](_option_.md#nullable)
* [Option](_option_.md#option)
* [Some](_option_.md#some)
* [Type](_option_.md#type)
* [WrappedRecordOption](_option_.md#wrappedrecordoption)

### Functions

* [assertNever](_option_.md#assertnever)
* [assertSome](_option_.md#assertsome)
* [both](_option_.md#both)
* [choice](_option_.md#choice)
* [compareSome](_option_.md#comparesome)
* [execute](_option_.md#execute)
* [isNone](_option_.md#isnone)
* [isSome](_option_.md#issome)
* [map](_option_.md#map)
* [mapChoice](_option_.md#mapchoice)
* [mapChoice_](_option_.md#mapchoice_)
* [mapFinite](_option_.md#mapfinite)
* [mapNotNaN](_option_.md#mapnotnan)
* [none](_option_.md#none)
* [property](_option_.md#property)
* [some](_option_.md#some)
* [truthy](_option_.md#truthy)
* [valOf](_option_.md#valof)
* [value](_option_.md#value)
* [value_](_option_.md#value_)
* [wrapFinite](_option_.md#wrapfinite)
* [wrapNotNaN](_option_.md#wrapnotnan)
* [wrapNotNull](_option_.md#wrapnotnull)

## Type aliases

###  NotNull

Ƭ **NotNull**: *NotNull<T>*

*Defined in [Option.ts:60](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L60)*

Asserts the value type of T, where T is constructed as `Option.Nullable`.

E.g. `Option.NotNull<Option.Nullable<string>>` resolves to `string`.

This makes use of the fact that conditional types are distributed across
unions and intersections.

As a result, note thess edge cases:
- `Option.NotNull<Option.Type<undefined>>` resolves to `never`
- `Option.NotNull<Option.Type<null>>` resolves to `never`
- `Option.NotNull<Option.Nullable<undefined>>` resolves to `never`
- `Option.NotNull<undefined>` resolves to `never`

Additionally, this is a less stringent type check than `Some`, so in most
cases, where `null` is not part of the type `T`, we get
`Option.NotNull<Option.Type<T>>` resolving to `T`.

___

###  Nullable

Ƭ **Nullable**: *T | null*

*Defined in [Option.ts:23](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L23)*

___

###  Option

Ƭ **Option**: *T | undefined*

*Defined in [Option.ts:15](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L15)*

___

###  Some

Ƭ **Some**: *Some<T>*

*Defined in [Option.ts:36](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L36)*

Asserts the value type of T, where `T` is constructed as `Option.Type`.

E.g. `Option.Some<Option.Type<string>>` resolves to `string`.

This makes use of the fact that conditional types are distributed across
unions and intersections.

As a result, note this edge case:
`Option.Some<Option.Type<undefined>>` resolves to `never`

___

###  Type

Ƭ **Type**: *[Option](_option_.md#option)‹T›*

*Defined in [Option.ts:21](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L21)*

___

###  WrappedRecordOption

Ƭ **WrappedRecordOption**: *{ [key in K]?: T | undefined; }[K]*

*Defined in [Option.ts:17](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L17)*

## Functions

###  assertNever

▸ **assertNever**(`x`: never): *never*

*Defined in [Option.ts:391](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L391)*

To throw you an compile error since nothing will be `never`.

**`example`** 
// In switch statements, use it like this to protect against missing cases:
switch(action)
  // case "MISSING_CASE":
  //  break;
  default:
    // error: argument of type 'MISSING_CASE' is not assignable.
    assertNever(action);
}

**`deprecated`** Use Contract.assertNever instead.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | never | can be anything |

**Returns:** *never*

___

###  assertSome

▸ **assertSome**<**T**>(`opt`: [Option](_option_.md#option)‹T›, `screenName?`: undefined | string): *T*

*Defined in [Option.ts:362](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L362)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`opt` | [Option](_option_.md#option)‹T› |
`screenName?` | undefined &#124; string |

**Returns:** *T*

___

###  both

▸ **both**<**T**, **U**>(`opt1`: [Option](_option_.md#option)‹T›, `opt2`: [Option](_option_.md#option)‹U›): *[Option](_option_.md#option)‹[T, U]›*

*Defined in [Option.ts:262](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L262)*

Returns Some([u, v]) iff opt1 is Some(u) and opt2 is Some(v).

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt1` | [Option](_option_.md#option)‹T› | u |
`opt2` | [Option](_option_.md#option)‹U› | v  |

**Returns:** *[Option](_option_.md#option)‹[T, U]›*

___

###  choice

▸ **choice**<**T**>(`opt`: [Option](_option_.md#option)‹unknown›, `ifSome`: T, `ifNone`: T): *T*

*Defined in [Option.ts:293](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L293)*

Chooses a value to return depending if option is some value.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt` | [Option](_option_.md#option)‹unknown› | an option |
`ifSome` | T | value to return if option is Some(_) |
`ifNone` | T | value to return if option is None  |

**Returns:** *T*

___

###  compareSome

▸ **compareSome**<**T**, **U**>(`opt1`: [Option](_option_.md#option)‹T›, `opt2`: [Option](_option_.md#option)‹U›, `comparison`: function): *boolean*

*Defined in [Option.ts:351](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L351)*

Returns true iff both options have values, and comparison function returns
true.

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

▪ **opt1**: *[Option](_option_.md#option)‹T›*

First optional value

▪ **opt2**: *[Option](_option_.md#option)‹U›*

Second optional value

▪ **comparison**: *function*

comparison function

▸ (`val1`: T, `val2`: U): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`val1` | T |
`val2` | U |

**Returns:** *boolean*

___

###  execute

▸ **execute**<**TArgs**>(`f`: [Option](_option_.md#option)‹function›, ...`args`: TArgs): *void*

*Defined in [Option.ts:422](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L422)*

**Type parameters:**

▪ **TArgs**: *any[]*

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Option](_option_.md#option)‹function› |
`...args` | TArgs |

**Returns:** *void*

▸ **execute**<**TArgs**, **TReturn**>(`f`: [Option](_option_.md#option)‹function›, ...`args`: TArgs): *[Option](_option_.md#option)‹TReturn›*

*Defined in [Option.ts:426](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L426)*

**Type parameters:**

▪ **TArgs**: *any[]*

▪ **TReturn**

**Parameters:**

Name | Type |
------ | ------ |
`f` | [Option](_option_.md#option)‹function› |
`...args` | TArgs |

**Returns:** *[Option](_option_.md#option)‹TReturn›*

___

###  isNone

▸ **isNone**<**T**, **K**>(`opt`: [WrappedRecordOption](_option_.md#wrappedrecordoption)‹T, K›): *boolean*

*Defined in [Option.ts:83](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L83)*

returns true iff option is None

**Type parameters:**

▪ **T**: *__type*

▪ **K**: *string | number | symbol*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt` | [WrappedRecordOption](_option_.md#wrappedrecordoption)‹T, K› | option  |

**Returns:** *boolean*

▸ **isNone**<**T**>(`opt`: [Option](_option_.md#option)‹T›): *boolean*

*Defined in [Option.ts:86](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L86)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`opt` | [Option](_option_.md#option)‹T› |

**Returns:** *boolean*

___

###  isSome

▸ **isSome**<**T**, **K**>(`opt`: [WrappedRecordOption](_option_.md#wrappedrecordoption)‹T, K›): *boolean*

*Defined in [Option.ts:71](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L71)*

returns true iff option is Some(value)

**Type parameters:**

▪ **T**: *__type*

▪ **K**: *string | number | symbol*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt` | [WrappedRecordOption](_option_.md#wrappedrecordoption)‹T, K› | option  |

**Returns:** *boolean*

▸ **isSome**<**T**>(`opt`: [Option](_option_.md#option)‹T›): *boolean*

*Defined in [Option.ts:74](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L74)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`opt` | [Option](_option_.md#option)‹T› |

**Returns:** *boolean*

___

###  map

▸ **map**<**T**, **U**>(`opt`: [Option](_option_.md#option)‹T›, `fn`: function): *[Option](_option_.md#option)‹U›*

*Defined in [Option.ts:151](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L151)*

Maps the option type such that if option is Some(a), then will return
Some(f(a)). Note that option wrapping is not supported, i.e. if fn has
type T => Option<U>, map<T> will return type Option<U> rather than
Option<Option<U>>.

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

▪ **opt**: *[Option](_option_.md#option)‹T›*

option

▪ **fn**: *function*

mapping function

▸ (`$0`: T): *[Option](_option_.md#option)‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`$0` | T |

**Returns:** *[Option](_option_.md#option)‹U›*

___

###  mapChoice

▸ **mapChoice**<**T**, **U**>(`opt`: [Option](_option_.md#option)‹T›, `ifSome`: function, `ifNone`: U): *U*

*Defined in [Option.ts:312](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L312)*

Choose a value to return depending on if option is some value.

This is equivalent to:
```
Option.value(Option.map(opt, ifSome), ifNone);
```

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

▪ **opt**: *[Option](_option_.md#option)‹T›*

an option

▪ **ifSome**: *function*

a function that executes if option is Some(_)

▸ (`value`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

▪ **ifNone**: *U*

the default return value

**Returns:** *U*

___

###  mapChoice_

▸ **mapChoice_**<**T**, **U**>(`opt`: [Option](_option_.md#option)‹T›, `ifSome`: function, `ifNone`: function): *U*

*Defined in [Option.ts:332](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L332)*

Chooses a value to return depending on if option is some value.

This is similar to `mapChoice` except `ifNone` is evaluated lazily.

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

▪ **opt**: *[Option](_option_.md#option)‹T›*

an option

▪ **ifSome**: *function*

a function that executes if option is Some(_)

▸ (`value`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

▪ **ifNone**: *function*

a function that executes if option is None

▸ (): *U*

**Returns:** *U*

___

###  mapFinite

▸ **mapFinite**(`val`: [Option](_option_.md#option)‹number›): *[Option](_option_.md#option)‹number›*

*Defined in [Option.ts:247](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L247)*

Shortcut function that has the following equivalence:

  map(val, wrapFinite) <=> mapFinite(val)

This function does the following:
1. If `val` is `undefined` (aka None), return `undefined` aka None.
2. Execute the `wrapFinite` function on `val` if `val` is not `undefined` (
aka Some(_))

Examples:
  - `mapFinite(undefined)` evaluates to `undefined`
  - `mapFinite(NaN)` evaluates to `undefined`
  - `mapFinite(Infinity)` evaluates to `undefined`
  - `mapFinite(5)` evaluates to `5`
  - `mapFinite(-0)` evaluates to `-0`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [Option](_option_.md#option)‹number› | option of number that is possibly `NaN` or `Infinity`  |

**Returns:** *[Option](_option_.md#option)‹number›*

___

###  mapNotNaN

▸ **mapNotNaN**(`val`: [Option](_option_.md#option)‹number›): *[Option](_option_.md#option)‹number›*

*Defined in [Option.ts:219](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L219)*

Shortcut function that has the following equivalence:

  map(val, wrapNotNaN) <=> mapNotNaN(val)

This function does the following:
1. If `val` is `undefined` (aka None), return `undefined` aka None.
2. Execute the `wrapNotNaN` function on `val` if `val` is not `undefined` (
aka Some(_))

Examples:
  - `mapNotNaN(undefined)` evaluates to `undefined`
  - `mapNotNaN(NaN)` evaluates to `undefined`
  - `mapNotNaN(Infinity)` evaluates to `Infinity`
  - `mapNotNaN(5)` evaluates to `5`
  - `mapNotNaN(-0)` evaluates to `-0`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [Option](_option_.md#option)‹number› | option of number that is possibly `NaN`  |

**Returns:** *[Option](_option_.md#option)‹number›*

___

###  none

▸ **none**<**T**>(): *[Option](_option_.md#option)‹T›*

*Defined in [Option.ts:283](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L283)*

Returns None.

**Type parameters:**

▪ **T**

**Returns:** *[Option](_option_.md#option)‹T›*

___

###  property

▸ **property**<**T**, **K**>(`opt`: [Option](_option_.md#option)‹T›, `key`: K): *[Option](_option_.md#option)‹T[K]›*

*Defined in [Option.ts:402](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L402)*

**Type parameters:**

▪ **T**: *__type*

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`opt` | [Option](_option_.md#option)‹T› |
`key` | K |

**Returns:** *[Option](_option_.md#option)‹T[K]›*

▸ **property**<**T**, **K**>(`opt`: [Option](_option_.md#option)‹T›, `key`: K, `defaultValue`: T[K]): *T[K]*

*Defined in [Option.ts:406](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L406)*

**Type parameters:**

▪ **T**: *__type*

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`opt` | [Option](_option_.md#option)‹T› |
`key` | K |
`defaultValue` | T[K] |

**Returns:** *T[K]*

___

###  some

▸ **some**<**T**>(`val`: T): *[Option](_option_.md#option)‹T›*

*Defined in [Option.ts:273](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L273)*

Returns Some(value). Throws an error if value is undefined.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | T | value  |

**Returns:** *[Option](_option_.md#option)‹T›*

___

###  truthy

▸ **truthy**<**T**>(`val`: [Nullable](_option_.md#nullable)‹T›): *[Option](_option_.md#option)‹T›*

*Defined in [Option.ts:170](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L170)*

Wraps a truthy value into an option. Falsy values are:
 * `false: boolean`
 * `0: number`
 * `"": string`
 * `null: null`
 * `undefined: undefined`
 * `NaN: number`

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [Nullable](_option_.md#nullable)‹T› | a value. If evaluated to true in JavaScript, will be retained as            Some(value). If evaluated to false in JavaScript, will be None.  |

**Returns:** *[Option](_option_.md#option)‹T›*

___

###  valOf

▸ **valOf**<**T**>(`opt`: [Option](_option_.md#option)‹T›): *T*

*Defined in [Option.ts:135](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L135)*

Returns value iff option is Some<value>, otherwise throws exception.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt` | [Option](_option_.md#option)‹T› | option  |

**Returns:** *T*

___

###  value

▸ **value**<**V**, **T**, **K**>(`opt`: T[K] | undefined, `defaultValue`: V): *V*

*Defined in [Option.ts:96](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L96)*

returns value if option is Some<value>, defaultValue otherwise.

**Type parameters:**

▪ **V**

▪ **T**: *object*

▪ **K**: *keyof T*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opt` | T[K] &#124; undefined | option |
`defaultValue` | V | the default value to return if option is None.  |

**Returns:** *V*

▸ **value**<**T**>(`opt`: [Option](_option_.md#option)‹T›, `defaultValue`: T): *T*

*Defined in [Option.ts:104](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L104)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`opt` | [Option](_option_.md#option)‹T› |
`defaultValue` | T |

**Returns:** *T*

___

###  value_

▸ **value_**<**T**, **TDefaultArguments**>(`opt`: [Option](_option_.md#option)‹T›, `defaultValue`: function, ...`defaultParams`: TDefaultArguments): *T*

*Defined in [Option.ts:119](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L119)*

Similar to value, returns value if option is Some<value>, defaultValue
otherwise. Note that defaultValue will not be evaluated until absolutely
necessary.

**Type parameters:**

▪ **T**

▪ **TDefaultArguments**: *any[]*

**Parameters:**

▪ **opt**: *[Option](_option_.md#option)‹T›*

option

▪ **defaultValue**: *function*

the default value to return if option is None.

▸ (...`args`: TDefaultArguments): *T*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | TDefaultArguments |

▪... **defaultParams**: *TDefaultArguments*

**Returns:** *T*

___

###  wrapFinite

▸ **wrapFinite**(`val`: number): *[Option](_option_.md#option)‹number›*

*Defined in [Option.ts:197](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L197)*

Special case of `truthy` to wrap `NaN` and +/- infinity to None. (0 and -0
are wrapped to Some(0)).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | number | number (possibly `NaN`) to wrap.  |

**Returns:** *[Option](_option_.md#option)‹number›*

___

###  wrapNotNaN

▸ **wrapNotNaN**(`val`: number): *[Option](_option_.md#option)‹number›*

*Defined in [Option.ts:180](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L180)*

Special case of `truthy` to only wrap `NaN` to None. (0 is wrapped to
Some(0)).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | number | number (possibly `NaN`) to wrap.  |

**Returns:** *[Option](_option_.md#option)‹number›*

___

###  wrapNotNull

▸ **wrapNotNull**<**T**>(`val`: [Nullable](_option_.md#nullable)‹T›): *[Option](_option_.md#option)‹T›*

*Defined in [Option.ts:188](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Option.ts#L188)*

Special case of `truthy` to only wrap `null` to None.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`val` | [Nullable](_option_.md#nullable)‹T› | a possibly nullable value.  |

**Returns:** *[Option](_option_.md#option)‹T›*
