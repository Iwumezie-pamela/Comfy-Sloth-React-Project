export const formatPrice = (number) => {
  //to format prices and number refers to the price we are estimating and this estimates whole numbers to decimals
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  //data is the parameter im  passing in that is all product and type would be the string passed
  let uniqueValue = data.map((item) => item[type])

  if (type === 'colors') {
    uniqueValue = uniqueValue.flat() //this returns an array instead of an array  of an array  It is used to flatten an array, to reduce the nesting of an array
  }

  return ['all', ...new Set(uniqueValue)]
}
