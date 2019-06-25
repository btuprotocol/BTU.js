import React from 'react'
import { setTranslations, setDefaultLanguage, translate } from 'react-multi-lang'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MetaMaskStatus from '@material-ui/icons/Brightness1'

import defaultColors from '../js/defaultColors'
import en from '../translation/en.js'
import fr from '../translation/fr.js'
import WalletDialog from './WalletDialog'

setTranslations({en, fr})
setDefaultLanguage('en')

const supportedLanguages = ['en', 'fr']
const defaultLanguage = supportedLanguages[0]

let language = navigator !== undefined ? navigator.language || navigator.userLanguage : 'en'
language = language.substr(0, 2)

const getLanguage = () => {
  if (language !== undefined && language.length) {
    const lowerCaseLanguage = language.toLowerCase()
      if (supportedLanguages.includes(lowerCaseLanguage)) {
        return lowerCaseLanguage
      }
  }
  return defaultLanguage
}

setDefaultLanguage(getLanguage())

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
      if (err) {
        this.setState({accountError: err})
      } else {
        this.onInputWallet(res[0])
      }
    }

    window.addEventListener('load', async () => {

      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable()
            window.web3.eth.getAccounts(onAccountGet)
        } catch (error) {
          this.setState({accountError: error})
        }
      } else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          window.web3.eth.getAccounts(onAccountGet)
      } else {
          console.log(this.props.t('dappBar.nonEtherumBrowser'));
      }
    })
  }

  componentWillUnmount() {
    let persist = this.props.persist !== false
      && this.props.persist !== null 
      && this.props.persist !== undefined ? true : false
    if (!persist) {
      sessionStorage.removeItem('walletAddr')
    }
  }

  onInputWallet(addresse) {
    if (addresse) {
      sessionStorage.setItem('walletAddr', addresse)
      this.setState({ addressChanged: true })
    }
  }

  render() {
    const { classes, t } = this.props
    const { addressChanged } = this.state
    const addresseBTU = sessionStorage.getItem('walletAddr');
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
                  ? t('dappBar.connected')
                  : t('dappBar.connectionRequired')
                }
              </Typography>
            </div>
            <div className={classes.rightPanel}>
              {<Typography variant="caption" className={classes.statusText}>
                {isConnected ? transformWallet : t('dappBar.notConnected')}
              </Typography>}
              <MetaMaskStatus className={isConnected ? classes.connected : classes.notConnected} />
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

export default withStyles(styles)(translate(DappBar))