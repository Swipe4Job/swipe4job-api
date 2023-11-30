export abstract class Serializer {
  abstract serialize(): object;
}

export function implementsSerializer(value: any): value is Serializer {
  return 'serialize' in value && typeof value.serialize === 'function';
}
