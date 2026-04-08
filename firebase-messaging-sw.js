// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
            apiKey: "AIzaSyCxgScBxQ1habUoF4GRSgNeUgAiAoSxQY0",
            authDomain: "transaction-56206.firebaseapp.com",
            projectId: "transaction-56206",
            storageBucket: "transaction-56206.firebasestorage.app",
            messagingSenderId: "240740017957",
            appId: "1:240740017957:web:87b3932cfb204c4c7f9ccc",
            measurementId: "G-2BR60LS3QM"
        };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
        tag: 'reminder-' + Date.now()
    };

    // Trigger voice alert in the main window
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'TRIGGER_VOICE',
                text: payload.notification.body
            });
        });
    });

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
