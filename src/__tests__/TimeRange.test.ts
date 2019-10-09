/**
 * TimeRange.test.ts
 * @author Diao Zheng
 * @file Test cases for time range class.
 */

import { TimeRange } from "../TimeRange";

describe("containment", () => {
  test("empty is contained", () => {
    const range = new TimeRange(0, 100);
    expect(range.contains(TimeRange.Undefined)).toBe(true);
  });

  test("empty contains empty", () => {
    expect(TimeRange.Undefined.contains(TimeRange.Undefined)).toBe(true);
  });

  test("empty cannot contain any non-empty object", () => {
    const range = new TimeRange(0, 0);

    expect(range.wellDefined()).toBe(true);

    expect(TimeRange.Undefined.contains(range)).toBe(false);
    expect(range.contains(TimeRange.Undefined)).toBe(true);
  });

  test("containment range", () => {
    expect(new TimeRange().contains(new TimeRange())).toBe(true);
    expect(new TimeRange().contains(new TimeRange(0))).toBe(true);
    expect(new TimeRange(0).contains(new TimeRange())).toBe(false);
    expect(new TimeRange(0, 1).contains(new TimeRange(0, 1))).toBe(true);
    expect(new TimeRange(0, 1).contains(new TimeRange(0, 0))).toBe(true);
    expect(new TimeRange(0, 1).contains(new TimeRange(-1, 1))).toBe(false);
    expect(new TimeRange(2, 3).contains(new TimeRange(-1, 0))).toBe(false);
  });
});

describe("definedness", () => {
  test("NaN", () => {
    expect(new TimeRange(NaN).wellDefined()).toBe(false);
    expect(new TimeRange(NaN, NaN).wellDefined()).toBe(false);
    expect(new TimeRange(undefined, NaN).wellDefined()).toBe(false);
    expect(new TimeRange(10, NaN).wellDefined()).toBe(false);
    expect(TimeRange.Undefined.wellDefined()).toBe(false);
  });

  test("lower bounded", () => {
    expect(new TimeRange(Infinity).wellDefined()).toBe(false);
    expect(new TimeRange(0).wellDefined()).toBe(true);
    expect(new TimeRange(-Infinity).wellDefined()).toBe(true);
  });

  test("upper bounded", () => {
    expect(new TimeRange(undefined, -Infinity).wellDefined()).toBe(false);
    expect(new TimeRange(undefined, 0).wellDefined()).toBe(true);
    expect(new TimeRange(undefined, Infinity).wellDefined()).toBe(true);
  });

  test("bounded", () => {
    expect(new TimeRange().wellDefined()).toBe(true);
    expect(new TimeRange(0, 0).wellDefined()).toBe(true);
    expect(new TimeRange(Infinity, -Infinity).wellDefined()).toBe(false);
    expect(new TimeRange(0, -0).wellDefined()).toBe(true);
    expect(new TimeRange(0, -1).wellDefined()).toBe(false);
  });
});

describe("equality", () => {
  test("empty", () => {
    expect(TimeRange.Undefined.equals(TimeRange.Undefined)).toBe(true);
    expect(TimeRange.Undefined.equals(new TimeRange(0, -1))).toBe(true);
    expect(TimeRange.Undefined.equals(new TimeRange(0, 0))).toBe(false);
    expect(TimeRange.Undefined.equals(new TimeRange(NaN))).toBe(true);
  });

  test("universe", () => {
    const range1 = new TimeRange();
    const range2 = new TimeRange();
    expect(range1.equals(range2)).toBe(true);
    expect(range1).not.toBe(range2);
  });

  test("bounded", () => {
    const range1 = new TimeRange(0, 0);
    const range2 = new TimeRange(0, -0);
    expect(range1.equals(range2)).toBe(true);
  });
});

