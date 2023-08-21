export function toggleArrayValue<T>(collection: T[], item: T): T[] {
  const index = collection.indexOf(item);

  if (index !== -1) {
    collection.splice(index, 1);
  } else {
    collection.push(item);
  }

  return collection;
}
