import defaultColors from './defaultColors'

/**
 * Style par défaut des éléments nécessitant un style spécifique
 * pas géré par le thème principal.
 */
const defaultStyles = {
  defaultMain: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '40px 24px 20px',
  },
  defaultLoaderWrapper: {
    margin: '100px auto 0',
    paddingLeft: 20,
    paddingRight: 20,
    maxWidth: 900,
    width: '100%',
    textAlign: 'center',
  },
  defaultLoader: {
    color: defaultColors.darkBackgroundColor,
  },
  hidden: {
    display: 'none',
  },
  black: {
    color: 'black',
  },
  noDecoration: {
    textDecoration: 'none',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  link: {
    color: defaultColors.darkBackgroundColor,
    textDecoration: 'underline',
    fontSize: 16,
  },
  block: {
    maxWidth: 900,
    margin: '0 auto 20px auto',
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
  },
  list: {
    paddingLeft: 16,
  },
  listItem: {
    color: defaultColors.starColor,
  },
  standardText: {
    fontSize: 14,
  },
  blueText: {
    color: defaultColors.darkBackgroundColor,
  },
}

export default defaultStyles
