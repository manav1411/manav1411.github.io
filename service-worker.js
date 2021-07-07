self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        let headers = new Headers()
        headers.append('UserAgent', 'Mozilla/5.0 (Linux; Android 9; GM1903 Build/PKQ1.190110.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 Instagram 103.1.0.15.119 Android (28/9; 420dpi; 1080x2260; OnePlus; GM1903; OnePlus7; qcom; sv_SE; 164094539)')
        return fetch(event.request, {headers: headers})
    }());
});
