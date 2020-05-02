/**
 * Unique.ts
 * @author Diao Zheng
 * @file A unique ID generator
 * @barrel export UniqueValue
 */

import * as Hashing from "./Hashing";
import { Opaque } from "./Types";
import { toHex } from './Integer';

declare const UniqueSymbol: unique symbol;

export type UniqueValue = Opaque<string, typeof UniqueSymbol>;

export class Unique {
  private static uniqueId = 0;
  private static instance = new Unique();
  public static get value() {
    return this.instance.opaque;
  }

  private id: number;
  private debugName: string;
  private instanceId: number;
  private instanceHash: number;
  private instanceName: string;

  constructor(debugName?: string) {
    this.id = 0;
    this.debugName = debugName || "Unique_Identifier";

    this.instanceId = Unique.uniqueId++;

    const hashedInstanceId = toHex(Hashing.hash(this.instanceId));

    this.instanceName = `${this.debugName}@${hashedInstanceId}`;
    this.instanceHash = Hashing.hash(this.instanceName);
  }

  public get string() {
    return `${this.instanceName}_${this.id++}`;
  }

  public get number() {
    return this.instanceHash ^ (this.id++);
  }

  public get opaque() {
    return this.string as UniqueValue;
  }

  public toString() {
    return this.instanceName;
  }
}
