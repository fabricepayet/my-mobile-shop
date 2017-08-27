const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.addReservations = functions.database.ref(`/user-reservations/{userId}/{productId}`)
.onWrite(event => {
  const reservationValue = event.data.val()
  admin.database().ref(`/reservations/${reservationValue.shopRef}/${reservationValue.productRef}`)
  .set(reservationValue)
})

exports.addRecentProducts = functions.database.ref(`/products/{shopId}/{productId}`)
.onWrite(event => {
  const productValue = event.data.val()
  const productKey = event.data.key
  admin.database().ref(`/recent-products/${productKey}`).set(productValue)
})

exports.updateRecentProducts = functions.database.ref(`/products/{shopId}/{productId}`)
.onUpdate(event => {
  const productValue = event.data.val()
  admin.database().ref(`/recent-products/${productId}`).update(productValue)
})

exports.removeRecentProducts = functions.database.ref(`/products/{shopId}/{productId}`)
.onDelete(event => {
  admin.database().ref(`/recent-products/${productId}`).remove()
})
