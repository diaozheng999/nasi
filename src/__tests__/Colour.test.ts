/**
 * Colour.test.ts
 * @author Diao Zheng
 * @file test cases for colour manipulation functions
 */

// removing sort keys because usage of "RGB" or "HSV" is canonical.
// tslint:disable:object-literal-sort-keys

import * as Colour from "../Colour";

test("colour rgba", () => {
  expect(Colour.rgba(5, 7, 9, 0.75, false)).toStrictEqual({
    r: 5,
    g: 7,
    b: 9,
    a: 0.75,
    colourSpace: "rgb",
  });
});

test("colour rgba 2", () => {
  expect(Colour.rgba(5, 7, 9, 0.75)).toStrictEqual({
    r: 5,
    g: 7,
    b: 9,
    a: 0.75,
    colourSpace: "rgb",
  });
});

test("colour rgba clamp", () => {
  expect(Colour.rgba(276, -1, 0, 255, false)).toStrictEqual({
    r: 255,
    g: 0,
    b: 0,
    a: 1,
    colourSpace: "rgb",
  });
});

test("colour rgba normalised", () => {
  expect(Colour.rgba(0.5, 0.6, 0.7, 0.8, true)).toStrictEqual({
    r: 0.5,
    g: 0.6,
    b: 0.7,
    a: 0.8,
    colourSpace: "rgb-normalised",
  });
});

test("colour rgba infty", () => {
  expect(Colour.rgba(Infinity, -Infinity, Infinity, Infinity, true))
  .toStrictEqual({
    r: 1,
    g: 0,
    b: 1,
    a: 1,
    colourSpace: "rgb-normalised",
  });
});

test("colour rgba NaN", () => {
  expect(Colour.rgba(NaN, 1, 2, 3)).toStrictEqual({
    r: NaN,
    g: 1,
    b: 2,
    a: 1,
    colourSpace: "rgb",
  });
});

test("colour rgb passthrough", () => {
  expect(Colour.rgb(1, 2, 3)).toStrictEqual(Colour.rgba(1, 2, 3, 1));
});

test("colour rgb normalised passthrough", () => {
  expect(Colour.rgb(1, 2, 3, true))
  .toStrictEqual(Colour.rgba(1, 2, 3, 4, true));
});

test("colour hsla", () => {
  expect(Colour.hsla(5, 7, 9, 0.75, false)).toStrictEqual({
    h: 5,
    s: 7,
    l: 9,
    a: 0.75,
    colourSpace: "hsl",
  });
});

test("colour hsla default", () => {
  expect(Colour.hsla(5, 7, 9, 0.75)).toStrictEqual({
    h: 5,
    s: 7,
    l: 9,
    a: 0.75,
    colourSpace: "hsl",
  });
});

test("colour hsla clamp", () => {
  expect(Colour.hsla(360, -1, 0, 255, false)).toStrictEqual({
    h: 0,
    s: 0,
    l: 0,
    a: 1,
    colourSpace: "hsl",
  });
});

test("colour hsla clamp period", () => {
  expect(Colour.hsla(725, -1, 0, 255, false)).toStrictEqual({
    h: 5,
    s: 0,
    l: 0,
    a: 1,
    colourSpace: "hsl",
  });
});

test("colour hsla clamp negative period", () => {
  expect(Colour.hsla(-45, -1, 0, 255, false)).toStrictEqual({
    h: 315,
    s: 0,
    l: 0,
    a: 1,
    colourSpace: "hsl",
  });
});

test("colour hsla clamp negative period", () => {
  expect(Colour.hsla(-405, -1, 0, 255, false)).toStrictEqual({
    h: 315,
    s: 0,
    l: 0,
    a: 1,
    colourSpace: "hsl",
  });
});

test("colour hsla normalised", () => {
  expect(Colour.hsla(0.5, 0.6, 0.7, 0.8, true)).toStrictEqual({
    h: 0.5,
    s: 0.6,
    l: 0.7,
    a: 0.8,
    colourSpace: "hsl-normalised",
  });
});

