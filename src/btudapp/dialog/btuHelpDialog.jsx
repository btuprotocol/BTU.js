import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { translate } from 'react-multi-lang'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import FullScreenDialog from './fullScreenDialog'

import AlertImg from '../../assets/alert.svg'
import WinBtuImg from '../../assets/winBTU.svg'
import AmazonCardImg from '../../assets/carteAMAZON_30.png'

import defaultColors from '../../js/defaultColors'

const styles = {
  wrapper: {
    maxWidth: 600,
    width: '100%',
    background: 'white',
    margin: '0 auto',
    border: 0,
    borderRadius: 10,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 30,
    maxHeight: '100%',
    overflowY: 'auto',
  },
  intro: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },
  alert: {
    marginRight: 20,
  },
  introText: {
    color: defaultColors.defaultTextColor,
    fontFamily: '"Lato", sans-serif',
    fontSize: 16,
    lineHeight: '19px',
  },
  column: {
    textAlign: 'center',
  },
  image: {
    maxWidth: 200,
    marginBottom: 20,
  },
  title: {
    color: defaultColors.sectionTitleTextColor,
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '27px',
    marginBottom: 20,
  },
  text: {
    color: defaultColors.defaultTextColor,
    fontFamily: '"Lato", sans-serif',
    fontSize: 16,
    lineHeight: '19px',
  },
}

/**
 * Pop-up affichant l'aide BTU
 *
 */
class BtuHelpDialog extends Component {
  render() {
    const {
      classes,
      open,
      onClose,
      t,
    } = this.props

    return (
      <FullScreenDialog
        open={open}
        onClose={onClose}
      >
        <div className={classes.wrapper}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <div className={classes.intro}>
                <img src={AlertImg} className={classes.alert} alt="" />
                <Typography variant="body1" className={classes.introText}>
                  {t('btuHelp.text1')}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.column}>
              <img
                className={classes.image}
                src={WinBtuImg}
                alt="Win BTU"
              />
              <Typography variant="body1" className={classes.title}>
                {t('btuHelp.text2')}
              </Typography>
              <Typography variant="body1" className={classes.text}>
                {t('btuHelp.text3')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.column}>
              <img
                className={classes.image}
                src={AmazonCardImg}
                alt="Gift Card"
              />
              <Typography variant="body1" className={classes.title}>
                {t('btuHelp.text4')}
              </Typography>
              <Typography variant="body1" className={classes.text}>
                {t('btuHelp.text5')}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </FullScreenDialog>
    )
  }
}

/**
 * Types et valeurs par défaut des props
 */
BtuHelpDialog.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

BtuHelpDialog.defaultProps = {
  open: false,
  onClose: () => null,
}

export default withStyles(styles)(translate(BtuHelpDialog))
