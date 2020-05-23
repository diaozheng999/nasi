/**
 * Colour.ts
 * @author Diao Zheng
 * @file Utility functions to manipulate colours
 * @barrel export all
 */

import clamp from "https://deno.land/x/lodash/clamp.js";
import has from "https://deno.land/x/lodash/has.js";

/* eslint-disable no-magic-numbers */

// removing sort keys because usage of "RGB" or "HSV" is canonical.
// tslint:disable:object-literal-sort-keys

export type ColourSpace =
  | "hsl"
  | "rgb"
  | "hsl-normalised"
  | "rgb-normalised";

/** The smallest value for floating point comparisons */
export const EPSILON = 1e-8;

/** Precomputed value for 1 - epsilon (to avoid floating point errors) */
export const ONE_MINUS_EPSILON = 1 - EPSILON;

/**
 * The debug colour to print if any of the colour values becomes NaN after
 * a transform.
 *
 * This is #FF00FF (magenta). If you see this it means colour transform has
 * become NaN at some point.
 */
export const DEBUG_COLOUR: Type = {
  r: 255,
  g: 0,
  b: 255,
  a: 1,
  colourSpace: "rgb",
};

export type Transform<T extends Type, U extends Type> = (src: T) => U;

/**
 * Returns a value between [0, period) if value is not NaN or Infinity. NaN
 * otherwise.
 * @param value The value to be clamped. Returns NaN if NaN or +/- Infinity
 * @param period A value (not NaN, not Infinity, positive) that represents the
 *               period.
 */
export function clampCycle(value: number, period: number): number {
  if (isNaN(value)) {
    return value;
  }
  if (value < 0) {
    return clampCycle(period + (value % period), period);
  }
  return value % period;
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
  a: number;
  colourSpace: "hsl";
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
  colourSpace: "rgb";
}

export interface HslNormalised {
  h: number;
  s: number;
  l: number;
  a: number;
  colourSpace: "hsl-normalised";
}

export interface RgbNormalised {
  r: number;
  g: number;
  b: number;
  a: number;
  colourSpace: "rgb-normalised";
}

export type Type = Rgb | Hsl | RgbNormalised | HslNormalised;

/**
 * CSS3 colours as defined in
 * https://facebook.github.io/react-native/docs/0.55/colours
 */
const CSS3_COLOURS: Record<string, string> = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};

/**
 * Returns a (possibly new) colour with all values in the range [0..1]
 *
 * Does not coelesce NaN/Infinity.
 *
 * @param colour If colour is already normalised, it is returned instead.
 */
export function normalise(colour: Rgb | RgbNormalised): RgbNormalised;
/**
 * Returns a (possibly new) colour with all values in the range [0..1]
 *
 * Does not coelesce NaN/Infinity.
 *
 * @param colour If colour is already normalised, it is returned instead.
 */
export function normalise(colour: Hsl | HslNormalised): HslNormalised;
/**
 * Returns a (possibly new) colour with all values in the range [0..1]
 *
 * Does not coelesce NaN/Infinity.
 *
 * @param colour If colour is already normalised, it is returned instead.
 */
export function normalise(colour: Type): RgbNormalised | HslNormalised;
export function normalise(colour: Type) {
  switch (colour.colourSpace) {
    case "rgb-normalised":
    case "hsl-normalised":
      return colour;

    case "rgb":
      return {
        r: colour.r / 255,
        g: colour.g / 255,
        b: colour.b / 255,
        a: colour.a,
        colourSpace: "rgb-normalised",
      };

    case "hsl":
      return {
        h: colour.h / 360,
        s: colour.s / 100,
        l: colour.l / 100,
        a: colour.a,
        colourSpace: "hsl-normalised",
      };
  }
}

/**
 * Returns a (possibly new) colour with hue in the range [0..360] (degrees)
 * and saturation and lightness in the range [0..100] (%)
 *
 * Does not coelesce NaN/Infinity.
 *
 * @param colour If colour is already denormalised, it is returned instead.
 */
