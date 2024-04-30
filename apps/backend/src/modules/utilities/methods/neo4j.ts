export const buildSetterString = ({
  params,
}: {
  params: Record<string, Record<string, unknown>>;
}) => {
  const setterArr = [];
  for (const key of Object.keys(params)) {
    const record = params[key];
    for (const recordKey of Object.keys(record)) {
      if (record[recordKey] !== undefined) {
        setterArr.push(`${key}.${recordKey}=$${recordKey}`);
      }
    }
  }
  return setterArr.join(', ');
};
