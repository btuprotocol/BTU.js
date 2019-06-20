import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { translate, getLanguage } from 'react-multi-lang'
import { ethers } from 'ethers'
import classNames from 'classnames'

import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Grid from '@material-ui/core/Grid'
import ArrowIcon from '@material-ui/icons/Details'

import BtuButton from '../button/button'
import BtuTextField from '../textField/textField'

import store from '../js/magicStore'
import constants from '../js/config'

import ElecWallet from '../assets/electronic_wallet.png'
import WalletWithout from '../assets/wallet_without.png'

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

let globalOpen = false

class WalletDialog extends React.Component {
  state = {
    open: false,
    status: 'notConNoWal',
    checkValidity: false,
    ethAddressInput: {
      value: '',
      isValid: false,
    },
  }

  componentDidMount() {
    // console.log(store.get('addresseBTU'), store.get('addressDetected'))
    if (store.get('addressDetected') && store.get('addresseBTU')) {
      this.setState({ status: 'isCon' })
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props
    // console.log(status)
    if (prevProps.isOpen !== isOpen && !globalOpen) {
      globalOpen = true
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ open: true })
    }
  }

  handleClickOpen = () => {
    globalOpen = true
    const tmpStatus = store.get('addresseBTU') ? 'isCon' : 'notConNoWal'

    this.setState({
      open: true,
      status: tmpStatus,
    })
  };

  handleClose = () => {
    // const tmpStatus = status === 'isCon' ? 'isCon' : 'notConNoWal'
    const tmpStatus = store.get('addresseBTU') ? 'isCon' : 'notConNoWal'
    globalOpen = false

    this.setState({
      open: false,
      status: tmpStatus,
    })
  };

  onClickCreateWal = () => {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.open(constants.url.trustWallet, '_blank')
    } else if (getLanguage() === 'fr') {
        window.open(constants.url.metaMaskTutorial, '_blank')
    } else {
      window.open(constants.url.metaMask, '_blank')
    }
    this.setState({ status: 'walCreated' })
  }

  onClickHasWal = () => {
    this.setState({ status: 'inputWal' })
  }

  onClickInputWal = () => {
    this.setState({ status: 'isCon' })
  }

  onClickConnect = () => {
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

  onClickConnectInput = () => {
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

  validateEthAddress = (value) => {
    const pattern = new RegExp('^0[xX][0-9A-Fa-f]{40}$')
    return pattern.test(value)
  }

  popUp = (props) => {
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
                  [classes.addressText]: item === store.get('addresseBTU'),
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

  onEthAddressInputChange = (newValue) => {
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
        "t('dappBar.usingBTU.using'),",
        "t('dappBar.usingBTU.choiceConnected'),"
      ],
      leftButtonText: "t('dappBar.usingBTU.createWallet'),",
      leftButtonClick: this.onClickCreateWal,
      rightButtonText: "t('dappBar.usingBTU.hasWallet')",
      rightButtonClick: this.onClickHasWal,
      fullWidthButtons: true,
     })

    const notConHasWal = this.popUp({
      img: ElecWallet,
      text: [
        "t('dappBar.usingBTU.using.usingConnected')",
      ],
      leftButtonText: "t('dappBar.usingBTU.changeWallet')",
      leftButtonClick: this.onClickHasWal,
      rightButtonText: "t('dappBar.usingBTU.connection')",
      rightButtonClick: this.onClickConnect,
     })

    const inputWal = (
      <div className={classes.root}>
        <DialogContent className={classes.contentRoot}>
          <img src={WalletWithout} alt="" />
          <DialogContentText id="alert-dialog-description">
            {"t('dappBar.inputWallet.howTo')"}
          </DialogContentText>
        </DialogContent>
        <BtuTextField
          title={"t('dappBar.inputWallet.addrBTU')"}
          inputId="addrWallet"
          value={ethAddressInput.value}
          placeholder={"t('dappBar.inputWallet.placeholder')"}
          validate={this.validateEthAddress}
          onChange={this.onEthAddressInputChange}
          required
          checkValidity={checkValidity}
          requiredMessage={"t('dappBar.inputWallet.requiredETH')"}
          invalidMessage={"t('dappBar.inputWallet.invalidETH')"}
        />
        <DialogActions className={classes.actions}>
          <BtuButton
            title={"t('dappBar.inputWallet.inputCo')"}
            action={this.onClickConnectInput}
          />
        </DialogActions>
      </div>
    )

    const walCreated = this.popUp({
      img: WalletWithout,
      text: ["t('dappBar.isCreated.afterCreate')"],
      leftButtonText: "t('dappBar.isCreated.hasCreated')",
      leftButtonClick: this.onClickConnect,
      rightButtonText: "t('dappBar.isCreated.hasWallet')",
      rightButtonClick: this.onClickHasWal,
      fullWidthButtons: true,
     })

    // const transformWallet = store && store.get('addresseBTU')
    // ? store.get('addresseBTU').substring(0, 5) + '...' + store.get('addresseBTU').substring(38, 42)
    // : ''

    const isCon = this.popUp({
      img: WalletWithout,
      text: ["t('dappBar.isConnected.nowCo') + t('global.colon')", store.get('addresseBTU')],
      leftButtonText: "('dappBar.isConnected.switchWallet')",
      leftButtonClick: this.onClickHasWal,
      fullWidthButtons: true,
    })

    return (
      <React.Fragment>
        <IconButton className={classes.imgLogo} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          <ArrowIcon className={classes.arrowButton} />
        </IconButton>
        <Dialog
          open={open}
          onClose={this.handleClose}
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

WalletDialog.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  t: PropTypes.instanceOf(Object).isRequired,
  onInputWallet: PropTypes.func,
  isOpen: PropTypes.bool,
}

WalletDialog.defaultProps = {
  onInputWallet: () => null,
  isOpen: false,

}

export default withStyles(styles)(translate(WalletDialog))
