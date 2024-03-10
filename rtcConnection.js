// Peer 1
const lc = new RTCPeerConnection();

const dc = lc.createDataChannel("channel");
dc.onmessage = (e) => console.log("Just got a msg = ", e.data);
dc.onopen = (e) => console.log("Connection opened");

lc.onicecandidate = (e) =>
  console.log("New Ice candidate! reprintimg SDP = ", JSON.stringify(lc.localDescription));

lc.createOffer().then((offer) => lc.setLocalDescription(offer));

//Peer 2
const offer = {
  type: "offer",
  sdp: "v=0\r\no=- 971042534342164176 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:1942517593 1 udp 2113937151 adc5e3dd-8440-4275-8f08-0cbbe66fa362.local 50609 typ host generation 0 network-cost 999\r\na=candidate:1675718828 1 udp 2113939711 545a398e-5794-49c2-9c6d-1a2b8e4dbcf4.local 50610 typ host generation 0 network-cost 999\r\na=ice-ufrag:CfyT\r\na=ice-pwd:UrzvFDs2yH42ArznpiMvTmwH\r\na=ice-options:trickle\r\na=fingerprint:sha-256 2D:60:30:B3:78:E9:24:60:68:77:3C:83:B0:F5:4F:22:48:72:7A:D2:B7:42:A5:B0:A3:EF:BC:7F:DB:E9:DA:44\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};

const rc = new RTCPeerConnection();
rc.onicecandidate = (e) =>
  console.log("New Ice candidate! reprintimg SDP = ", JSON.stringify(rc.localDescription));
rc.ondatachannel = (e) => {
  rc.dc = e.channel;
  rc.dc.onmessage = (e) => console.log("New msg from client = ", e.data);
  rc.dc.onopen = (e) => console.log("Connection open");
};
rc.setRemoteDescription(offer).then((e) => console.log("Offer set"));
rc.createAnswer()
  .then((ans) => rc.setLocalDescription(ans))
  .then((e) => console.log("Answer created"));

//Peer 1
let answer = {
  type: "answer",
  sdp: "v=0\r\no=- 5892613780979949777 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=candidate:1551979357 1 udp 2113937151 669ca16b-8d8a-47b5-bd7e-96836c19dae7.local 57254 typ host generation 0 network-cost 999\r\na=candidate:1286100136 1 udp 2113939711 a4ac5790-09bb-4bb7-92e6-402e50c63a37.local 57255 typ host generation 0 network-cost 999\r\na=ice-ufrag:LnCD\r\na=ice-pwd:ZbwgMDC9QHPvMXZ7bULk0kqb\r\na=ice-options:trickle\r\na=fingerprint:sha-256 41:91:B1:88:42:F9:78:EE:91:11:6B:AB:F2:06:B8:6E:93:2B:03:50:FD:69:F4:05:51:B6:1D:5C:9F:E1:19:92\r\na=setup:active\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
};
lc.setRemoteDescription(answer);

// TO SEND from Peer 1 ->
dc.send("Yo watsupp peer 2!");

// TO SEND from Peer 2 ->
rc.dc.send("Im good how are you peer 1?");
