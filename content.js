function getXPath(element) {
  if (element.id) return `//*[@id="${element.id}"]`;
  if (element === document.body) return '/html/body';

  let ix = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

document.addEventListener('mousedown', (event) => {
  const xpath = getXPath(event.target);
  chrome.runtime.sendMessage({
    action: 'set_xpath',
    xpath: xpath
  });
}, true);