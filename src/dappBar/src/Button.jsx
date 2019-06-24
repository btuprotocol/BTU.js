import React, { Component } from 'react'
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
          style,
          
        }}
      >
        { title || children }
      </Button>
    )
  }
}

// ...{
//   width,
//   height,
//   maxWidth,
// },

export default withStyles(styles)(BtuButton)