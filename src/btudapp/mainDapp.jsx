import React from 'react';
import Web3Provider, { Connectors } from 'web3-react'

import ModeDapp from './modeDapp'
import InjectedConnector from './InjectedConnector'

function MainDapp () {
    const { NetworkOnlyConnector } = Connectors
    const Injected = new InjectedConnector({ supportedNetworks: [Number(process.env.REACT_APP_NETWORK_ID || '1')] })
    const Network = new NetworkOnlyConnector({ providerURL: process.env.REACT_APP_NETWORK_URL || '' })
    const connectors = { Injected, Network }

    return (
        <Web3Provider connectors={connectors} libraryName="ethers.js">
            <div className="App">
              <ModeDapp detectWallet />
            </div>
          </Web3Provider>
    )
}

export default MainDapp;