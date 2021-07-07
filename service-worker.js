self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        let headers = new Headers()
        headers.append("X-Custom-Header", "Random value")
        return fetch(event.request, {headers: headers})
    }());
});
