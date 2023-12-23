formLogin.addEventListener('submit', function(event) {
    event.preventDefault()
    fetch(this.action, {
        method: this.method,
        body: new FormData(this)
    })
    .then(res => res.json())
    .then(res => {
        const errors = res?.validation?.errors
        const styleMessage = (m, c) => `<li style="color:${c}">${m}</li>`
        message.innerHTML = ''

        if(res.ok) {
            message.innerHTML = styleMessage(res.message, 'green')
            location.href = res.redirectUrl
        }

        if(errors) {
            errors.forEach(error => {
                message.innerHTML += styleMessage(error.msg, 'red')
            })
        }
    })
    .catch(err => {
        console.error(err);
    })
})