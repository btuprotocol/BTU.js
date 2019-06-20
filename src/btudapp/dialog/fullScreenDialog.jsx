import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
  dialog: {
    margin: 50,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    outline: 'none',
  },
  close: {
    position: 'absolute',
    top: -50,
    right: -50,
    color: 'white',
  },
}

/**
 * Pop-up plein écran, avec une croix permettant la fermeture en haut à droite
 *
 * @param {object} children - composants enfants
 *                            implicitement passés par <FullScreenDialog>children</FullScreenDialog>
 * @param {string} className - classe spécifique
 * @param {bool} open - true si la pop-up est visible
 * @param {func} onClose - Appelée à la fermeture de la pop-up
 * @param {bool} [disableBackdropClick=false] - true s'il n'est pas possible de fermer la pop-up
 *                                              en cliquant sur le pourtour
 */
class FullScreenDialog extends React.Component {
  render() {
    const {
      classes,
      children,
      className,
      open,
      onClose,
      disableBackdropClick,
    } = this.props
    return (
      <Modal
        open={open}
        className={classNames(classes.dialog, className)}
        onEscapeKeyDown={onClose}
        onBackdropClick={disableBackdropClick ? () => null : onClose}
        disableBackdropClick={disableBackdropClick}
        BackdropProps={{ classes: { root: classes.backdrop } }}
      >
        <div className={classes.wrapper}>
          {children}
          <IconButton
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Modal>
    )
  }
}

/**
 * Types et valeurs par défaut des props
 */
FullScreenDialog.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  disableBackdropClick: PropTypes.bool,
}

FullScreenDialog.defaultProps = {
  className: null,
  open: false,
  onClose: () => null,
  disableBackdropClick: false,
}

export default withStyles(styles)(FullScreenDialog)
