import {
  IOn,
  IDecorator,
  IInstance,
  Client
} from "..";

export class MetadataStorage {
  private static _instance: MetadataStorage;
  private _ons: IDecorator<IOn>[] = [];
  private _instances: IDecorator<IInstance>[] = [];

  static get Instance() {
    if (!this._instance) {
      this._instance = new MetadataStorage();
    }
    return this._instance;
  }

  AddOn(on: IDecorator<IOn>) {
    this._ons.push(on);
  }

  AddInstance(classType: IDecorator<any>) {
    this._instances.push({
      ...classType,
      params: {
        instance: new classType.class()
      }
    });
  }

  Build() {
    this._ons.forEach((on) => {
      const instance = this._instances.find((instance) => instance.class === on.class);
      if (instance) on.params.linkedInstance = instance.params;
    });
  }

  Map(client: Client) {
    this._ons.forEach((on) => {
      const fn = (...params: any[]) => {
        if (on.params.linkedInstance && on.params.linkedInstance.instance) {
          on.params.method.bind(on.params.linkedInstance.instance)(...params, this);
        } else {
          on.params.method(...params, this);
        }
      };
      if (on.params.once) {
        client.once(on.params.event, fn);
      } else {
        client.on(on.params.event, fn);
      }
      if (!client.silent) {
        console.log(`${on.params.event}: ${on.class.name}.${on.key}`);
      }
    });
  }

  private getReadonlyArray<Type>(array: Type[]) {
    return array as ReadonlyArray<Type>;
  }
}
