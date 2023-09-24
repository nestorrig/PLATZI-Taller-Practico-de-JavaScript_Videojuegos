const messageContainer = document.getElementById('FinalMessageContainer')
const messageDiv = document.getElementById('Message')
const iconTrophy = document.getElementById('trophyIcon')
const iconRepeat = document.getElementById('repeatIcon')



function showFinalMessage(status, recordTime, roundTime) {
    if (status === 'newRecord') {
        const message = document.createElement('span')
        const record = document.createElement('p')

        message.innerText = `Que  bien nuevo record`
        record.innerText = `Nuevo record: ${recordTime}`
        messageDiv.append(message, record)

        iconTrophy.classList.remove('inactive')
    } else if (status === 'no') {
        const message = document.createElement('span')
        const record = document.createElement('p')
        const time = document.createElement('p')

        message.innerText = `Sigue intendando`
        record.innerText = `Record: ${recordTime}`
        time.innerText = `tu tiempo: ${roundTime}`
        messageDiv.append(message, record, time)

        iconRepeat.classList.remove('inactive')
    }
}

document.getElementById('Replay').addEventListener('click', ()=> {
    location.reload()
})
document.getElementById('Reboot').addEventListener('click', ()=> {
    localStorage.clear()
    location.reload()
})