import en from "../locales/en.json";

export function t(path, params = {}) {
  const keys = path.split(".");
  let value = en;
  for (const k of keys) {
    value = value?.[k];
  }
  if (typeof value !== "string") return path;

  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`{{${key}}}`, params[key]),
    value
  );
}
