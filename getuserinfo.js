     async function fetchUserInfo() {
       const accessToken = getAccessTokenFromCookie(); // Implement this function to get the token from cookies
       if (!accessToken) {
         console.error('No access token found.');
         return null;
       }
       try {
         const response = await fetch('/apis/user.openshift.io/v1/users/~', {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
         });
         if (!response.ok) {
           console.error('Error fetching user info:', response.status, response.statusText);
           return null;
         }
         const userData = await response.json();
         return userData;
       } catch (error) {
         console.error('Error fetching user info:', error);
         return null;
       }
     }

     function getAccessTokenFromCookie() {
        // Implement logic to retrieve the access token from cookies
        // Example:
        const cookies = document.cookie.split(';');
        for(let cookie of cookies){
            let [name,value] = cookie.trim().split('=');
            if(name === 'oauth_access_token'){
                return value;
            }
        }
        return null;
     }

     async function displayUserInfo() {
       const userInfo = await fetchUserInfo();
       if (userInfo) {
         console.log('User ID:', userInfo.metadata.name);
         // Additional logic to use the user info
       }
     }

     displayUserInfo();
