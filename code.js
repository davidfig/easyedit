// const easyedit = require('easyedit')
const easyedit = require('../easyedit/easyedit');

window.onload = function ()
{
    const tests = document.getElementsByClassName('test');
    let underline = true;
    for (let test of tests)
    {
        if (test.id === 'red')
        {
            new easyedit(test, { onsuccess: () => test.style.color = 'red' });
        }
        else
        {
            new easyedit(test, { underline });
        }

        // alternate underline
        underline = !underline;
    }

    // show code on page
    require('./highlight')();
};