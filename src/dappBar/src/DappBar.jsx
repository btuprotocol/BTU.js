import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MetaMaskStatus from '@material-ui/icons/Brightness1'

import defaultColors from '../js/defaultColors'

import WalletDialog from './WalletDialog'

class DappBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { addressChanged: false, accountError: undefined }
  }

  componentDidMount() {
    const jquery = document.createElement("script")
    const web3js = document.createElement("script")

    jquery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    jquery.async = true
    
    web3js.src = "https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js"
    web3js.async = true

    document.body.appendChild(jquery)
    document.body.appendChild(web3js)

    const onAccountGet = (err, res) => {
      console.log("Account get", err, res)
      if (err) {
        this.setState({accountError: err})
      } else {
        console.log("HERE", res[0])
        this.onInputWallet(res[0])
      }
    }

    window.addEventListener('load', async () => {

      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            console.log("Asking for permission")
            await ethereum.enable()
            console.log("getting account")
            window.web3.eth.getAccounts(onAccountGet)
        } catch (error) {
          this.setState({accountError: error})
        }
      } else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          window.web3.eth.getAccounts(onAccountGet)
      } else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    })

  }

  onInputWallet(addresse) {
    if (addresse) {
      localStorage.setItem('walletAddr', addresse)
      localStorage.setItem('addressChanged', true)
      this.setState({ addressChanged: true })
    }
  }

  render() {
    const { classes } = this.props
    const { addressChanged } = this.state
    const addresseBTU = localStorage.getItem('walletAddr');
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
              A
              {<WalletDialog
                onInputWallet={this.onInputWallet.bind(this)}
                isOpen={true}
              />}
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