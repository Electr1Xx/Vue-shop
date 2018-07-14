export const UAH = (value) => {
  let price = Number.prototype.toFixed.call(parseFloat(value)),
    priceSep = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  return priceSep
}
