export const evaluateAttributeFilterType = (name: string) => {
  switch (name) {
    case 'Release Date':
      return 'release'
    case 'Signed':
      return 'signed'
    default:
      return 'attribute'
  }
}

export default evaluateAttributeFilterType
