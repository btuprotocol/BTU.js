import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import FullScreenDialog from './fullScreenDialog'

import { constructMapUrl } from '../../js/helpers'

const styles = {
  iframe: {
    width: '100%',
    height: '100%',
  },
}

/**
 * Pop-up affichant une carte centrée sur des coordonnées spécifiques
 *
 * @param {float} latitude - Latitude du centre de la carte
 * @param {float} longitude - Longitude du centre de la carte
 */
class MapDialog extends Component {
  render() {
    const {
      classes,
      open,
      onClose,
      latitude,
      longitude,
    } = this.props

    const mapUrl = constructMapUrl(latitude, longitude)

    return (
      <FullScreenDialog
        open={open}
        onClose={onClose}
      >
        <iframe
          title="map"
          className={classes.iframe}
          src={mapUrl}
        />
      </FullScreenDialog>
    )
  }
}

/**
 * Types et valeurs par défaut des props
 */
MapDialog.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

MapDialog.defaultProps = {
  latitude: null,
  longitude: null,
  open: false,
  onClose: () => null,
}

export default withStyles(styles)(MapDialog)
