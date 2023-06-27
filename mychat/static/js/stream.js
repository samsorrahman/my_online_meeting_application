const App = 'ca36753ac8634a52a6a4883a21a4003e';
const CHANNEL = 'main';
const TOKEN = '007eJxTYHgdsdx6dS7PnU/6bjwaSzZ/d9t997Oj5PXY2z/5Ts5wOdmowJCcaGxmbmqcmGxhZmySaGqUaJZoYmFhnGhkmGhiYGCcyvRwZkpDICOD4OolDIxAyALEID4TmGQGkyxQMjcxM4+BAQAGAyLf';
let UID;

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remote = {};

let joinAndDisplayLocalStream = async () => {
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

joinAndDisplayLocalStream();
