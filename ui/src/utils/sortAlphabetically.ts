export const sortAlphabetically = (a: string, b: string) => {
  if (a < b) return -1
  if (b > a) return 1
  return 0
}

export default sortAlphabetically
