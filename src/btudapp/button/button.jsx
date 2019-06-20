import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'

import defaultColors from '../js/defaultColors'

const styles = {
  button: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    height: 60,
    borderRadius: 30,
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    boxSizing: 'border-box',
    lineHeight: '24px',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  light: {
    color: defaultColors.darkBackgroundColor + ' !important',
    background: defaultColors.lightBackgroundColor,
    border: '1px solid ' + defaultColors.darkBackgroundColor,
  },
  dark: {
    color: defaultColors.buttonTextColor + ' !important',
    background: defaultColors.darkBackgroundColor + ' !important',
  },
  disabledLight: {
    color: defaultColors.disabledBackgroundColor + ' !important',
    background: 'none',
    border: '1px solid ' + defaultColors.disabledBackgroundColor,
  },
  disabledDark: {
    color: defaultColors.disabledTextColor + ' !important',
    background: defaultColors.disabledBackgroundColor + ' !important',
  },
  buttonError: {
    border: '1.5px solid ' + defaultColors.errorColor + ' !important',
  },
}

/**
 * Bouton
 *
 * @param {string} [title=null] - Titre du bouton
 * @param {boolean} [light=false] - Style : light ou dark
 * @param {boolean} [textWrap=false] - true s'il est possible de wrapper le texte à la ligne
 * @param {boolean} [disabled=false] - Rendre le bouton cliquable ou pas
 * @param {boolean} [error=false] - Erreur
 * @param {string} [width=''] - Largeur du bouton
 * @param {string} [height=''] - Longueur du bouton
 * @param {string} [maxWidth='100%'] - Largeur maximale du bouton
 * @param {function} action - Action effectuée au clic sur le bouton
 */
class BtuButton extends Component {
  render() {
    const {
      children,
      classes,
      style,
      id,
      height,
      action,
      disabled,
      textWrap,
      light,
      error,
      width,
      maxWidth,
      title,
    } = this.props

    return (
      <Button
        id={id}
        disabled={disabled}
        onClick={action}
        className={classNames({
          [classes.button]: true,
          [classes.noWrap]: !textWrap,
          [classes.light]: light && !disabled,
          [classes.dark]: !light && !disabled,
          [classes.disabledLight]: light && disabled,
          [classes.disabledDark]: !light && disabled,
          [classes.buttonError]: error,
        })}
        style={{
          ...style,
          ...{
            width,
            height,
            maxWidth,
          },
        }}
      >
        { title || children }
      </Button>
      )
  }
}

/**
 * Types et valeurs par défaut des props
 */
BtuButton.propTypes = {
  children: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  height: PropTypes.string,
  title: PropTypes.string,
  light: PropTypes.bool,
  disabled: PropTypes.bool,
  textWrap: PropTypes.bool,
  error: PropTypes.bool,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  action: PropTypes.func,
}

BtuButton.defaultProps = {
  children: null,
  style: null,
  id: null,
  height: '',
  title: null,
  light: false,
  disabled: false,
  textWrap: false,
  error: false,
  width: '',
  maxWidth: '100%',
  action: () => null,
}

export default withStyles(styles)(BtuButton)
