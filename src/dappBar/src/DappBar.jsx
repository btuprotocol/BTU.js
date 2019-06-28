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
const defaultAddr = "0xd00551b9d6CB3C4dDfc36df874c642b19D2b9e22"

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

const findGetParameter = (parameterName) => {
  var result = null, tmp = []
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

setDefaultLanguage(getLanguage())

class DappBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { addressChanged: false, accountError: undefined }
    sessionStorage.setItem("BTU-walletConnected", false)
  }

  componentDidMount() {
    const jquery = document.createElement("script")
    const web3js = document.createElement("script")
    const { restrictDomain } = this.props

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

    if (restrictDomain === undefined
      || (typeof restrictDomain == "string" && restrictDomain === window.location.hostname)
      || (Array.isArray(restrictDomain) && restrictDomain.includes(window.location.hostname))) {
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
  }

  onInputWallet(addresse) {
    if (addresse) {
      sessionStorage.setItem('BTU-walletAddr', addresse)
      sessionStorage.setItem("BTU-walletConnected", true)
      this.setState({ addressChanged: true })
    }
  }

  render() {
    const { classes, t, restrictDomain } = this.props
    const { addressChanged } = this.state
    const addresseBTU = sessionStorage.getItem('BTU-walletAddr');
    const isConnected = ((Boolean(addresseBTU) && addressChanged !== defaultAddr) || addressChanged)
    const languageParam = findGetParameter("hl")
    const transformWallet = addresseBTU
      ? addresseBTU.substring(0, 5) + '...' + addresseBTU.substring(38, 42) : ''

    if (languageParam !== null && supportedLanguages.includes(languageParam.toLowerCase())) {
      setDefaultLanguage(languageParam.toLowerCase())
    }

    if (restrictDomain !== undefined
      && (typeof restrictDomain == "string" && restrictDomain !== window.location.hostname
      || (Array.isArray(restrictDomain) && !restrictDomain.includes(window.location.hostname)))) {
        const walletAddr = findGetParameter("w")
        const pattern = new RegExp('^0[xX][0-9A-Fa-f]{40}$')
        if (walletAddr !== null && pattern.test(walletAddr) && addresseBTU !== walletAddr)
          this.onInputWallet(walletAddr)
        else if (walletAddr === null || !pattern.test(walletAddr))
          sessionStorage.setItem('BTU-walletAddr', defaultAddr)
        return null
    }

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
                isOpen={!isConnected}
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