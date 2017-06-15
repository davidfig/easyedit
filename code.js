// const easyedit = require('easyedit')
const easyedit = require('../easyedit/easyedit');

window.onload = test;

function test()
{
    const tests = document.getElementsByClassName('test');
    for (let test of tests)
    {
        if (test.id === 'red')
        {
            new easyedit(test, { onsuccess: () => test.style.color = 'red' });
        }
        else
        {
            new easyedit(test);
        }
    }

    // show code on page
    require('./highlight')();
}