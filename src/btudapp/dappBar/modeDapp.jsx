import React, { /* useState, */ useEffect } from 'react'
import PropTypes from 'prop-types'
import { useWeb3Context } from 'web3-react'

// import connectors from './connectors'
import store from '../../js/magicStore'
import DappBar from './dappBar'

function ModeDapp({ detectWallet, dappIsOpen }) {
  const context = useWeb3Context()
  const { active, account, error } = context
  let open = false

  useEffect(() => {
    if (!store.get('addressDetected')) {
      store.update({ addresseBTU: undefined })
      store.save()
    }

    if (detectWallet && !store.get('addresseBTU')) {
      context.setFirstValidConnector(['Injected'])
    }
  }, [])

  useEffect(() => {
    if (dappIsOpen) {
      context.setFirstValidConnector(['Injected'])
    }
  }, [dappIsOpen])

  if (!active && !error) {
    // console.log('loading')
  } else if (error && !detectWallet) {
    console.log(error, detectWallet)
    open = true
  } else if (!store.get('addressChanged')) {
    // console.log(account)
    if (account) {
      store.update({
        addresseBTU: account,
        addressDetected: true,
      })
      store.save()
    } else {
      context.unsetConnector()
      open = true
    }
  }

  return (
    <React.Fragment>
      <DappBar dappIsOpen={open} />
    </React.Fragment>
  )
}

/**
 * Types et valeurs par défaut des props
 */
ModeDapp.propTypes = {
  dappIsOpen: PropTypes.bool,
  detectWallet: PropTypes.bool,
}

ModeDapp.defaultProps = {
  dappIsOpen: false,
  detectWallet: false,
}

export default ModeDapp