export function denormalise(colour: HslNormalised | Hsl): Hsl;
/**
 * Returns a (possibly new) colour in the range [0..255]
 *
 * Does not coelesce NaN/Infinity.
 *
 * @param colour If colour is already denormalised, it is returned instead.
 */
export function denormalise(colour: RgbNormalised | Rgb): Rgb;
/**
 * @inheritdoc
 * @param colour If colour is already denormalised, it is returned instead.
 */
export function denormalise(colour: Type): Hsl | Rgb;
export function denormalise(colour: Type) {
  switch (colour.colourSpace) {
    case "rgb":
    case "hsl":
      return colour;

    case "rgb-normalised":
      return {
        r: colour.r * 255,
        g: colour.g * 255,
        b: colour.b * 255,
        a: colour.a,
        colourSpace: "rgb",
      };

    case "hsl-normalised":
      return {
        h: colour.h * 360,
        s: colour.s * 100,
        l: colour.l * 100,
        a: colour.a,
        colourSpace: "hsl",
      };
  }
}

/**
 * Converts a colour to HSL colour space, with hue in the range [0..360)
 * degrees, saturation and lightness in range [0, 100]%.
 *
 * Does not process NaN/Infinity.
 *
 * @param colour If colour is already in HSL denormalised, it is returned
 *               instead.
 */
export function toHsl(colour: Type): Hsl {
  if (colour.colourSpace === "hsl") {
    return colour;
  }
  if (colour.colourSpace === "hsl-normalised") {
    return denormalise(colour);
  }
  const c = normalise(colour);

  let Cmax: number = c.r;
  let argCmax: "r" | "g" | "b" = "r";

  if (c.g >= c.r && c.g >= c.b) {
    Cmax = c.g;
    argCmax = "g";
  } else if (c.b >= c.r && c.b >= c.g) {
    Cmax = c.b;
    argCmax = "b";
  }

  const Cmin = Math.min(c.r, c.g, c.b);
  const delta = Cmax - Cmin;

  const result: Hsl = {
    h: 0,
    s: 0,
    l: (Cmax + Cmin) / 2,
    a: c.a,
    colourSpace: "hsl",
  };

  if (delta > 0) {
    switch (argCmax) {
      case "r":
        result.h = 60 * (((c.g - c.b) / delta) % 6);
        break;

      case "g":
        result.h = 60 * ((c.b - c.r) / delta + 2);
        break;

      case "b":
        result.h = 60 * ((c.r - c.g) / delta + 4);
        break;
    }

    result.s = delta / (1 - Math.abs(2 * result.l - 1));
  }

  result.l *= 100;
  result.s *= 100;

  return result;
}

/**
 * Converts a colour to RGB colour space, with each colour in the range
 * [0, 255].
 *
 * Does not process NaN/Infinity.
 *
 * @param colour If colour is already in HSL denormalised, it is returned
 *               instead.
 */
export function toRgb(colour: Type): Rgb {
  if (colour.colourSpace === "rgb") {
    return colour;
  }
  if (colour.colourSpace === "rgb-normalised") {
    return denormalise(colour);
  }

  const h = denormalise(colour).h;
  const sl = normalise(colour);

  const c = (1 - Math.abs(2 * sl.l - 1)) * sl.s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));

  const m = sl.l - c / 2;

  const [r, g, b] = h < 60
    ? [c, x, 0]
    : h < 120
    ? [x, c, 0]
    : h < 180
    ? [0, c, x]
    : h < 240
    ? [0, x, c]
    : h < 300
    ? [x, 0, c]
    : [c, 0, x];

  return denormalise({
    r: r + m,
    g: g + m,
    b: b + m,
    a: sl.a,
    colourSpace: "rgb-normalised",
  });
}

/**
 * Constructs a CSS-compatible string from a colour. If NaN/Infinity occurs,
 * the debug colour is returned instead.
 *
 * If `colour.a` >= 1 - `EPSILON`, alpha is assumed to have the value 1 and not
 * printed.
 */
