import type { Opaque } from "./Types.ts";
import { cast } from "./Unsafe.ts";

declare const nsUnitSymbol: unique symbol;

export type Unit = Opaque<void, typeof nsUnitSymbol>;

export const Unit: Unit = cast<Unit>(undefined);
