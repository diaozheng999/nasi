[nasi](../globals.md) › ["Contract"](_contract_.md)

# External module: "Contract"

## Index

### Variables

* [shouldBypass](_contract_.md#let-shouldbypass)
* [shouldBypassMessages](_contract_.md#let-shouldbypassmessages)

### Functions

* [assertNever](_contract_.md#assertnever)
* [bypassContractChecks](_contract_.md#bypasscontractchecks)
* [dismissContractMessages](_contract_.md#dismisscontractmessages)
* [ensures](_contract_.md#ensures)
* [invariant](_contract_.md#invariant)
* [invariantInDev](_contract_.md#invariantindev)
* [isSerialisable](_contract_.md#isserialisable)
* [requires](_contract_.md#requires)
* [restoreContractChecks](_contract_.md#restorecontractchecks)
* [restoreContractMessages](_contract_.md#restorecontractmessages)
* [shouldDisplayContractMessage](_contract_.md#shoulddisplaycontractmessage)

## Variables

### `Let` shouldBypass

• **shouldBypass**: *boolean* = false

*Defined in [Contract.ts:15](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L15)*

___

### `Let` shouldBypassMessages

• **shouldBypassMessages**: *boolean | RegExp* = false

*Defined in [Contract.ts:16](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L16)*

## Functions

###  assertNever

▸ **assertNever**(`x`: never): *never*

*Defined in [Contract.ts:195](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L195)*

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

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | never | can be anything  |

**Returns:** *never*

___

###  bypassContractChecks

▸ **bypassContractChecks**(): *void*

*Defined in [Contract.ts:18](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L18)*

**Returns:** *void*

___

###  dismissContractMessages

▸ **dismissContractMessages**(`message?`: RegExp): *void*

*Defined in [Contract.ts:26](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`message?` | RegExp |

**Returns:** *void*

___

###  ensures

▸ **ensures**<**T**, **Return**>(`inv`: function, `message?`: undefined | string): *(Anonymous function)*

*Defined in [Contract.ts:141](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L141)*

The provided invariant must return true after the execution of the method.

Use this to assert things about the return value of the function as well
as the state of the class before method execution.

**Type parameters:**

▪ **T**: *__type*

▪ **Return**

**Parameters:**

▪ **inv**: *function*

The invariant function. If not an arrow function, the this pointer
is bound to the current instance/static object.

▸ (`this`: T, `returnValue`: Return): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`this` | T |
`returnValue` | Return |

▪`Optional`  **message**: *undefined | string*

**Returns:** *(Anonymous function)*

___

###  invariant

▸ **invariant**(`inv`: function, `message?`: undefined | string, `shouldFail?`: undefined | false | true): *void*

*Defined in [Contract.ts:53](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L53)*

Fails with a warning or message if invariant fails at DEV environment and
tests.

If `message` is not defined, it will say something to the effect of:
  ```Invariant failed: function() {...}```

**Parameters:**

▪ **inv**: *function*

Invariant function. This should evaluate to something truthy.

▸ (): *boolean*

▪`Optional`  **message**: *undefined | string*

The message to pass in if don't want the `Invariant failed:`
message.

▪`Optional`  **shouldFail**: *undefined | false | true*

If true, will raise a red box, otherwise will raise a
yellow box. Defaults to true.

**Returns:** *void*

___

###  invariantInDev

▸ **invariantInDev**(`inv`: function, `message?`: undefined | string, `shouldFail?`: undefined | false | true): *void*

*Defined in [Contract.ts:61](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L61)*

**Parameters:**

▪ **inv**: *function*

▸ (): *boolean*

▪`Optional`  **message**: *undefined | string*

▪`Optional`  **shouldFail**: *undefined | false | true*

**Returns:** *void*

___

###  isSerialisable

▸ **isSerialisable**(`x`: any): *boolean*

*Defined in [Contract.ts:204](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | any |

**Returns:** *boolean*

___

###  requires

▸ **requires**<**T**, **Args**>(`inv`: function, `message?`: undefined | string): *(Anonymous function)*

*Defined in [Contract.ts:92](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L92)*

The provided invariant must return true before the execution of the method.

Use this to assert things about the input parameters to the function as well
as the state of the class before method execution.

**Type parameters:**

▪ **T**: *__type*

▪ **Args**: *any[]*

**Parameters:**

▪ **inv**: *function*

The invariant function. If not an arrow function, the this pointer
is bound to the current instance/static object.

▸ (`this`: T, ...`args`: Args): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`this` | T |
`...args` | Args |

▪`Optional`  **message**: *undefined | string*

**Returns:** *(Anonymous function)*

___

###  restoreContractChecks

▸ **restoreContractChecks**(): *void*

*Defined in [Contract.ts:22](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L22)*

**Returns:** *void*

___

###  restoreContractMessages

▸ **restoreContractMessages**(): *void*

*Defined in [Contract.ts:30](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L30)*

**Returns:** *void*

___

###  shouldDisplayContractMessage

▸ **shouldDisplayContractMessage**(`message`: string): *boolean*

*Defined in [Contract.ts:34](https://github.com/diaozheng999/nasi/blob/5f965cb/src/Contract.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *boolean*
