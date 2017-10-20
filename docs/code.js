const easyedit = require('..')

window.onload = function ()
{
    const tests = document.getElementsByClassName('test')
    let underline = true
    for (let test of tests)
    {
        if (test.id === 'red')
        {
            new easyedit(test, { onsuccess: () => test.style.color = 'red' })
        }
        else
        {
            new easyedit(test, { underline })
        }

        // alternate underline
        underline = !underline
    }

    require('./highlight')('https://github.com/davidfig/easyedit')
}