import {
  MetadataStorage,
  DiscordEvent
} from "..";

export function On(event: DiscordEvent, restriction?: [Function , string]);
export function On(event: string, restriction?: [Function , string]);
export function On(event: DiscordEvent | string, restriction?: [Function , string]) {
  if(event === "message" && restriction){
    return (target: Object, key: string, descriptor: PropertyDescriptor): void => {
      MetadataStorage.Instance.AddOn({
        class: target.constructor,
        key,
        params: {
          event,
          once: false,
          method: descriptor.value,
          restriction: restriction
        }
      });
    };
  }else if(restriction){ // Only message events can be restricted
    throw '@On may only be restricted with "message" event';
  }else{
    return (target: Object, key: string, descriptor: PropertyDescriptor): void => {
      MetadataStorage.Instance.AddOn({
        class: target.constructor,
        key,
        params: {
          event,
          once: false,
          method: descriptor.value
        }
      });
    };
  }
}
