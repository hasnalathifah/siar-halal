import { Category } from '@/types/entities/category';

export function getCategoryFromId(
  category?: Category[],
  categoryId?: number
): Category | undefined {
  if (!category || !categoryId) return undefined;

  for (const obj of category) {
    if (obj.id === categoryId) {
      return obj;
    }
    if (obj.child) {
      const result = getCategoryFromId(obj.child, categoryId);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}
