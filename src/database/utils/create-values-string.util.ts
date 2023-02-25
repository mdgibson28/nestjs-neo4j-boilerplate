export function createValuesString(data: object): string {
  let values = '{';
  for (const key in data) {
    values += `${key}: $${key}, `;
  }
  values = values.slice(0, -2);
  values += '}';
  return values;
}