test("colour hsla infty", () => {
  expect(Colour.hsla(Infinity, -Infinity, Infinity, Infinity, true))
  .toStrictEqual({
    h: NaN,
    s: 0,
    l: 1,
    a: 1,
    colourSpace: "hsl-normalised",
  });
});

test("colour hsla NaN", () => {
  expect(Colour.hsla(NaN, NaN, NaN, NaN)).toStrictEqual({
    h: NaN,
    s: NaN,
    l: NaN,
    a: NaN,
    colourSpace: "hsl",
  });
});

test("colour hsl passthrough", () => {
  expect(Colour.hsl(15, 4, 34)).toStrictEqual(Colour.hsla(15, 4, 34, 1));
});

test("colour hsl passthrough denorm", () => {
  expect(Colour.hsl(15, 4, 34, false))
  .toStrictEqual(Colour.hsla(15, 4, 34, 1, false));
});

test("colour hsl passthrough norm", () => {
  expect(Colour.hsl(0.5, 0.2, 0.4, true))
  .toStrictEqual(Colour.hsla(0.5, 0.2, 0.4, 1, true));
});

test("colour equality sametype rgb", () => {
  expect(Colour.almostEqual(
    Colour.rgb(0, 0, 0),
    Colour.rgb(Colour.EPSILON, Colour.EPSILON, Colour.EPSILON),
  )).toBe(true);
});

test("colour equality sametype rgb", () => {
  expect(Colour.almostEqual(
    Colour.rgb(0, 0, 0),
    Colour.rgb(0, 1, 0),
  )).toBe(false);
});

test("colour equality sametype rgb normalization", () => {
  expect(Colour.almostEqual(
    Colour.rgb(1, 1, 1, true),
    Colour.rgb(255, 255, 255),
  )).toBe(true);
});

test("colour equality sametype hsl", () => {
  expect(Colour.almostEqual(
    Colour.hsl(0, 0, 0),
    Colour.hsl(0, 0, 0),
  )).toBe(true);

  expect(Colour.almostEqual(
    Colour.hsl(180, 0, 0),
    Colour.hsl(0, 0, 0),
  )).toBe(true);
});

test("colour equality sametype hsl false", () => {
  expect(Colour.almostEqual(
    Colour.hsl(0, 0, 0),
    Colour.hsl(0, 0, 1),
  )).toBe(false);

  expect(Colour.almostEqual(
    Colour.hsl(0, 100, 50),
    Colour.hsl(1, 100, 50),
  )).toBe(false);
});

test("colour equality sametype hsl normalization", () => {
  expect(Colour.almostEqual(
    Colour.hsl(1, 1, 1, true),
    Colour.hsl(360, 100, 100),
  )).toBe(true);
});

test("colour parse rgb", () => {
  expect(Colour.almostEqual(
    Colour.parse("#acf"),
    Colour.rgba(170, 204, 255, 1),
  )).toBe(true);

  expect(Colour.almostEqual(
    Colour.parse("#ACF"),
    Colour.rgba(170, 204, 255, 1),
  )).toBe(true);
});

test("colour parse rgba", () => {
  expect(Colour.almostEqual(
    Colour.parse("#acf8"),
    Colour.rgba(170, 204, 255, 0.53333333),
  )).toBe(true);

  expect(Colour.almostEqual(
    Colour.parse("#ACF8"),
    Colour.rgba(170, 204, 255, 0.53333333),
  )).toBe(true);
});

test("colour parse rrggbb", () => {
  expect(Colour.almostEqual(
    Colour.parse("#2538bd"),
    Colour.rgba(37, 56, 189, 1),
  )).toBe(true);

  expect(Colour.almostEqual(
    Colour.parse("#2538BD"),
    Colour.rgba(37, 56, 189, 1),
  )).toBe(true);
});

