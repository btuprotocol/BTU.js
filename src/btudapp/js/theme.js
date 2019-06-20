import { createMuiTheme } from '@material-ui/core/styles'

import defaultColors from './defaultColors'

const getTheme = (themeData = {}) => {
  return createMuiTheme({
    palette: {
      primary: { main: '#5336ab' },
      secondary: { main: '#ebebeb' },
      background: {
        default: '#ffffff',
      },
    },
    typography: {
      useNextVariants: true,
      suppressDeprecationWarnings: true,
      fontFamily: "'Lato', sans-serif",
    },
    overrides: {
      MuiTypography: {
        body1: {
          fontSize: 16,
          lineHeight: '1em',
        },
        body2: {
          fontSize: 16,
        },
        caption: {
          fontSize: 14,
        },
        h4: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 'bold',
          fontSize: 20,
          lineHeight: '30px',
          color: defaultColors.sectionTitleTextColor,
          marginBottom: 10,
        },
        h5: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 'bold',
          color: '#100505',
          fontSize: 35,
          marginBottom: 20,
        },
        h6: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 'bold',
          color: '#000000',
          fontSize: 20,
          marginBottom: 20,
        },
      },
      MuiButton: {
        root: {
          background: defaultColors.darkBackgroundColor,
          color: defaultColors.buttonTextColor,
          borderRadius: 50,
          textTransform: 'uppercase',
          fontFamily: "'Poppins', sans-serif",
          fontSize: 14,
        },
        textPrimary: {
          color: '#5336ab',
          background: 'none',
          textTransform: 'none',
          fontWeight: 'normal',
        },
      },
      MuiFormLabel: {
        root: {
          fontSize: 13,
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: defaultColors.defaultTextColor + ' !important',
        },
      },
      MuiFormControlLabel: {
        label: {
          color: defaultColors.defaultTextColor,
        },
      },
      MuiCheckbox: {
        root: {
          '&$checked': {
            color: defaultColors.defaultTextColor + ' !important',
          },
        },
      },
      MuiRadio: {
        root: {
          '&$checked': {
            color: defaultColors.defaultTextColor + ' !important',
          },
        },
      },
      MuiDivider: {
        root: {
          height: 0,
          borderBottom: '1px solid ' + defaultColors.lightTextColor,
          marginTop: 40,
          marginBottom: 30,
        },
      },
      MuiAppBar: {
        root: {
          boxShadow: '2px 2px 8px ' + defaultColors.shadowColor,
        },
      },
    },
  })
}

export default getTheme
