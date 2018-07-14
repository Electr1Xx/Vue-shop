export const addItem = (state, item) => {
  const record = state.cart.find(p => p.item.id === item.id)
  state.cartTotal++
  if (!record) {
    state.cart.push({
      item,
      quantity: 1
    })
  } else {
    record.quantity++
  }
}
export const removeItem = (state, item) => {
  let deleteItem = state.cart.find(p => p.item.id === item.id)
  deleteItem.quantity--
  state.cartTotal--
  return state.cart
}
export const removeCart = (state) => {
  state.cart = []
  state.cartTotal = 0
}
