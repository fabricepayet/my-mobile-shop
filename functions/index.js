const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.addReservations = functions.database.ref(`/user-reservations/{userId}/{productId}`)
.onWrite(event => {
  const {
    userRef,
    userEmail,
    userName,
    timestamp,
    shopRef,
    productRef,
  } = event.data.val()
  admin.database().ref(`/reservations/${shopRef}/${productRef}/reservations/${userRef}`)
  .set({
    userEmail,
    userName,
    timestamp,
  })
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

exports.countReservations = functions.database.ref(`/reservations/{shopId}/{productId}/reservations`)
.onWrite(event => {
  return event.data.ref.parent.child('count').set(event.data.numChildren());
});