export function toString(colour: Type): string {
  switch (colour.colourSpace) {
    case "hsl-normalised":
    case "rgb-normalised":
      return toString(denormalise(colour));

    case "rgb":
      if (
        !isFinite(colour.r) ||
        !isFinite(colour.g) ||
        !isFinite(colour.b) ||
        !isFinite(colour.a)
      ) {
        return toString(DEBUG_COLOUR);
      }
      const r = Math.round(colour.r);
      const g = Math.round(colour.g);
      const b = Math.round(colour.b);
      if (colour.a >= ONE_MINUS_EPSILON) {
        return `rgb(${r}, ${g}, ${b})`;
      } else {
        return `rgba(${r}, ${g}, ${b}, ${colour.a})`;
      }

    case "hsl":
      if (
        !isFinite(colour.h) ||
        !isFinite(colour.s) ||
        !isFinite(colour.l) ||
        !isFinite(colour.a)
      ) {
        return toString(DEBUG_COLOUR);
      }
      const h = Math.round(colour.h);
      const s = Math.round(colour.s);
      const l = Math.round(colour.l);
      if (colour.a >= ONE_MINUS_EPSILON) {
        return `hsl(${h}, ${s}%, ${l}%)`;
      } else {
        return `hsla(${h}, ${s}%, ${l}%, ${colour.a})`;
      }
  }
}

export function rgba(
  r: number,
  g: number,
  b: number,
  a: number,
  normalised?: false,
): Rgb;
export function rgba(
  r: number,
  g: number,
  b: number,
  a: number,
  normalised: true,
): RgbNormalised;
export function rgba(
  r: number,
  g: number,
  b: number,
  a: number,
  normalised: boolean,
): Rgb | RgbNormalised;
export function rgba(
  r: number,
  g: number,
  b: number,
  a: number,
  normalised = false,
): Rgb | RgbNormalised {
  if (normalised === true) {
    return {
      r: clamp(r, 0, 1),
      g: clamp(g, 0, 1),
      b: clamp(b, 0, 1),
      a: clamp(a, 0, 1),
      colourSpace: "rgb-normalised",
    };
  } else {
    return {
      r: clamp(r, 0, 255),
      g: clamp(g, 0, 255),
      b: clamp(b, 0, 255),
      a: clamp(a, 0, 1),
      colourSpace: "rgb",
    };
  }
}

export function rgb(r: number, g: number, b: number, normalised?: false): Rgb;
export function rgb(
  r: number,
  g: number,
  b: number,
  normalised: true,
): RgbNormalised;
export function rgb(
  r: number,
  g: number,
  b: number,
  normalised: boolean,
): Rgb | RgbNormalised;
export function rgb(
  r: number,
  g: number,
  b: number,
  normalised = false,
): Rgb | RgbNormalised {
  return rgba(r, g, b, 1, normalised);
}

export function hsla(
  h: number,
  s: number,
  l: number,
  a: number,
  normalised?: false,
): Hsl;
export function hsla(
  h: number,
  s: number,
  l: number,
  a: number,
  normalised: true,
): HslNormalised;
export function hsla(
  h: number,
  s: number,
  l: number,
  a: number,
  normalised: boolean,
): Hsl | HslNormalised;
export function hsla(
  h: number,
  s: number,
  l: number,
  a: number,
  normalised = false,
): Hsl | HslNormalised {
  if (normalised === true) {
    return {
      h: clampCycle(h, 1),
      s: clamp(s, 0, 1),
      l: clamp(l, 0, 1),
      a: clamp(a, 0, 1),
      colourSpace: "hsl-normalised",
    };
  } else {
    return {
      h: clampCycle(h, 360),
      s: clamp(s, 0, 100),
      l: clamp(l, 0, 100),
      a: clamp(a, 0, 1),
      colourSpace: "hsl",
    };
  }
}

