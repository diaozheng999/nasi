import * as Option from "./Option.ts";
/**
 * This is an immutable object that indicates a time range.
 */
export class TimeRange {
  public static Undefined = new TimeRange(NaN, NaN);
  public static deserialise(s: string) {
    const [token, lower, upper] = s.split("#");
    if (token !== this.timeRangeSerialisationToken) {
      return;
    }
    return new TimeRange(parseFloat(lower), parseFloat(upper));
  }
  public static serialise(range: TimeRange) {
    return [
      this.timeRangeSerialisationToken,
      range.start.toString(),
      range.end.toString(),
    ].join("#");
  }
  private static readonly timeRangeSerialisationToken = "__M1TR";
  /**
   * Returns a new time range with the lower bound that is lower.start and upper
   * bound that is upper.end.
   * @param lower a TimeRange whose lower bound is taken
   * @param upper  a TimeRange whose upper bound is taken
   * @requires lower.isWellDefined && upper.isWellDefined
   */
  private static createNewRangeFromExistingRanges(
    lower: TimeRange,
    upper: TimeRange
  ): TimeRange {
    const start = lower.start;
    const startDate = lower.cachedStartDate;
    const end = upper.end;
    const endDate = upper.cachedEndDate;
    const newRange = new TimeRange(start, end);
    newRange.cachedStartDate = startDate;
    newRange.cachedEndDate = endDate;
    return newRange;
  }
  private start: number;
  private end: number;
  private cachedStartDate?: Option.Nullable<Date>;
  private cachedEndDate?: Option.Nullable<Date>;
  private isWellDefined = true;
  constructor(start = -Infinity, end = Infinity) {
    this.start = start;
    this.end = end;
    if (isNaN(start) || isNaN(end)) {
      this.isWellDefined = false;
    }
    if (end < start) {
      this.isWellDefined = false;
    }
    // here, we want to enforce the following:
    // - that [0, 0] is well defined, but
    // - that [-Infinity, -Infinity] is _not_ well defined
    // - that [Infinity, Infinity] is _not_ well defined
    if (!isFinite(end) && !isFinite(start) && end === start) {
      this.isWellDefined = false;
    }
  }
  public get startDate() {
    if (Option.isSome(this.cachedStartDate)) {
      return Option.truthy(this.cachedStartDate);
    }
    this.cachedStartDate = null;
    if (this.isWellDefined && isFinite(this.start)) {
      this.cachedStartDate = new Date(this.start);
      return this.cachedStartDate;
    }
    return;
  }
  public get endDate() {
    if (Option.isSome(this.cachedEndDate)) {
      return Option.truthy(this.cachedEndDate);
    }
    this.cachedEndDate = null;
    if (this.isWellDefined && isFinite(this.end)) {
      this.cachedEndDate = new Date(this.end);
      return this.cachedEndDate;
    }
    return;
  }
  public hasStartDate(): boolean {
    return Option.isSome(this.startDate);
  }
  public hasEndDate(): boolean {
    return Option.isSome(this.endDate);
  }
  public intersect(range: TimeRange) {
    if (!(range.isWellDefined && this.isWellDefined)) {
      return TimeRange.Undefined;
    }
    const lower = range.start > this.start ? range : this;
    const upper = range.end < this.end ? range : this;
    return TimeRange.createNewRangeFromExistingRanges(lower, upper);
  }
  public union(range: TimeRange) {
    if (!range.isWellDefined) {
      return this;
    } else if (!this.isWellDefined) {
      return range;
    }
    // check for continuous block
    if (
      !this.isValidAtTimestamp(range.start) &&
      !range.isValidAtTimestamp(this.start)
    ) {
      return TimeRange.Undefined;
    }
    const lower = range.start < this.start ? range : this;
    const upper = range.end > this.end ? range : this;
    return TimeRange.createNewRangeFromExistingRanges(lower, upper);
  }
  public isValid(atTime?: Date) {
    if (!this.isWellDefined) {
      return false;
    }
    const time = Option.value_(atTime, () => new Date()).getTime();
    return this.isValidAtTimestamp(time);
  }
  public isValidAtTimestamp(timestamp: number) {
    return timestamp >= this.start && timestamp <= this.end;
  }
  public contains(range: TimeRange) {
    if (!range.isWellDefined) {
      return true;
    }
    if (!this.isWellDefined) {
      return false;
    }
    return (
      this.isValidAtTimestamp(range.start) && this.isValidAtTimestamp(range.end)
    );
  }
  public equals(range: TimeRange) {
    return this.contains(range) && range.contains(this);
  }
  public wellDefined() {
    return this.isWellDefined;
  }
}
