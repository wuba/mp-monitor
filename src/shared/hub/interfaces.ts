import { Client } from '../types';
import { Hub } from './hub';
import { Scope } from './scope';

export interface Layer {
  client?: Client;
  scope?: Scope;
}
export interface Carrier {
  __BEIDOU__?: {
    hub?: Hub;
    extensions?: { [key: string]: Function };
  };
}