describe("intersect", () => {

  test("empty", () => {
    const input = new TimeRange(0, 1).intersect(TimeRange.Undefined);
    expect(input.equals(TimeRange.Undefined)).toBe(true);

    expect(
      TimeRange.Undefined.intersect(
        TimeRange.Undefined,
      ).equals(TimeRange.Undefined),
    ).toBe(true);
  });

  test("universe", () => {
    expect(new TimeRange().intersect(new TimeRange()).equals(new TimeRange()))
    .toBe(true);

    const range1 = new TimeRange(0, 0);
    expect(new TimeRange().intersect(range1).equals(range1)).toBe(true);
    expect(range1.intersect(new TimeRange()).equals(range1)).toBe(true);

    const range2 = new TimeRange(5);
    expect(new TimeRange().intersect(range2).equals(range2)).toBe(true);
    expect(range2.intersect(new TimeRange()).equals(range2)).toBe(true);
  });

  test("bounded", () => {
    // [========]
    //    [==]
    const range1 = new TimeRange(0, 1000);
    const range2 = new TimeRange(250, 750);
    expect(range1.intersect(range2).equals(range2)).toBe(true);

    //    [==]
    // [========]
    expect(range2.intersect(range1).equals(range2)).toBe(true);

    // [=====]
    //    [=====]
    const range3 = new TimeRange(0, 750);
    const range4 = new TimeRange(250, 1000);
    expect(range3.intersect(range4).equals(range2)).toBe(true);

    //    [=====]
    // [=====]
    expect(range4.intersect(range3).equals(range2)).toBe(true);

    // [========]
    // [========]
    expect(range1.intersect(range1).equals(range1)).toBe(true);

    // [==]
    //       [==]
    const range5 = new TimeRange(0, 250);
    const range6 = new TimeRange(750, 1000);
    expect(range5.intersect(range6).equals(TimeRange.Undefined)).toBe(true);
  });
});

describe("union", () => {

  test("empty", () => {
    const input = new TimeRange(0, 1).union(TimeRange.Undefined);
    expect(input.equals(new TimeRange(0, 1))).toBe(true);

    expect(TimeRange.Undefined.union(input).equals(input)).toBe(true);

    expect(
      TimeRange.Undefined.union(
        TimeRange.Undefined,
      ).equals(TimeRange.Undefined),
    ).toBe(true);
  });

  test("universe", () => {
    expect(new TimeRange().union(new TimeRange()).equals(new TimeRange()))
    .toBe(true);

    const universe = new TimeRange();

    const range1 = new TimeRange(0, 0);
    expect(new TimeRange().union(range1).equals(universe)).toBe(true);
    expect(range1.union(new TimeRange()).equals(universe)).toBe(true);

    const range2 = new TimeRange(5);
    expect(new TimeRange().union(range2).equals(universe)).toBe(true);
    expect(range2.union(new TimeRange()).equals(universe)).toBe(true);
  });

  test("bounded", () => {
    // [========]
    //    [==]
    const range1 = new TimeRange(0, 1000);
    const range2 = new TimeRange(250, 750);
    expect(range1.union(range2).equals(range1)).toBe(true);

    //    [==]
    // [========]
    expect(range2.union(range1).equals(range1)).toBe(true);

    // [=====]
    //    [=====]
    const range3 = new TimeRange(0, 750);
    const range4 = new TimeRange(250, 1000);
    expect(range3.union(range4).equals(range1)).toBe(true);

    //    [=====]
    // [=====]
    expect(range4.union(range3).equals(range1)).toBe(true);

    // [========]
    // [========]
    expect(range1.union(range1).equals(range1)).toBe(true);

    // [==]
    //       [==]
    const range5 = new TimeRange(0, 250);
    const range6 = new TimeRange(750, 1000);
    expect(range5.union(range6).equals(TimeRange.Undefined)).toBe(true);
  });
});

describe("isValid", () => {

  test("undefined", () => {
    expect(TimeRange.Undefined.isValid()).toBe(false);
  });

  test("universe", () => {
    expect(new TimeRange().isValid()).toBe(true);
  });

  test("singleton date", () => {
    const time = new Date();
    const ts = time.getTime();
    expect(new TimeRange(ts, ts).isValid(time)).toBe(true);
  });
});

