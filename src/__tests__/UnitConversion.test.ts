/**
 * UnitConversion.test.ts
 * @author Diao Zheng
 * @file Test cases for unit converters
 */

import * as Converter from "../UnitConversion";

describe("data", () => {
  test("NaN", () => {
    const result = Converter.dataFromBytes(NaN);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("Infinity", () => {
    const result = Converter.dataFromBytes(Infinity);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("Negative", () => {
    const result = Converter.dataFromBytes(-1);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("0B", () => {
    const result = Converter.dataFromBytes(0);
    expect(result.rawValue).toBe(0);
    expect(result.value).toBe("0");
    expect(result.unit).toBe("MB");
  });

  test("-0B", () => {
    const result = Converter.dataFromBytes(-0);
    expect(result.rawValue).toBe(0);
    expect(result.rawValue).not.toBe(-0);
    expect(result.value).toBe("0");
    expect(result.unit).toBe("MB");
  });

  test("1B", () => {
    const result = Converter.dataFromBytes(1);
    expect(result.rawValue).toBe(1);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("MB");
  });

  test("1MB", () => {
    const result = Converter.dataFromBytes(0x100000);
    expect(result.rawValue).toBe(0x100000);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("MB");
  });

  test("0.5MB", () => {
    const result = Converter.dataFromBytes(0x80000);
    expect(result.rawValue).toBe(0x80000);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("MB");
  });

  test("1GB", () => {
    const result = Converter.dataFromBytes(0x40000000);
    expect(result.rawValue).toBe(0x40000000);
    expect(result.value).toBe("1.00");
    expect(result.unit).toBe("GB");
  });

  test("0.99GB", () => {
    const result = Converter.dataFromBytes(0x3FFFFFFF);
    expect(result.rawValue).toBe(0x3FFFFFFF);
    expect(result.value).toBe("1024");
    expect(result.unit).toBe("MB");
  });

  test("1GB + 1B", () => {
    const result = Converter.dataFromBytes(0x40000001);
    expect(result.rawValue).toBe(0x40000001);
    expect(result.value).toBe("1.01");
    expect(result.unit).toBe("GB");
  });

  test("1GB + 1B", () => {
    const result = Converter.dataFromBytes(0x40000001);
    expect(result.rawValue).toBe(0x40000001);
    expect(result.value).toBe("1.01");
    expect(result.unit).toBe("GB");
  });

  test("7.17GB", () => {
    const result = Converter.dataFromBytes(7698728878);
    expect(result.rawValue).toBe(7698728878);
    expect(result.value).toBe("7.17");
    expect(result.unit).toBe("GB");
  });
});

describe("voice", () => {
  test("NaN", () => {
    const result = Converter.voiceFromSeconds(NaN);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("Infinity", () => {
    const result = Converter.voiceFromSeconds(Infinity);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("Negative", () => {
    const result = Converter.voiceFromSeconds(-1);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("0s", () => {
    const result = Converter.voiceFromSeconds(0);
    expect(result.rawValue).toBe(0);
    expect(result.value).toBe("0");
    expect(result.unit).toBe("min");
  });

  test("-0s", () => {
    const result = Converter.voiceFromSeconds(-0);
    expect(result.rawValue).toBe(0);
    expect(result.rawValue).not.toBe(-0);
    expect(result.value).toBe("0");
    expect(result.unit).toBe("min");
  });

  test("1s", () => {
    const result = Converter.voiceFromSeconds(1);
    expect(result.rawValue).toBe(1);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("min");
  });

  test("59s", () => {
    const result = Converter.voiceFromSeconds(59);
    expect(result.rawValue).toBe(59);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("min");
  });

  test("60s", () => {
    const result = Converter.voiceFromSeconds(60);
    expect(result.rawValue).toBe(60);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("min");
  });

  test("61s", () => {
    const result = Converter.voiceFromSeconds(61);
    expect(result.rawValue).toBe(61);
    expect(result.value).toBe("2");
    expect(result.unit).toBe("min");
  });

  test("32 bits", () => {
    const result = Converter.voiceFromSeconds(2147483648);
    expect(result.rawValue).toBe(2147483648);
    expect(result.value).toBe("35791395");
    expect(result.unit).toBe("min");
  });
});

describe("integral", () => {
  test("NaN", () => {
    const result = Converter.integral(NaN);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("Infinity", () => {
    const result = Converter.integral(Infinity);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("Negative", () => {
    const result = Converter.integral(-1);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
  });

  test("0", () => {
    const result = Converter.integral(0);
    expect(result.rawValue).toBe(0);
    expect(result.value).toBe("0");
    expect(result.unit).toBe("");
  });

  test("-0", () => {
    const result = Converter.integral(-0);
    expect(result.rawValue).toBe(0);
    expect(result.rawValue).not.toBe(-0);
    expect(result.value).toBe("0");
    expect(result.unit).toBe("");
  });

  test("1", () => {
    const result = Converter.integral(1);
    expect(result.rawValue).toBe(1);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("");
  });

  test("0.1", () => {
    const result = Converter.integral(0.1);
    expect(result.rawValue).toBe(0.1);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("");
  });

  test("denormal", () => {
    const b = new Uint8Array(16);

    const shortView = new Uint16Array(b.buffer);
    const floatView = new Float64Array(b.buffer);

    // endianness test
    b[0] = 1;
    b[1] = 2;
    const endianness = shortView[0] === 0x201 ? "little" : "big";

    // represent 0x0000000000000001, the smallest possible denormal number
    b[endianness === "little" ? 0 : 7] = 0x01;
    b[endianness === "little" ? 1 : 6] = 0x00;
    b[endianness === "little" ? 2 : 5] = 0x00;
    b[endianness === "little" ? 3 : 4] = 0x00;
    b[endianness === "little" ? 4 : 3] = 0x00;
    b[endianness === "little" ? 5 : 2] = 0x00;
    b[endianness === "little" ? 6 : 1] = 0x00;
    b[endianness === "little" ? 7 : 0] = 0x00;

    const result = Converter.integral(floatView[0]);
    expect(result.rawValue).toBe(Number.MIN_VALUE);
    expect(result.value).toBe("1");
    expect(result.unit).toBe("");
  });
});

describe("convert", () => {
  test("NaN", () => {
    const converter = jest.fn();
    const result = Converter.convert(converter)(NaN);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
    expect(converter).not.toBeCalled();
  });

  test("Infinity", () => {
    const converter = jest.fn();
    const result = Converter.convert(converter)(Infinity);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
    expect(converter).not.toBeCalled();
  });

  test("Negative", () => {
    const converter = jest.fn();
    const result = Converter.convert(converter)(-1);
    expect(result.rawValue).toBe(Infinity);
    expect(result.value).toBe("∞");
    expect(result.unit).toBe("");
    expect(converter).not.toBeCalled();
  });

  test("0", () => {
    const converter = jest.fn(
      () => ["a", "b"] as const,
    );
    const result = Converter.convert(converter)(0);
    expect(result.rawValue).toBe(0);
    expect(result.value).toBe("a");
    expect(result.unit).toBe("b");
    expect(converter).toBeCalledWith(0);
  });

  test("-0", () => {
    const converter = jest.fn(
      () => ["a", "b"] as const,
    );
    const result = Converter.convert(converter)(-0);
    expect(result.rawValue).toBe(0);
    expect(result.rawValue).not.toBe(-0);
    expect(result.value).toBe("a");
    expect(result.unit).toBe("b");
    expect(converter).toBeCalledWith(0);
    expect(converter).not.toBeCalledWith(-0);
  });

});

describe("unwrapJson", () => {
  test("NaN", () => {
    const result = Converter.unwrapJson(NaN);
    expect(result).toBe(Infinity);
  });

  test("Infinity", () => {
    const result = Converter.unwrapJson(Infinity);
    expect(result).toBe(Infinity);
  });

  test("Negative", () => {
    const result = Converter.unwrapJson(-1);
    expect(result).toBe(Infinity);
  });

  test("0", () => {
    const result = Converter.unwrapJson(0);
    expect(result).toBe(0);
  });

  test("-0", () => {
    const result = Converter.unwrapJson(-0);
    expect(result).toBe(0);
  });

  test("1", () => {
    const result = Converter.unwrapJson(1);
    expect(result).toBe(1);
  });
});
