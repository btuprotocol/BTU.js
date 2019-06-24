import React from 'react'
import { ethers } from 'ethers'
import classNames from 'classnames'
import { translate, getLanguage } from 'react-multi-lang'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Grid from '@material-ui/core/Grid'
import ArrowIcon from '@material-ui/icons/Details'

import BtuButton from './Button'
import BtuTextField from './TextField'

// Invalid images check out this link
// https://medium.com/a-beginners-guide-for-webpack-2/handling-images-e1a2a2c28f8d
// Try to override src by getting elem by id

//import ElecWallet from '../assets/electronic_wallet.png'
//import WalletWithout from '../assets/wallet_without.png'

const ElecWallet = '../assets/electronic_wallet.png'
const WalletWithout = '../assets/wallet_without.png'

class WalletDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      status: 'notConNoWal',
      checkValitidy: false,
      ethAddressInput: {
        value: '',
        isValid: false,
      },
    }
    this.popUp = this.popUp.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('walletAddr')) {
      this.setState({ status: 'isCon' })
    }
  }

  handleClickOpen () {
    const tmpStatus = localStorage.getItem('walletAddr') ? 'isCon' : 'notConNoWal'

    this.setState({
      open: true,
      status: tmpStatus,
    })
  }

  handleClose () {
    const tmpStatus = localStorage.getItem('walletAddr') ? 'isCon' : 'notConNoWal'

    this.setState({
      open: false,
      status: tmpStatus,
    })
  }

  onClickCreateWal () {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.open('https://trustwallet.com/', '_blank')
    } else if (getLanguage() === 'fr') {
        window.open('https://cryptoast.fr/tutoriel-metamask/', '_blank')
    } else {
      window.open('https://metamask.io', '_blank')
    }
    this.setState({ status: 'walCreated' })
  }

  onClickHasWal () {
    this.setState({ status: 'inputWal' })
  }

  onClickInputWal () {
    this.setState({ status: 'isCon' })
  }

  onClickConnect () {
    // console.log('connect metamask...')
    const { onInputWallet } = this.props
    const addrInput = document.querySelector('#addrWallet')

    // If wallet installed, reload page to detect it
    if ((!addrInput)) {
      window.location.reload()
      return
    }

    // If wallet address is invalid, show error
    if ((addrInput && addrInput.value === '')
    || !addrInput.value || addrInput.value.length < 42
    || !ethers.utils.isHexString(addrInput.value)) {
      this.setState({ checkValidity: true })
      return
    }

    onInputWallet(addrInput.value)
    this.setState({
      open: false,
      status: 'isCon',
      checkValidity: false,
    })
  }

  onClickConnectInput() {
    const {
      ethAddressInput,
    } = this.state

    if (ethAddressInput.isValid) {
      this.onClickConnect()
    } else {
      this.setState({
        checkValidity: true,
      })
    }
  }

  validateEthAddress(value) {
    const pattern = new RegExp('^0[xX][0-9A-Fa-f]{40}$')
    return pattern.test(value)
  }

  popUp(props) {
    const { classes } = this.props
    // const { status } = this.state

    return (
      <div className={classes.root}>
        <DialogContent className={classes.contentRoot}>
          <img src={props.img} alt="" />
          <DialogContentText id="alert-dialog-description">
            {props.text.map(item => (
              <span
                key={item}
                className={classNames({
                  [classes.dialogText]: true,
                  [classes.addressText]: item === localStorage.getItem('walletAddr'),
                })}
              >
                {item}
              </span>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Grid container spacing={8}>
            <Grid item xs={props.fullWidthButtons ? 12 : 6}>
              {props.leftButtonText
                && (
                  <BtuButton
                    title={props.leftButtonText}
                    action={props.leftButtonClick}
                    width="100%"
                    light={!props.fullWidthButtons}
                    textWrap
                  />
                )
              }
            </Grid>
            <Grid item xs={props.fullWidthButtons ? 12 : 6}>
              {props.rightButtonText
                && (
                  <BtuButton
                    title={props.rightButtonText}
                    action={props.rightButtonClick}
                    width="100%"
                    light={props.fullWidthButtons}
                    textWrap
                  />
                )
              }
            </Grid>
          </Grid>
        </DialogActions>
      </div>
    )
  }

  onEthAddressInputChange(newValue) {
    this.setState({
      ethAddressInput: newValue,
    })
  }

  render() {
    const {
      classes,
      t,
    } = this.props

    const {
      status,
      open,
      checkValidity,
      ethAddressInput,
    } = this.state

    const notConNoWal = this.popUp({
      img: ElecWallet,
      text: [
        'To use this service, please provide us with your Ethereum address',
        'Login or create one in a few clicks',
      ],
      leftButtonText: 'Create a wallet',
      leftButtonClick: this.onClickCreateWal.bind(this),
      rightButtonText: 'I already have a wallet',
      rightButtonClick: this.onClickHasWal.bind(this),
      fullWidthButtons: true,
     })

    const notConHasWal = this.popUp({
      img: ElecWallet,
      text: [
        'In order to use BTU-Hotel, please connect to your wallet, MetaMask or TrustWallet for example',
      ],
      leftButtonText: 'Change wallet',
      leftButtonClick: this.onClickHasWal.bind(this),
      rightButtonText: 'Connection',
      rightButtonClick: this.onClickConnect.bind(this),
     })

    const inputWal = (
      <div className={classes.root}>
        <DialogContent className={classes.contentRoot}>
          <img src={WalletWithout} alt="" />
          <DialogContentText id="alert-dialog-description">
            Please enter your ETH address
          </DialogContentText>
        </DialogContent>
        <BtuTextField
          title={'ETH address'}
          inputId="addrWallet"
          value={ethAddressInput.value}
          placeholder={'0x...'}
          validate={this.validateEthAddress}
          onChange={this.onEthAddressInputChange.bind(this)}
          required
          checkValidity={checkValidity}
          requiredMessage={'required'}
          invalidMessage={'Invalid ETH address'}
        />
        <DialogActions className={classes.actions}>
          <BtuButton
            title={'Connection'}
            action={this.onClickConnectInput.bind(this)}
          />
        </DialogActions>
      </div>
    )

    const walCreated = this.popUp({
      img: WalletWithout,
      text: ['After creating your wallet, you will have access to all our services.'],
      leftButtonText: 'I have created my wallet',
      leftButtonClick: this.onClickConnect.bind(this),
      rightButtonText: 'I already have a wallet',
      rightButtonClick: this.onClickHasWal.bind(this),
      fullWidthButtons: true,
     })

    // const transformWallet = store && store.get('addresseBTU')
    // ? store.get('addresseBTU').substring(0, 5) + '...' + store.get('addresseBTU').substring(38, 42)
    // : ''

    const isCon = this.popUp({
      img: WalletWithout,
      text: ['You are connected with following ETH address : ', localStorage.getItem('walletAddr')],
      leftButtonText: 'Change wallet',
      leftButtonClick: this.onClickHasWal.bind(this),
      fullWidthButtons: true,
    })

    return (
      <React.Fragment>
        <IconButton className={classes.imgLogo} variant="outlined" color="primary" onClick={this.handleClickOpen.bind(this)}>
          <ArrowIcon className={classes.arrowButton} />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {{
            notConNoWal,
            notConHasWal,
            inputWal,
            walCreated,
            isCon,
          }[status]}
        </Dialog>
      </React.Fragment>
    )
  }
}

const styles = {
	root: {
	  maxWidth: 400,
	  textAlign: 'center',
	  padding: 20,
	},
	contentRoot: {
	  textAlign: 'center',
	},
	imgLogo: {
	  color: 'white',
	  padding: 'unset',
	},
	arrowButton: {
	  width: 20,
	  height: 16,
	},
	select: {
	  background: '#5bace2 !important',
	  height: 45,
	  borderRadius: 25,
	  paddingLeft: 20,
	  paddingRight: 20,
	  marginTop: '5px !important',
	  overflow: 'hidden',
	  fontSize: 15,
	  textTransform: 'none',
	  justifyContent: 'left',
	  position: 'relative',
	  color: 'white',
	  marginBottom: 20,
	},
	actions: {
	  justifyContent: 'center',
	  flexDirection: 'column',
	},
	wide: {
	  width: '85%',
	  textAlign: 'center',
	  display: 'unset',
	},
	input: {
	  width: '85%',
	  margin: '0 auto 0 auto',
	},
	normalButton: {
	  transform: 'translate(0px, -5px)',
	},
	dialogText: {
	  marginTop: 10,
	  display: 'block',
	  // 'word-wrap': 'break-word',
	},
	addressText: {
	  fontSize: 12,
	},
}

export default withStyles(styles)(WalletDialog)