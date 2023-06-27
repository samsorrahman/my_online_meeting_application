const App = 'ca36753ac8634a52a6a4883a21a4003e';
const CHANNEL = 'main';
const TOKEN = '007eJxTYHgdsdx6dS7PnU/6bjwaSzZ/d9t997Oj5PXY2z/5Ts5wOdmowJCcaGxmbmqcmGxhZmySaGqUaJZoYmFhnGhkmGhiYGCcyvRwZkpDICOD4OolDIxAyALEID4TmGQGkyxQMjcxM4+BAQAGAyLf';
let UID;

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {}; // Define remoteUsers object to store user information

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);
    // joining the channel
    UID = await client.join(App, CHANNEL, TOKEN, null);

    // got video and audio tracks
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    // put it on browser creating a player
    let player = `
    <div class="video-container" id="user-container-${UID}">
    <div class="username-wrapper"><span class="user-name">My Name</span></div>
    <div class="video-player" id="user-${UID}"></div>
    </div>
`;

    // appending the player
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);

    localTracks[1].play(`user-${UID}`);

    // allowing others to see
    await client.publish([localTracks[0], localTracks[1]]);
};

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user; // Store the user information in remoteUsers object
    await client.subscribe(user, mediaType);

    if (mediaType == 'video') {
        let player = document.getElementById(`user-container-${user.uid}`);
        if (player != null) {
            player.remove();
        }
        // put it on browser creating a player
        player = `
        <div class="video-container" id="user-container-${user.uid}">
        <div class="username-wrapper"><span class="user-name">My Name</span></div>
        <div class="video-player" id="user-${user.uid}"></div>
        </div>
    `;

        // appending the player
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
        user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
};

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for (let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }
    await client.leave()
    window.open('/', '_self')
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else{
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

let toggleMic = async (e) => {
    if(localTracks[0].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}


joinAndDisplayLocalStream();
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)


