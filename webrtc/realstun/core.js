// stun.l.google.com
export function initConnection() {
  // Create the local connection and its event listeners
  
  const rtc = new RTCPeerConnection({
    iceServers:[{
      urls: 'stun:stun.stunprotocol.org:3478'
    }]
  });


  
  return rtc
}
  


function handleCreateDescriptionError(error) {
  console.log("Unable to create an offer: " + error.toString());
}

// Handle successful addition of the ICE candidate
// on the "local" end of the connection.

function handleLocalAddCandidateSuccess() {
  connectButton.disabled = true;
}

// Handle successful addition of the ICE candidate
// on the "remote" end of the connection.

function handleRemoteAddCandidateSuccess() {
  disconnectButton.disabled = false;
}

// Handle an error that occurs during addition of ICE candidate.

function handleAddCandidateError() {
  console.log("Oh noes! addICECandidate failed!");
}

// Handles clicks on the "Send" button by transmitting
// a message to the remote peer.

function sendMessage() {
  var message = messageInputBox.value;
  sendChannel.send(message);
  
  // Clear the input box and re-focus it, so that we're
  // ready for the next message.
  
  messageInputBox.value = "";
  messageInputBox.focus();
}


export {}

// (function() {

//     // Define "global" variables
    
//     var sendButton = null;
//     var messageInputBox = null;
//     var receiveBox = null;
    
//     var localConnection = null;   // RTCPeerConnection for our "local" connection
    
//     var sendChannel = null;       // RTCDataChannel for the local (sender)
//     var receiveChannel = null;    // RTCDataChannel for the remote (receiver)
    
//     // Functions
    
//     // Set things up, connect event listeners, etc.
    
//     function startup() {
//       connectPeers()
//     }

    
    
    
    
    
//     // Handle status changes on the local end of the data
//     // channel; this is the end doing the sending of data
//     // in this example.
    
//     function handleSendChannelStatusChange(event) {
//       if (sendChannel) {
//         var state = sendChannel.readyState;
      
//         if (state === "open") {
//           messageInputBox.disabled = false;
//           messageInputBox.focus();
//           sendButton.disabled = false;
//           disconnectButton.disabled = false;
//           connectButton.disabled = true;
//         } else {
//           messageInputBox.disabled = true;
//           sendButton.disabled = true;
//           connectButton.disabled = false;
//           disconnectButton.disabled = true;
//         }
//       }
//     }
    
//     // Called when the connection opens and the data
//     // channel is ready to be connected to the remote.
    
//     function receiveChannelCallback(event) {
//       receiveChannel = event.channel;
//       receiveChannel.onmessage = handleReceiveMessage;
//       receiveChannel.onopen = handleReceiveChannelStatusChange;
//       receiveChannel.onclose = handleReceiveChannelStatusChange;
//     }
    
//     // Handle onmessage events for the receiving channel.
//     // These are the data messages sent by the sending channel.
    
//     function handleReceiveMessage(event) {
//       var el = document.createElement("p");
//       var txtNode = document.createTextNode(event.data);
      
//       el.appendChild(txtNode);
//       receiveBox.appendChild(el);
//     }
    
//     // Handle status changes on the receiver's channel.
    
//     function handleReceiveChannelStatusChange(event) {
//       if (receiveChannel) {
//         console.log("Receive channel's status has changed to " +
//                     receiveChannel.readyState);
//       }
      
//       // Here you would do stuff that needs to be done
//       // when the channel's status changes.
//     }
    
//     // Close the connection, including data channels if they're open.
//     // Also update the UI to reflect the disconnected status.
    
//     function disconnectPeers() {
    
//       // Close the RTCDataChannels if they're open.
      
//       sendChannel.close();
//       receiveChannel.close();
      
//       // Close the RTCPeerConnections
      
//       localConnection.close();
//       remoteConnection.close();
  
//       sendChannel = null;
//       receiveChannel = null;
//       localConnection = null;
//       remoteConnection = null;
      
//       // Update user interface elements
      
//       connectButton.disabled = false;
//       disconnectButton.disabled = true;
//       sendButton.disabled = true;
      
//       messageInputBox.value = "";
//       messageInputBox.disabled = true;
//     }
    
//     // Set up an event listener which will run the startup
//     // function once the page is done loading.
    
//     window.addEventListener('load', startup, false);
//   })();