describe("has dates", () => {
  test("undefined", () => {
    expect(TimeRange.Undefined.hasEndDate()).toBe(false);
    expect(TimeRange.Undefined.hasEndDate()).toBe(false);

    expect(TimeRange.Undefined.hasStartDate()).toBe(false);
    expect(TimeRange.Undefined.hasStartDate()).toBe(false);

    const range = new TimeRange(1, 0);
    expect(range.hasEndDate()).toBe(false);
    expect(range.hasEndDate()).toBe(false);

    expect(range.hasStartDate()).toBe(false);
    expect(range.hasStartDate()).toBe(false);
  });

  test("unbounded", () => {
    const range = new TimeRange();
    expect(range.hasEndDate()).toBe(false);
    expect(range.hasEndDate()).toBe(false);

    expect(range.hasStartDate()).toBe(false);
    expect(range.hasStartDate()).toBe(false);
  });

  test("lower bounded", () => {
    const range = new TimeRange(0);
    expect(range.hasEndDate()).toBe(false);
    expect(range.hasEndDate()).toBe(false);

    expect(range.hasStartDate()).toBe(true);
    expect(range.hasStartDate()).toBe(true);
  });

  test("upper bounded", () => {
    const range = new TimeRange(undefined, 0);
    expect(range.hasEndDate()).toBe(true);
    expect(range.hasEndDate()).toBe(true);

    expect(range.hasStartDate()).toBe(false);
    expect(range.hasStartDate()).toBe(false);
  });

  test("bounded", () => {
    const range = new TimeRange(0, 1);
    expect(range.hasEndDate()).toBe(true);
    expect(range.hasEndDate()).toBe(true);

    expect(range.hasStartDate()).toBe(true);
    expect(range.hasStartDate()).toBe(true);
  });
});

describe("dates", () => {
  test("undefined", () => {
    expect(TimeRange.Undefined.endDate).toBeUndefined();
    expect(TimeRange.Undefined.endDate).toBeUndefined();

    expect(TimeRange.Undefined.startDate).toBeUndefined();
    expect(TimeRange.Undefined.startDate).toBeUndefined();

    const range = new TimeRange(1, 0);
    expect(range.endDate).toBeUndefined();
    expect(range.endDate).toBeUndefined();

    expect(range.startDate).toBeUndefined();
    expect(range.startDate).toBeUndefined();
  });

  test("unbounded", () => {
    const range = new TimeRange();
    expect(range.endDate).toBeUndefined();
    expect(range.endDate).toBeUndefined();

    expect(range.startDate).toBeUndefined();
    expect(range.startDate).toBeUndefined();
  });

  test("lower bounded", () => {
    const range = new TimeRange(0);
    expect(range.endDate).toBeUndefined();
    expect(range.endDate).toBeUndefined();

    expect((range.startDate as Date).getTime()).toBe(0);
    expect((range.startDate as Date).getTime()).toBe(0);
  });

  test("upper bounded", () => {
    const range = new TimeRange(undefined, 0);
    expect((range.endDate as Date).getTime()).toBe(0);
    expect((range.endDate as Date).getTime()).toBe(0);

    expect(range.startDate).toBeUndefined();
    expect(range.startDate).toBeUndefined();
  });

  test("bounded", () => {
    const range = new TimeRange(0, 1);
    expect((range.endDate as Date).getTime()).toBe(1);
    expect((range.endDate as Date).getTime()).toBe(1);

    expect((range.startDate as Date).getTime()).toBe(0);
    expect((range.startDate as Date).getTime()).toBe(0);
  });
});

describe("serialisation", () => {
  test("valid serialisation", () => {
    const range = new TimeRange(0, 1);
    const range2 = TimeRange.deserialise(TimeRange.serialise(range));
    expect(range2).toBeDefined();
    expect(range.equals(range2!)).toBe(true);
  });

  test("invalid serialisation", () => {
    expect(TimeRange.deserialise("babablaskdfjalskd")).toBeUndefined();
  });

});
