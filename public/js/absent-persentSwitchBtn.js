const icon = $('.icon')
const switchField = $('.switch-field')

switchField.each(function(index, element) {
    const userId = element.getAttribute('data-studentId')
    const sessionId = location.pathname.split('/').slice(-1)

    element.children[1].addEventListener('click', () => {

        if (element.children[0].innerText.toLowerCase() === 'present') {
            element.children[0].innerText = 'absent'
            element.children[0].classList.add('absent')
            element.children[0].classList.remove('present')
            
            const status = element.children[0].innerText.toLowerCase()
            fetchFac(sessionId, userId, status)
        } 
        else if (element.children[0].innerText.toLowerCase() === 'absent') {
            element.children[0].innerText = 'present'
            element.children[0].classList.add('present')
            element.children[0].classList.remove('absent')

            const status = element.children[0].innerText.toLowerCase()
            fetchFac(sessionId, userId, status)
        }
    })

})


const fetchFac = (sessionId, studentId, status) => {
    fetch(location.href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sessionId,
            studentId,
            status
        })
    })
}