test("colour parse rrggbbaa", () => {
  expect(Colour.almostEqual(
    Colour.parse("#2538bdcf"),
    Colour.rgba(37, 56, 189, 0.8117647),
  )).toBe(true);

  expect(Colour.almostEqual(
    Colour.parse("#2538BDCF"),
    Colour.rgba(37, 56, 189, 0.8117647),
  )).toBe(true);
});

test("colour parse hex invalid input", () => {
  expect(() => Colour.parse("#asld;kfja;ldskfja;ldskjf")).toThrowError();
  expect(() => Colour.parse("#abcde")).toThrowError();
});

test("colour parse css3", () => {
  expect(Colour.almostEqual(
    Colour.parse("magenta"),
    Colour.rgba(255, 0, 255, 1),
  )).toBe(true);
});

test("colour parse css3 invalid input", () => {
  expect(() => Colour.parse("MAGENTA")).toThrowError();
});

test("colour tostring rgb", () => {
  expect(Colour.toString(Colour.rgb(1, 2, 3))).toBe("rgb(1, 2, 3)");
  expect(Colour.toString(Colour.rgba(1, 2, 3, Colour.ONE_MINUS_EPSILON)))
  .toBe("rgb(1, 2, 3)");
  expect(Colour.toString(Colour.rgb(1, 1, 1, true))).toBe("rgb(255, 255, 255)");
});

