import { serialize } from 'object-to-formdata';

export function serializeToFormData(data: Record<string, unknown>) {
  return serialize(data, {
    booleansAsIntegers: true,
    indices: true,
  });
}
