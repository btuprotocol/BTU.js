import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { translate } from 'react-multi-lang'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MetaMaskStatus from '@material-ui/icons/Brightness1'
import WalletDialog from '../dialog/walletDialog'

import store from  '../../js/magicStore'
import defaultColors from '../../js/defaultColors'

const styles = {
  connectionText: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    color: defaultColors.dappBarTextColor,
    fontSize: 12,
    marginBottom: 0,
  },
  metaLogo: {
    width: 20,
    height: 18.62,
    marginRight: 10,
  },
  barStyle: {
    height: 22,
    backgroundColor: defaultColors.dappBarBackgroundColor,
  },
  notConnected: {
    color: defaultColors.errorColor,
    width: 20,
    height: 12,
  },
  connected: {
    color: defaultColors.okColor,
    width: 20,
    height: 12,
  },
  statusText: {
    fontSize: 11,
    color: defaultColors.dappBarTextColor,
  },
  ToolBar: {
    minHeight: 'unset',
    height: '100%',
    justifyContent: 'space-between',
  },
  leftPanel: {
    display: 'flex',
    alignItems: 'center',
  },
  rightPanel: {
    display: 'flex',
    alignItems: 'center',
  },
}


class DappBar extends React.Component {
  state = {
    addressChanged: false,
  }

  onInputWallet = (addresseBTU) => {
    store.update({
      addresseBTU,
      addressChanged: true,
    })
    store.save()
    this.setState({ addressChanged: true })
  }

  render() {
    const {
      classes,
      dappIsOpen,
      t,
    } = this.props

    const {
      addressChanged,
    } = this.state

    const addresseBTU = store.get('addresseBTU')
    const isConnected = (Boolean(addresseBTU) || addressChanged)
    const transformWallet = addresseBTU
      ? store.get('addresseBTU').substring(0, 5) + '...' + store.get('addresseBTU').substring(38, 42)
      : ''

    return (
      <div>
        <AppBar position="static" className={classes.barStyle}>
          <Toolbar className={classes.ToolBar}>
            <div className={classes.leftPanel}>
              {/* <img src={MetaLogo} alt="" className={classes.metaLogo} /> */}
              <Typography variant="caption" color="inherit" className={classes.connectionText}>
                {isConnected
                  ? t('dappBar.connected').toLowerCase()
                  : t('dappBar.connectionRequired').toLowerCase()
                }
              </Typography>
            </div>
            <div className={classes.rightPanel}>
              <Typography variant="caption" className={classes.statusText}>
                {isConnected ? transformWallet : t('dappBar.notConnected')}
              </Typography>
              <MetaMaskStatus className={isConnected ? classes.connected : classes.notConnected} />
              <WalletDialog
                onInputWallet={this.onInputWallet}
                isOpen={dappIsOpen}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

DappBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.instanceOf(Object).isRequired,
  // isConnected: PropTypes.bool,
  dappIsOpen: PropTypes.bool,
}

DappBar.defaultProps = {
  // isConnected: true,
  dappIsOpen: false,
}

export default withStyles(styles)(translate(DappBar))