export function hsl(h: number, s: number, l: number, normalised?: false): Hsl;
export function hsl(
  h: number,
  s: number,
  l: number,
  normalised: true,
): HslNormalised;
export function hsl(
  h: number,
  s: number,
  l: number,
  normalised: boolean,
): Hsl | HslNormalised;
export function hsl(
  h: number,
  s: number,
  l: number,
  normalised = false,
): Hsl | HslNormalised {
  return hsla(h, s, l, 1, normalised);
}

export function parse(h: string): Rgb | Hsl {
  if (h.startsWith("#")) {
    switch (h.length) {
      case 4:
        return parse(`#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}ff`);

      case 5:
        return parse(
          `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}${h[4]}${h[4]}`,
        );

      case 7:
        return parse(`${h}ff`);

      case 9:
        const r = parseInt(h.substr(1, 2), 16);
        const g = parseInt(h.substr(3, 2), 16);
        const b = parseInt(h.substr(5, 2), 16);
        const a = parseInt(h.substr(7, 2), 16) / 255;
        return rgba(r, g, b, a);

      default:
        throw new TypeError("Invalid colour expression.");
    }
  }

  if (has(CSS3_COLOURS, h)) {
    return parse(CSS3_COLOURS[h]);
  }

  const nexp = "\\s*((\\d+)|(\\d*\\.\\d+))\\s*";
  const nexpp = "\\s*((\\d+)|(\\d*\\.\\d+))\\%\\s*";

  const rgbExpr = RegExp(`^rgb\\s*\\(${nexp},${nexp},${nexp}\\)$`);
  const rgbaExpr = RegExp(`^rgba\\s*\\(${nexp},${nexp},${nexp},${nexp}\\)$`);

  const hslExpr = RegExp(`^hsl\\s*\\(${nexp},${nexpp},${nexpp}\\)$`);
  const hslaExpr = RegExp(`^hsla\\s*\\(${nexp},${nexpp},${nexpp},${nexp}\\)$`);

  const sanitised = h.toLowerCase().trim();

  if (sanitised.startsWith("rgba")) {
    const rgbaMatched = rgbaExpr.exec(sanitised);
    if (rgbaMatched) {
      return rgba(
        parseFloat(rgbaMatched[1]),
        parseFloat(rgbaMatched[4]),
        parseFloat(rgbaMatched[7]),
        parseFloat(rgbaMatched[10]),
      );
    }
  } else if (sanitised.startsWith("rgb")) {
    const rgbMatched = rgbExpr.exec(sanitised);
    if (rgbMatched) {
      return rgb(
        parseFloat(rgbMatched[1]),
        parseFloat(rgbMatched[4]),
        parseFloat(rgbMatched[7]),
      );
    }
  }

  if (sanitised.startsWith("hsla")) {
    const hslaMatched = hslaExpr.exec(sanitised);
    if (hslaMatched) {
      return hsla(
        parseFloat(hslaMatched[1]),
        parseFloat(hslaMatched[4]),
        parseFloat(hslaMatched[7]),
        parseFloat(hslaMatched[10]),
      );
    }
  } else if (sanitised.startsWith("hsl")) {
    const hslMatched = hslExpr.exec(sanitised);
    if (hslMatched) {
      return hsl(
        parseFloat(hslMatched[1]),
        parseFloat(hslMatched[4]),
        parseFloat(hslMatched[7]),
      );
    }
  }

  throw new TypeError("Invalid colour expression.");
}

function eq(a: number, b: number, epsilon: number) {
  const n = a - b;
  return n <= epsilon && n >= -epsilon;
}

export function almostEqual(c1: Type, c2: Type, epsilon = EPSILON): boolean {
  const nc1 = toRgb(c1);
  const nc2 = toRgb(c2);

  return (
    eq(nc1.r, nc2.r, epsilon) &&
    eq(nc1.g, nc2.g, epsilon) &&
    eq(nc1.b, nc2.b, epsilon) &&
    eq(nc1.a, nc2.a, epsilon)
  );
}

