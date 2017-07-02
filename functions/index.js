const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.addReservations = functions.database.ref(`/user-reservations/{userId}/{productId}`)
.onWrite(event => {
  const reservationValue = event.data.val()
  admin.database().ref(`/reservations/${reservationValue.storeRef}/${reservationValue.productRef}`)
  .set(reservationValue)
})

exports.addRecentProducts = functions.database.ref(`/products/{storeId}/{productId}`)
.onWrite(event => {
  const productValue = event.data.val()
  const productKey = event.data.key
  admin.database().ref(`/recent-products/${productKey}`).set(productValue)
})
