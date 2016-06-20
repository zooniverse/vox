export function objectFilter (obj, func) {
  return (
    Object.keys(obj)
    .filter(key => func(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {})
  )
}
