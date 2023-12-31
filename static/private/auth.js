function postRequest(event) {
    event.preventDefault()

    if(document.querySelector('#messageWrap') === null) {
        const messageWrap = document.createElement('div')
        messageWrap.id = 'messageWrap'
        event.currentTarget.append(messageWrap)
    }

    messageWrap.innerHTML = ''

    fetch(event.currentTarget.action, {
        method: event.currentTarget.method,
        body: new FormData(event.currentTarget)
    })
    .then(res => res.json())
    .then(res => {
        const errors = res?.validation?.errors
        const styleMessage = (m, c) => `<li style="color:${c}">${m}</li>`

        if (res.ok) {
            messageWrap.innerHTML = styleMessage(res.message, 'green')
            return location.href = res.redirectUrl
        }

        if (!errors) {
            return messageWrap.innerHTML = styleMessage(res.message, 'red')
        }

        errors.forEach(error => {
            messageWrap.innerHTML += styleMessage(error.msg, 'red')
        })
    })
    .catch(err => {
        console.error(err);
    })
}

function getRequest(event) {
    event.preventDefault()
    const dataset = event.target.dataset
    fetch(dataset.action)
        .then(res => res.json())
        .then(res => location.href = res.redirectUrl)
        .catch(error => alert(error.error))
}