test("colour tostring rgba", () => {
  expect(Colour.toString(
    Colour.rgba(1, 2, 3, Colour.ONE_MINUS_EPSILON - Colour.EPSILON),
  )).toMatch(/^rgba\(1, 2, 3, 0\.99999/);
  expect(Colour.toString(Colour.rgba(1, 2, 3, 0.5))).toBe("rgba(1, 2, 3, 0.5)");
  expect(Colour.toString(Colour.rgba(1, 1, 1, 0.5, true)))
  .toBe("rgba(255, 255, 255, 0.5)");
});

test("colour tostring rgba NaN", () => {
  const debugColour = Colour.toString(Colour.DEBUG_COLOUR);
  expect(Colour.toString(Colour.rgba(NaN, 0, 0, 0))).toBe(debugColour);
  expect(Colour.toString(Colour.rgba(0, NaN, 0, 0))).toBe(debugColour);
  expect(Colour.toString(Colour.rgba(0, 0, NaN, 0))).toBe(debugColour);
  expect(Colour.toString(Colour.rgba(0, 0, 0, NaN))).toBe(debugColour);
});

test("colour tostring hsl", () => {
  expect(Colour.toString(Colour.hsl(1, 2, 3))).toBe("hsl(1, 2%, 3%)");
  expect(Colour.toString(Colour.hsla(1, 2, 3, Colour.ONE_MINUS_EPSILON)))
  .toBe("hsl(1, 2%, 3%)");
  expect(Colour.toString(Colour.hsl(1, 0.5, 0.5, true)))
  .toBe("hsl(0, 50%, 50%)");
});

test("colour tostring hsla", () => {
  expect(Colour.toString(
    Colour.hsla(1, 2, 3, Colour.ONE_MINUS_EPSILON - Colour.EPSILON),
  ))
  .toMatch(/^hsla\(1, 2\%, 3\%, 0\.99999/);
  expect(Colour.toString(Colour.hsla(1, 2, 3, 0.5)))
  .toBe("hsla(1, 2%, 3%, 0.5)");
  expect(Colour.toString(Colour.hsla(1, 0.5, 0.5, 0.5, true)))
  .toBe("hsla(0, 50%, 50%, 0.5)");
});

test("colour tostring hsla NaN", () => {
  const debugColour = Colour.toString(Colour.DEBUG_COLOUR);
  expect(Colour.toString(Colour.hsla(NaN, 0, 0, 0))).toBe(debugColour);
  expect(Colour.toString(Colour.hsla(0, NaN, 0, 0))).toBe(debugColour);
  expect(Colour.toString(Colour.hsla(0, 0, NaN, 0))).toBe(debugColour);
  expect(Colour.toString(Colour.hsla(0, 0, 0, NaN))).toBe(debugColour);
});

test("colour normalise rgb passthrough", () => {
  const colour = Colour.rgb(1, 1, 1, true);
  expect(Colour.normalise(colour)).toBe(colour);
});

test("colour normalise rgb identity", () => {
  const colour = Colour.parse("#123456");
  expect(Colour.almostEqual(
    Colour.denormalise(Colour.normalise(colour)),
    colour,
  )).toBe(true);
});

test("colour normalise rgb NaN", () => {
  const debugColour = Colour.toString(Colour.DEBUG_COLOUR);
  expect(Colour.toString(Colour.normalise(Colour.rgb(NaN, 0, 0))))
  .toBe(debugColour);
});

test("colour normalise hsl passthrough", () => {
  const colour = Colour.hsl(1, 1, 1, true);
  expect(Colour.normalise(colour)).toBe(colour);
});

test("colour normalise hsl identity", () => {
  const colour = Colour.hsl(300, 45, 13);
  expect(Colour.almostEqual(
    Colour.denormalise(Colour.normalise(colour)),
    colour,
  )).toBe(true);
});

test("colour normalise hsl NaN", () => {
  const debugColour = Colour.toString(Colour.DEBUG_COLOUR);
  expect(Colour.toString(Colour.normalise(Colour.hsl(NaN, 0, 0))))
  .toBe(debugColour);
});

test("colour denormalise rgb passthrough", () => {
  const colour = Colour.rgb(255, 255, 255);
  expect(Colour.denormalise(colour)).toBe(colour);
});

test("colour denormalise rgb identity", () => {
  const colour = Colour.rgb(0.3, 0.5, 0.8, true);
  expect(Colour.almostEqual(
    Colour.normalise(Colour.denormalise(colour)),
    colour,
  )).toBe(true);
});

test("colour denormalise rgb NaN", () => {
  const debugColour = Colour.toString(Colour.DEBUG_COLOUR);
  expect(Colour.toString(Colour.denormalise(Colour.rgb(NaN, 0, 0, true))))
  .toBe(debugColour);
});

test("colour denormalise hsl passthrough", () => {
  const colour = Colour.hsl(1, 1, 1);
  expect(Colour.denormalise(colour)).toBe(colour);
});

test("colour denormalise hsl identity", () => {
  const colour = Colour.hsl(0.9, 0.9, 0.1, true);
  expect(Colour.almostEqual(
    Colour.normalise(Colour.denormalise(colour)),
    colour,
  )).toBe(true);
});

test("colour denormalise hsl NaN", () => {
  const debugColour = Colour.toString(Colour.DEBUG_COLOUR);
  expect(Colour.toString(Colour.denormalise(Colour.hsl(NaN, 0, 0, true))))
  .toBe(debugColour);
});

test("colour toHsl primary colours", () => {
  expect(Colour.toHsl(Colour.rgb(255, 0, 0))).toEqual(Colour.hsl(0, 100, 50));
  expect(Colour.toHsl(Colour.rgb(0, 255, 0))).toEqual(Colour.hsl(120, 100, 50));
  expect(Colour.toHsl(Colour.rgb(0, 0, 255))).toEqual(Colour.hsl(240, 100, 50));
});

test("colour toHsl secondary colours", () => {
  expect(Colour.toHsl(Colour.rgb(255, 255, 0)))
  .toEqual(Colour.hsl(60, 100, 50));

  expect(Colour.toHsl(Colour.rgb(0, 255, 255)))
  .toEqual(Colour.hsl(180, 100, 50));

  expect(Colour.toHsl(Colour.rgb(255, 0, 255)))
  .toEqual(Colour.hsl(300, 100, 50));
});

test("colour toHsl grey", () => {
  const c = Colour.toHsl(Colour.rgb(127, 127, 127));
  expect(c.s).toEqual(0);
  expect(Math.abs(c.l - 50)).toBeLessThan(0.5);
});

test("colour toHsl passthrough", () => {
  const colour = Colour.hsl(1, 2, 3);
  expect(Colour.toHsl(colour)).toBe(colour);
});

test("colour toHsl denorm", () => {
  expect(Colour.toHsl(Colour.hsl(1, 1, 1, true)))
  .toEqual(Colour.hsl(360, 100, 100));
});

test("colour toHsl", () => {
  const hsl = Colour.toHsl(Colour.rgb(251, 183, 0));
  expect(Math.round(hsl.s)).toBe(100);
  expect(Math.round(hsl.l)).toBe(49);
  expect(Math.round(hsl.h)).toBe(44);
});

test("colour toRgb primary colours", () => {
  expect(Colour.toRgb(Colour.hsl(0, 100, 50)))
  .toEqual(Colour.rgb(255, 0, 0));

  expect(Colour.toRgb(Colour.hsl(60, 100, 50)))
  .toEqual(Colour.rgb(255, 255, 0));

  expect(Colour.toRgb(Colour.hsl(120, 100, 50)))
  .toEqual(Colour.rgb(0, 255, 0));

  expect(Colour.toRgb(Colour.hsl(180, 100, 50)))
  .toEqual(Colour.rgb(0, 255, 255));

  expect(Colour.toRgb(Colour.hsl(240, 100, 50)))
  .toEqual(Colour.rgb(0, 0, 255));

  expect(Colour.toRgb(Colour.hsl(300, 100, 50)))
  .toEqual(Colour.rgb(255, 0, 255));

  expect(Colour.toRgb(Colour.hsl(360, 100, 50)))
  .toEqual(Colour.rgb(255, 0, 0));
});

test("colour toRgb gray", () => {
  expect(Colour.toRgb(Colour.hsl(0, 0, 0))).toEqual(Colour.rgb(0, 0, 0));
  expect(Colour.toRgb(Colour.hsl(180, 0, 0))).toEqual(Colour.rgb(0, 0, 0));
  expect(Colour.toRgb(Colour.hsl(180, 100, 0))).toEqual(Colour.rgb(0, 0, 0));

  expect(Colour.toRgb(Colour.hsl(0, 0, 100)))
  .toEqual(Colour.rgb(255, 255, 255));

  expect(Colour.toRgb(Colour.hsl(180, 0, 100)))
  .toEqual(Colour.rgb(255, 255, 255));

  expect(Colour.toRgb(Colour.hsl(180, 100, 100)))
  .toEqual(Colour.rgb(255, 255, 255));
});

test("colour toRgb passthrough", () => {
  const colour = Colour.rgb(1, 2, 3);
  expect(Colour.toRgb(colour)).toBe(colour);
});

test("colour toRgb denorm", () => {
  expect(Colour.toRgb(Colour.rgb(1, 1, 1, true)))
  .toEqual(Colour.rgb(255, 255, 255));
});

test("colour equality difftype", () => {
  expect(Colour.almostEqual(
    Colour.hsl(180, 100, 50),
    Colour.rgb(0, 255, 255),
  )).toBe(true);
});

test("colour compose", () => {
  const rgb = jest.fn(Colour.toRgb);
  const hsl = jest.fn(Colour.toHsl);
  const composed = Colour.compose(rgb, hsl);
  expect(rgb).not.toBeCalled();
  expect(hsl).not.toBeCalled();

  const colour = Colour.rgb(123, 12, 123);

  expect(Colour.almostEqual(
    composed(colour),
    Colour.rgb(123, 12, 123),
  )).toBe(true);

  expect(rgb).toBeCalledWith(colour);
  expect(hsl).toBeCalledWith(rgb.mock.results[0].value);
});

test("colour parse rgba", () => {
  expect(Colour.almostEqual(
    Colour.parse("rgba (   0 , 0.1 ,0.5,               .453  )   "),
    Colour.rgba(0, 0.1, 0.5, 0.453),
  )).toBe(true);

  expect(() => Colour.parse("rgba()")).toThrowError();
  expect(() => Colour.parse("rgba(0, .1, .2)")).toThrowError();
  expect(() => Colour.parse("rgba(0, 1%, 2%, 2)")).toThrowError();
  expect(() => Colour.parse("rgba(h, e, l, l)")).toThrowError();
  expect(() => Colour.parse("rgba(0, 0.1, 2, 3, 4)")).toThrowError();
  expect(() => Colour.parse("rgba(., .1, .2, .3)")).toThrowError();
});

test("colour parse rgb", () => {
  expect(Colour.almostEqual(
    Colour.parse("rgb (  0,0.1  ,     0.5)     "),
    Colour.rgba(0, 0.1, 0.5, 1),
  )).toBe(true);

  expect(() => Colour.parse("rgb()")).toThrowError();
  expect(() => Colour.parse("rgb(0, 0.1, 0.5, .453)")).toThrowError();
  expect(() => Colour.parse("rgb(b, 0, 1)")).toThrowError();
  expect(() => Colour.parse("rgb(., 0, 0)")).toThrowError();
  expect(() => Colour.parse("rgb(0,0)")).toThrowError();
});

test("colour parse hsla", () => {
  expect(Colour.almostEqual(
    Colour.parse(" hsla (  0 , .1%,    0.5%, 000.453  ) "),
    Colour.hsla(0, 0.1, 0.5, 0.453),
  )).toBe(true);

  expect(() => Colour.parse("hsla()")).toThrowError();
  expect(() => Colour.parse("hsla(0, .1%, .2%)")).toThrowError();
  expect(() => Colour.parse("hsla(h, e, l, l)")).toThrowError();
  expect(() => Colour.parse("hsla(0, 0.1%, 2%, 3, 4)")).toThrowError();
  expect(() => Colour.parse("hsla(., .1%, .2%, .3)")).toThrowError();
  expect(() => Colour.parse("hsla(0, 1, 2, 3")).toThrowError();
});

test("colour parse hsl", () => {
  expect(Colour.almostEqual(
    Colour.parse("hsl(0,0.1%,5%)"),
    Colour.hsla(0, 0.1, 5, 1),
  )).toBe(true);

  expect(() => Colour.parse("hsl(0, 0.1, 0.5, .453)")).toThrowError();
  expect(() => Colour.parse("hsl(0, 1, 2)")).toThrowError();
  expect(() => Colour.parse("hsl(b, 0%, 1%)")).toThrowError();
  expect(() => Colour.parse("hsl(., 0%, 0%)")).toThrowError();
  expect(() => Colour.parse("hsl(0,0%)")).toThrowError();
});

test("colour composite alpha 1", () => {
  expect(
    Colour.composite(
    Colour.rgb(1, 1, 1, true),
    Colour.rgb(0, 0, 0),
  )).toStrictEqual(Colour.rgb(1, 1, 1, true));
});

test("colour composite passthrough", () => {
  expect(
    Colour.almostEqual(
      Colour.composite(
        Colour.rgb(1, 2, 6),
        Colour.rgb(0, 0, 0),
      ),
      Colour.rgb(1, 2, 6),
    ),
  ).toBe(true);
});

test("colour composite background", () => {
  expect(
    Colour.toString(
      Colour.toRgb(Colour.composite(
        Colour.parse("#04BBFF66"),
        Colour.composite(Colour.parse("#FF9204B0")),
      )),
    ),
  ).toBe(
    Colour.toString(Colour.parse("#9BB797")),
  );
});
