function parseDate(dateString: string): Date {
    const [date, time] = dateString.split(" ")
    const [day, month, year] = date.split(".")
    return new Date(`${year}-${month}-${day}T${time}`)
}

export {parseDate}