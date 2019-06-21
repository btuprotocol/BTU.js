import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import defaultColors from '../js/defaultColors'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MetaMaskStatus from '@material-ui/icons/Brightness1'
//import WalletDialog from '../dialog/walletDialog'

class DappBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { addressChanged: false }
  }

  onInputWallet(addresseBTU) {
    localStorage.setItem('BTUaddress', addresseBTU)
    localStorage.setItem('addressChanged', true)
    this.setState({ addressChanged: true })
  }

  render() {
    const { classes } = this.props
    const { addressChanged } = this.state
    const addresseBTU = localStorage.getItem('BTUaddress');
    const isConnected = (Boolean(addresseBTU) || addressChanged)
    const transformWallet = addresseBTU
      ? addresseBTU.substring(0, 5) + '...' + addresseBTU.substring(38, 42) : ''

    return (
      <div>
        <AppBar position="static" className={classes.barStyle}>
          <Toolbar className={classes.ToolBar}>
          <div className={classes.leftPanel}>
              <Typography variant="caption" color="inherit" className={classes.connectionText}>
                {isConnected
                  ? 'connected'
                  : 'connexion required'
                }
              </Typography>
            </div>
            <div className={classes.rightPanel}>
              {<Typography variant="caption" className={classes.statusText}>
                {isConnected ? transformWallet : 'not connected'}
              </Typography>}
              <MetaMaskStatus className={isConnected ? classes.connected : classes.notConnected} />
              {/*<WalletDialog
                onInputWallet={this.onInputWallet}
                isOpen={dappIsOpen}
              />*/}
              </div>
            </Toolbar>
          </AppBar>
      </div>
    )
  }
}

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

export default withStyles(styles)(DappBar)