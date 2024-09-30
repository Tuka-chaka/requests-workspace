interface User {
    name: string
    password: string
}

interface Ticket {
    id: string
    label: string
    opened: string
    modified: string
    deadline: string
    status: string
    needs_feedback: boolean
    description: string
    solution: string
    service: string
    service_details: string
}

export type {User, Ticket}