/**
 * CoreDate.ts
 * @author Diao Zheng
 * @file Utility file for dates
 * @barrel export all
 */
import { isNone, Nullable, Type, wrapFinite } from "./Option.ts";
export const MAX_REPRESENTABLE = 8.64e15;
export const MIN_REPRESENTABLE = -8.64e15;
// tslint:disable:max-line-length
/**
 * Function to convert timestamp (nullable AND/OR optional number) into
 * date (Date).
 *
 * @param timestamp nullable, optional number
 * @returns
 *  `undefined` if
 *    timestamp is either:
 *      - `undefined`
 *      - `null`
 *      - `POSITIVE_INFINITY`
 *      - `NEGATIVE_INFINITY`
 *      - `NAN`
 *      - greater than `8.64e15` where `8.64e15` is maximum timestamp that
 *        Javascript can convert to Date object
 *      - less than `-8.64e15` where `-8.64e15` is minimum timestamp that
 *        Javascript can convert to Date object.
 *
 * `Date` object otherwise.
 *
 * Note that both `0` and `-0` result in `new Date(0)`.
 *
 * Refer to : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * The JavaScript Date object range is -100,000,000 days to 100,000,000 days
 * relative to January 1, 1970 UTC.
 */
// tslint:enable:max-line-length
export function wrapDate(timestamp?: Nullable<number>): Type<Date> {
  if (
    timestamp === undefined ||
    timestamp === null ||
    isNone(wrapFinite(timestamp)) ||
    timestamp > MAX_REPRESENTABLE ||
    timestamp < MIN_REPRESENTABLE
  ) {
    return undefined;
  } else {
    return new Date(timestamp);
  }
}
