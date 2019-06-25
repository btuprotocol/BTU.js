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

import { electronicWallet, withoutWallet } from '../assets/images'

class WalletDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: this.props.isOpen ? true : false,
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
    if (sessionStorage.getItem('walletAddr')) {
      this.setState({ status: 'isCon' })
    }
  }

  handleClickOpen () {
    const tmpStatus = sessionStorage.getItem('walletAddr') ? 'isCon' : 'notConNoWal'

    this.setState({
      open: true,
      status: tmpStatus,
    })
  }

  handleClose () {
    const tmpStatus = sessionStorage.getItem('walletAddr') ? 'isCon' : 'notConNoWal'

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
                  [classes.addressText]: item === sessionStorage.getItem('walletAddr'),
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
      img: electronicWallet,
      text: [
        t('dappBar.usingBTU.using'),
        t('dappBar.usingBTU.choiceConnected'),
      ],
      leftButtonText: t('dappBar.usingBTU.createWallet'),
      leftButtonClick: this.onClickCreateWal.bind(this),
      rightButtonText: t('dappBar.usingBTU.hasWallet'),
      rightButtonClick: this.onClickHasWal.bind(this),
      fullWidthButtons: true,
     })

    const notConHasWal = this.popUp({
      img: electronicWallet,
      text: [
        t('dappBar.usingBTU.usingConnected'),
      ],
      leftButtonText: t('dappBar.usingBTU.changeWallet'),
      leftButtonClick: this.onClickHasWal.bind(this),
      rightButtonText: t('dappBar.usingBTU.connection'),
      rightButtonClick: this.onClickConnect.bind(this),
     })

    const inputWal = (
      <div className={classes.root}>
        <DialogContent className={classes.contentRoot}>
          <img src={withoutWallet} alt="" />
          <DialogContentText id="alert-dialog-description">
            Please enter your ETH address
          </DialogContentText>
        </DialogContent>
        <BtuTextField
          title={t('dappBar.inputWallet.addrBTU')}
          inputId="addrWallet"
          value={ethAddressInput.value}
          placeholder={t('dappBar.inputWallet.placeholder')}
          validate={this.validateEthAddress}
          onChange={this.onEthAddressInputChange.bind(this)}
          required
          checkValidity={checkValidity}
          requiredMessage={t('dappBar.inputWallet.requiredETH')}
          invalidMessage={t('dappBar.inputWallet.invalidETH')}
        />
        <DialogActions className={classes.actions}>
          <BtuButton
            title={t('dappBar.inputWallet.inputCo')}
            action={this.onClickConnectInput.bind(this)}
          />
        </DialogActions>
      </div>
    )

    const walCreated = this.popUp({
      img: withoutWallet,
      text: [t('dappBar.isCreated.afterCreate')],
      leftButtonText: t('dappBar.isCreated.hasCreated'),
      leftButtonClick: this.onClickConnect.bind(this),
      rightButtonText: t('dappBar.isCreated.hasWallet'),
      rightButtonClick: this.onClickHasWal.bind(this),
      fullWidthButtons: true,
     })

    // const transformWallet = store && store.get('addresseBTU')
    // ? store.get('addresseBTU').substring(0, 5) + '...' + store.get('addresseBTU').substring(38, 42)
    // : ''

    const isCon = this.popUp({
      img: withoutWallet,//Change space to , v
      text: [t('dappBar.isConnected.nowCo') + ": " + sessionStorage.getItem('walletAddr')],
      leftButtonText: t('dappBar.usingBTU.changeWallet'),
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

export default withStyles(styles)(translate(WalletDialog))