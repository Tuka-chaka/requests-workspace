function parseDate(dateString: string): Date {
    const [date, time] = dateString.split(" ")
    const [day, month, year] = date.split(".")
    return new Date(`${year}-${month}-${day}T${time.padStart(5, '0')}`)
}

function getStatusColor(status: string): string {
    if (['В работе','Зарегистрировано'].includes(status)) {
        return 'yellow'
    }
    if (['Выполнено. Требует подтверждения','На согласовании'].includes(status)) {
        return 'blue'
    }
    else {
        return 'grey'
    }
}

export {parseDate, getStatusColor}