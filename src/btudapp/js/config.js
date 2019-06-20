const constants = {
  url: {
    btuProtocol: 'https://btu-protocol.com/',
    legalNotices: 'https://btu-hotel.com/disclaimer',
    trustWallet: 'https://trustwallet.com/',
    metaMask: 'https://metamask.io',
    metaMaskTutorial: 'https://cryptoast.fr/tutoriel-metamask/',
    openStreeMapEmbed: 'https://www.openstreetmap.org/export/embed.html',
  },
}

/* eslint-disable no-empty */
/* eslint-disable brace-style  */

const env = process.env.REACT_APP_ENV

// Common
// ..

// ============ STAGE =================
if (env === 'STAGE') {
  constants.apiBaseUrl = 'http://35.180.32.38:8081'
}

// ============ LOCAL =================

else if (env === 'LOCAL') {
  constants.apiBaseUrl = 'http://localhost:8080'
}

// ============= PROD =================

else {
  constants.apiBaseUrl = 'https://api.btu-direct.com'
}

module.exports = constants
