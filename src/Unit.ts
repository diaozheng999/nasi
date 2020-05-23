import type { Opaque } from "./Types";
import { cast } from './Unsafe';

declare const nsUnitSymbol: unique symbol;

export type Unit = Opaque<void, typeof nsUnitSymbol>;

export const Unit: Unit = cast<Unit>(undefined);
