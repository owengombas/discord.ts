import { Client as ClientJS } from "discord.js";
import * as Glob from "glob";
import {
  MetadataStorage,
  LoadClass
} from ".";

export class Client extends ClientJS {
  private _silent: boolean;
  private _loadClasses: LoadClass[] = [];

  get silent() {
    return this._silent;
  }
  set silent(value: boolean) {
    this._silent = value;
  }

  login(token: string, ...loadClasses: LoadClass[]) {
    this._loadClasses = loadClasses;
    this.loadClasses();

    MetadataStorage.Instance.Build();
    MetadataStorage.Instance.Map(this);

    return super.login(token);
  }

  private loadClasses() {
    if (this._loadClasses) this._loadClasses.forEach((file) => {
      if (typeof file === "string") {
        const files = Glob.sync(file);
        files.forEach((file) => {
          require(file);
        });
      }
    });
  }
}
