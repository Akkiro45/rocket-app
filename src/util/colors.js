const getColor = (theme) => {
  // const LIGHT_THEME = {
  //   primary: '#9c27b0',
  //   subPrimary: '#ba68c8',
  //   statusBar: '#8e24aa',
  //   textColor: '#000000',
  //   primaryTextColor: '#9c27b0',
  //   background: '#ffffff',
  //   spinner: '#ba68c8'
  // }
  const LIGHT_THEME = {
    theme: 'LIGHT',
    primary: '#ff7043',
    subPrimary: '#ff8a65',
    statusBar: '#ff5722',
    textColor: '#000000',
    primaryTextColor: '#ff7043',
    background: '#ffffff',
    spinner: '#ff8a65',
    danger: '#ff0000',
    linkColor: '#2874ff'
  }
  const DARK_THEME = {
    theme: 'DARK',
    primary: '#ff7043',
    subPrimary: '#ff8a65',
    statusBar: '#ff5722',
    textColor: '#ffffff',
    primaryTextColor: '#ff7043',
    background: '#424242',
    spinner: '#ff8a65',
    danger: '#ff0000',
    linkColor: '#2874ff'
  }
  if(theme === 'DARK') {
    return DARK_THEME;
  } else {
    return LIGHT_THEME;
  }
}

export default getColor;