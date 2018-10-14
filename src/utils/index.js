/* global localStorage */

export function formatDate (date) {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Setiembre', 'Octubre',
    'Noviembre', 'Diciembre'
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return day + ' ' + monthNames[monthIndex] + ' ' + year
}

export function setEmails (data) {
  const emailsRaw = localStorage.getItem('emails')

  if (!Array.isArray(data)) {
    if (emailsRaw) {
      const emails = JSON.parse(emailsRaw)
      const matched = emails.filter(e => e.email !== data.email)

      matched.push(data)

      localStorage.setItem('emails', JSON.stringify(matched))
    } else {
      const emails = JSON.stringify([data])
      localStorage.setItem('emails', emails)
    }
  } else {
    const emails = JSON.stringify(data)
    localStorage.setItem('emails', emails)
  }
}

export function getEmails () {
  const emails = localStorage.getItem('emails')

  return JSON.parse(emails)
}
