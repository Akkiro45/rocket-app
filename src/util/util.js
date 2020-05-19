export const tagLine = 'Save once, Access anyware!';

export const webLink = 'https://rocket-linksaver.web.app';

export const emailID = 'rocket.linksaver@gmail.com';

export const validateEmail = (email) => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const isEmty = (string) => {
  let count = 0;
  for(let i=0; i<string.length; i++) {
    if(string.charAt(i) === ' ') count += 1;
  }
  if(count === string.length) return true;
  else return false;
}