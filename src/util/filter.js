import { isEmty } from './util';

const filter = (links, group, search, isAsec) => {
  var re = new RegExp(search, 'i');
  let links1 = [];
  let links2 = [];
  let flag;
  if(group !== 'All') {
    links.forEach(link => {
      if(group === link.group) {
        links1.push(link);
      }
    });
  } else {
    links1 = links;
  }
  if(!isEmty(search)) {
    links1.forEach((link) => {
      flag = 0;
      if(re.test(link.url)) {
        flag = 1;
      } 
      if(link.title) {
        if(re.test(link.title)) 
          flag = 1;
      } 
      if(link.description) {
        if(re.test(link.description))
          flag = 1;
      }
      if(flag === 1) {
        links2.push(link);
      } 
    });
  } else {
    links2 = links1;
  }
  if(isAsec) {
    links = links2.sort((a, b) => a.createdAt - b.createdAt);
  } else {
    links = links2.sort((a, b) => b.createdAt - a.createdAt);
  }
  return links;
}

export default filter;