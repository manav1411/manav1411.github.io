async function fetchIGProfilePic(input) {
    if (!/^https?:\/\/i.instagram.com\//.test(window.location.href)) {
        if (window.confirm('fetchIGProfilePic:\n\nWe need to navigate to i.instagram.com for the request to work. (We need to make the request from the same domain as the profile pic API; CORS policy.) Please run the script after doing this.\n\nNavigate to i.instagram.com? (Ignore the 404 error.)')) {
            window.location.href = 'https://i.instagram.com/api/v1/';
            return;
        } else {
            return 'fetchIGProfilePic: Cancelled.';
        }
    }
    let response;
    let output;
    try {
        response = await fetch('https://www.instagram.com/' + input + '/?__a=1');
        if (!response.ok) {
            console.log('Failed 1st step, to fetch userID, with bad response status:' + response.status);
            return;
        }
    } catch(error) {
        console.log('Failed 1st step, to fetch userID, with ok response status: ' + error);
        return;
    }
    let userData = await response.json();
    try {
        response = await fetch('https://i.instagram.com/api/v1/users/' + userData.graphql.user.id + '/info/', {
            // The following doesn't seem to be necessary in a console request, but I kept it in in case you have issues at this stage.
            headers: {'user-agent': 'Mozilla/5.0 (Linux; Android 9; GM1903 Build/PKQ1.190110.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36 Instagram 103.1.0.15.119 Android (28/9; 420dpi; 1080x2260; OnePlus; GM1903; OnePlus7; qcom; sv_SE; 164094539)'
            }
        });
        if (!response.ok) {
            console.log('Failed 2nd step, to fetch profile pic URL, with bad response status: ' + response.status);
            window.alert('fetchIGProfilePic:\n\nYou might not be logged in, which is necesary for the request to work. Please log into an Instagram account, then run this script again.');
            return;
        }
    } catch(error) {
        console.log('Failed 2nd step, to fetch profile pic URL, with ok response status: ' + error);
        return;
    }
    let profileData = await response.json();
    console.log('Full-size profile pic URL of ' + input + ':\n' + profileData.user.hd_profile_pic_url_info.url);
}

fetchIGProfilePic('instagram'); // Enter the username here.
