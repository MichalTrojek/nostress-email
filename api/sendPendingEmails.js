const { db } = require('../firebase');
const { sendOrderFinishedEmailTo } = require('../utils/emailSender');

const sendPendingEmails = () => {
  db.collection('pendingEmails')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        sendEmailAfterHour(doc);
      });
    });
};

// 3600 = 1hr in seconds
function sendEmailAfterHour(doc) {
  const currTimeInSeconds = Math.round(Date.now() / 1000);
  const timeDiff = currTimeInSeconds - doc.data().created.seconds;
  if (timeDiff > 3600) {
    sendOrderFinishedEmailTo(doc.data().email, doc.data().order);
    deleteEmailAfterSent(doc);
  }
}

function deleteEmailAfterSent(doc) {
  db.collection('pendingEmails').doc(doc.id).delete();
}

module.exports = {
  sendPendingEmails,
};