/**
 * Compose two colours above and below. If below is not defined, it's assumed
 * to be white, i.e. rgba(255, 255, 255, 1)
 *
 * All composition is done in RGB normalised colour space. This may result in
 * floating-point round-off errors if the existing colours are not in this
 * colour space.
 *
 * Painter's algorithm is used to composite the two colours (above and below)
 * see https://en.wikipedia.org/wiki/Alpha_compositing
 *
 * @param above the colour (including alpha) to be composited above
 * @param below the colour (including alpha) to be composited below. Note that
 *              if not provided, white is used.
 */
export function composite(above: Type, below?: Type): RgbNormalised {
  const belowNorm: RgbNormalised = below
    ? normalise(toRgb(below))
    : rgb(1, 1, 1, true);

  const aboveNorm = normalise(toRgb(above));
  const oneMinusAlpha = 1 - aboveNorm.a;

  const composeFn = (caTimesAlpha: number, cbTimesAlpha: number) =>
    caTimesAlpha + cbTimesAlpha * oneMinusAlpha;

  return rgba(
    composeFn(aboveNorm.r * aboveNorm.a, belowNorm.r * belowNorm.a),
    composeFn(aboveNorm.g * aboveNorm.a, belowNorm.g * belowNorm.a),
    composeFn(aboveNorm.b * aboveNorm.a, belowNorm.b * belowNorm.a),
    aboveNorm.a + belowNorm.a * oneMinusAlpha,
    true,
  );
}

export function compose<T extends Type>(): Transform<T, T>;
export function compose<
  T1 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  T4 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, T4>,
  tx4: Transform<T4, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  T4 extends Type,
  T5 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, T4>,
  tx4: Transform<T4, T5>,
  tx5: Transform<T5, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  T4 extends Type,
  T5 extends Type,
  T6 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, T4>,
  tx4: Transform<T4, T5>,
  tx5: Transform<T5, T6>,
  tx6: Transform<T6, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  T4 extends Type,
  T5 extends Type,
  T6 extends Type,
  T7 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, T4>,
  tx4: Transform<T4, T5>,
  tx5: Transform<T5, T6>,
  tx6: Transform<T6, T7>,
  tx7: Transform<T7, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  T4 extends Type,
  T5 extends Type,
  T6 extends Type,
  T7 extends Type,
  T8 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, T4>,
  tx4: Transform<T4, T5>,
  tx5: Transform<T5, T6>,
  tx6: Transform<T6, T7>,
  tx7: Transform<T7, T8>,
  tx8: Transform<T8, TR>,
): Transform<T1, TR>;
export function compose<
  T1 extends Type,
  T2 extends Type,
  T3 extends Type,
  T4 extends Type,
  T5 extends Type,
  T6 extends Type,
  T7 extends Type,
  T8 extends Type,
  T9 extends Type,
  TR extends Type,
>(
  tx1: Transform<T1, T2>,
  tx2: Transform<T2, T3>,
  tx3: Transform<T3, T4>,
  tx4: Transform<T4, T5>,
  tx5: Transform<T5, T6>,
  tx6: Transform<T6, T7>,
  tx7: Transform<T7, T8>,
  tx8: Transform<T8, T9>,
  tx9: Transform<T9, TR>,
): Transform<T1, TR>;
export function compose(
  ...transforms: Array<Transform<Type, Type>>
): Transform<Type, Type>;
export function compose(
  ...transforms: Array<Transform<Type, Type>>
): Transform<Type, Type> {
  return (initial: Type) => {
    let colour = initial;
    for (const transform of transforms) {
      colour = transform(colour);
    }
    return colour;
  };
}

/** Debug colour in RGB (0..255) */
export const DEBUG_COLOR_RGB = toRgb(DEBUG_COLOUR);
/** Debug colour in RGB (0..1) */
export const DEBUG_COLOR_RGB_NORMALIZED = normalise(toRgb(DEBUG_COLOUR));
/** Debug colour in HSL (0..360, 0..100) */
export const DEBUG_COLOR_HSL = toHsl(DEBUG_COLOUR);
/** Debug colour in HSL (0..1, 0..1) */
export const DEBUG_COLOR_HSL_NORMALIZED = normalise(toHsl(DEBUG_COLOUR));
