export abstract class Serializer {
  abstract serialize(): object;
}

export function implementsSerializer(value: any): value is Serializer {
  return (
    typeof value === 'object' &&
    'serialize' in value &&
    typeof value.serialize === 'function'
  );
}
