import { MemPool } from "@thi.ng/malloc";
import { BroadcastChannel } from "worker_threads";
export interface Variable<T> {
  name: string;
  value: T;
}

export interface SharedHeap {
  /** A single length Int32Array backed by a shared array buffer that is incremented on other workers to claim the data. */
  claim: Int32Array;
  /** All the memory segments in this heap. */
  segments: MemorySegments;
}

export namespace SharedHeap {
  const channel = new BroadcastChannel("shared-heap");
}