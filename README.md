# easyedit
inline editing of a single HTMLElement

## rationale

Make any element editable with a click. The input element uses the same font and font-size as the original element. Pressing enter or changing focus saves the new value. Pressing escape returns it to its original value.

## simple example

    const easyedit = require('easyedit')

    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = 'Please edit me.'
    new easyedit(div, { onsuccess: (value) => console.log('div changed to: ' + value) })

## live example
https://davidfig.github.io/easyedit/


## API
```
    /**
     *
     * @param {HTMLElement} object
     * @param {object} options
     * @param {object} options.styles - additional styles to apply to the inputElement
     * @param {function} options.onedit - editing starts: callback(element, inputElement)
     * @param {function} options.onsuccess - value changed and user pressed enter: callback(value, element, originalValue)
     * @param {function} options.oncancel - editing canceled with escape: callback(element)
     * @param {function} options.onchange - value was changed (but editing is not done): callback(value, element, originalValue)
     */
    constructor(object, options)
```
## license  
MIT License  
(c) 2017 [YOPEY YOPEY LLC](https://yopeyopey.com/) by [David Figatner](https://twitter.com/yopey_yopey/)
