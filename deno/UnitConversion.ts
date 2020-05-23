/**
 * UnitConversion.ts
 * @author Diao Zheng
 * @file Utility functions to convert backend units into representable units.
 * @barrel export all
 */

export interface Presentable {
  value: string;
  unit: string;
  rawValue: number;
}

/** @deprecated use `Presentable` instead */
export type IPresentable = Presentable;

export type Converter = (rawValue: number) => Presentable;
export type ConverterSpec = (rawValue: number) => readonly [string, string];

const MB_IN_BYTES = 0x100000; // 2^20
const GB_IN_BYTES = 0x40000000; // 2^30
const MIN_IN_SEC = 60;

function unlimited() {
  return {
    rawValue: Infinity,
    unit: "",
    value: "∞",
  };
}

function wrapNegativeZero(n: number) {
  /**
   * This is a negative zero checking that is using in polyfill.
   * Polyfill is not being imported because all the other features are not
   * needed.
   * @file For further checking please refer to the link below:
   * https://gist.github.com/matthewp/2036428
   */
  if (!n && 1 / n === -Infinity) {
    return 0;
  } else {
    return n;
  }
}

export const convert = (spec: ConverterSpec): Converter =>
  (rawValue: number) => {
    if (isFinite(rawValue) && rawValue >= 0) {
      const wrappedRawValue = wrapNegativeZero(rawValue);
      const [value, unit] = spec(wrappedRawValue);
      return {
        rawValue: wrappedRawValue,
        unit,
        value,
      };
    } else {
      return unlimited();
    }
  };

/**
 * A unit converter that takes in the value in bytes, and returns the nearest
 * value rounded up to the nearest MB or .01 GB.
 *
 * Note though that there are a few caveats regarding this converter:
 * 1. If usage is exactly 1GB in bytes, we show `1.00GB`,
 *    if usage is 1GB and 1 byte, we show `1.01GB`, and
 *    if usage is 1 byte to 1GB (i.e. 1073741823 bytes), we show `1024MB`
 * 2. If usage is negative (not including -0), infinity or NaN, we show `∞` and
 *    assume that the customer is on an unlimited plan.
 * 3. This can compute up to 2^53 bytes without losing any precision, i.e. we
 *    can only support up to 7 exabytes of monthly usage. This is approximately
 *    constantly getting 1GB/s (8Gbps) throughput constantly for the entire
 *    month.
 */
export const dataFromBytes: Converter = (rawValueInBytes: number) => {
  if (!isFinite(rawValueInBytes) || rawValueInBytes < 0) {
    return unlimited();
  }

  const valueInGB = rawValueInBytes / GB_IN_BYTES;
  const rawValue = wrapNegativeZero(rawValueInBytes);

  if (valueInGB >= 1) {
    // eslint-disable-next-line no-magic-numbers
    const output = Math.ceil(valueInGB * 100).toFixed(0);

    const decimal = output.substr(output.length - 2);
    const integer = output.substring(0, output.length - 2);

    return {
      rawValue,
      unit: "GB",
      value: `${integer}.${decimal}`,
    };
  }

  const valueInMB = rawValueInBytes / MB_IN_BYTES;
  return {
    rawValue,
    unit: "MB",
    value: Math.ceil(valueInMB).toFixed(0),
  };
};

/**
 * A unit converter that takes in the value in bytes, and returns the nearest
 * value rounded up to the nearest minute.
 *
 * Note though that there are a few caveats regarding this converter:
 * 1. If usage is exactly 1 second, we show `1min`,
 *    if usage is 59 seconds, we show `1min`, and
 *    if usage is 61 seconds, we show `2min`
 * 2. If usage is negative (not including -0), infinity or NaN, we show `∞` and
 *    assume that the customer is on an unlimited plan.
 * 3. This can compute up to 1.5011999e+14 seconds (which is around 4760
 *    millennia)
 */
export const voiceFromSeconds: Converter = (rawValueInSeconds: number) => {
  if (!isFinite(rawValueInSeconds) || rawValueInSeconds < 0) {
    return unlimited();
  }

  const valueInMinutes = rawValueInSeconds / MIN_IN_SEC;
  const rawValue = wrapNegativeZero(rawValueInSeconds);
  return {
    rawValue,
    unit: "min",
    value: Math.ceil(valueInMinutes).toFixed(0),
  };
};

/**
 * A unit converter that takes a double-precision floating point, i.e.
 * JavaScript number, and round it up to the nearest integer. This seems to work
 * with denormal numbers.
 *
 * If usage is negative (not including -0), infinity or NaN, we show `∞` and
 * assume that the customer is on an unlimited plan.
 */
export const integral: Converter = (rawValue: number) => {
  if (!isFinite(rawValue) || rawValue < 0) {
    return unlimited();
  } else {
    return {
      rawValue: wrapNegativeZero(rawValue),
      unit: "",
      value: Math.ceil(rawValue).toFixed(0),
    };
  }
};

export const unwrapJson = (rawValue: number) => {
  if (!isFinite(rawValue) || rawValue < 0) {
    return Infinity;
  }
  return wrapNegativeZero(rawValue);
};
