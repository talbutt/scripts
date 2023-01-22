window.onload = (event) => {
  persistTextAreas();
  clearTextAreaPersistenceOnActions();
};

function persistTextAreas = () => {
    for (let textArea of document.querySelectorAll('textarea')) {
      var storageKey = storageKeyFor(textArea);
      textArea.value = localStorage.getItem (storageKey);

      textArea.addEventListener('input', (event) => {
        element = event.target;
        localStorage.setItem(storageKeyFor(element), element.value);
      });
    }
}

function clearTextAreaPersistenceOnActions = () => {
    for (let form of document.querySelectorAll('form')) {
        form.addEventListener('submit', (event) => {
            for (let textArea of event.target.querySelectorAll('textarea')) {
                localStorage.removeItem (storageKeyFor (textArea));
            }
        });
    }
}

function storageKeyFor(element) {
    return idOrName (findParentFormFor (element)) + ':' + idOrName (element);
}

function idOrName(element) {
    return element.id || element.name || element.action;
}

function findParentFormFor(element) {
    if (parent = element.parentNode) {
        if (parent.nodeName == 'FORM') { return parent; }
        return findParentFormFor(parent);
    }
    return;
}
