import {SessionToken, Shell} from "../../../../../main/types";
import {IpcClient} from "./ipc-client";
import {NgZone} from "@angular/core";

export class IpcShellSession extends IpcClient implements Shell {
  constructor(zone: NgZone, private token: SessionToken) {
    super(zone, 'shell-session');
  }

  closed(): Promise<boolean> {
    return this.invoke('closed', this.token);
  }

  dumb(): Promise<boolean> {
    return this.invoke('dumb', this.token);
  }

  close(): Promise<void> {
    return this.invoke('close', this.token);
  }

  write(data: string): Promise<void> {
    return this.invoke('write', this.token, data);
  }

  resize(rows: number, cols: number, height: number, width: number): Promise<void> {
    return this.invoke('resize', this.token, rows, cols, height, width);
  }

  buffer(): Promise<string> {
    return this.invoke('buffer', this.token);
  }

  listen(event: string, callback: (...args: any[]) => void): this {
    this.on(`${event}.${this.token.key}`, callback);
    return this;
  }

}
