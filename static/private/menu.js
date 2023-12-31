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

function editMenuItem(event) {
    event.preventDefault()
    const target = event.currentTarget
    const editor = target.parentElement.querySelector('.editor')
    editor.setAttribute('contenteditable', true)
    editor.style.border = '1px solid blue'
    editor.focus()
    moveCursorToEnd(editor);
}

function updateMenuItem(event) {
    event.preventDefault()
    const editor = event.currentTarget
    editor.setAttribute('contenteditable', false)
    const text = editor.textContent.trim()
    fetch(editor.dataset.action, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: editor.dataset.id, 
            title: text
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

function deleteMenuItem(event) {
    event.preventDefault()
    const dataset = event.target.dataset
    fetch(dataset.action, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: dataset.id})
    })
        .then(res => res.json())
        .then(res => {
            location.href = res.redirectUrl
        })
        .catch(error => alert(error))
}

function moveCursorToEnd(element) {
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(element);
        textRange.collapse(false);
        textRange.select();
    }
}