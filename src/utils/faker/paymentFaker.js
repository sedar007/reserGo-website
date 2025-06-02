export function generateFakeCardDetails() {
    const cardNumber = Array.from({ length: 4 }, () =>
        Math.floor(1000 + Math.random() * 9000)
    ).join(' ')

    const firstNames = ['Jean', 'Marie', 'Paul', 'Lucie', 'Claire', 'Thomas']
    const lastNames = ['Dupont', 'Lemoine', 'Martin', 'Durand', 'Petit', 'Moreau']
    const cardHolder = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
    }`

    const expiry = `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${
        new Date().getFullYear() + 2
    }`

    const cvv = String(Math.floor(100 + Math.random() * 900))

    return { cardNumber, cardHolder, expiry, cvv }
}

export function generateFakePaypalDetails() {
    const firstNames = ['alice', 'john', 'emma', 'noah', 'sophie', 'liam']
    const domains = ['fakemail.com', 'mailtest.com', 'testmail.fr']

    const username = `${firstNames[Math.floor(Math.random() * firstNames.length)]}${Math.floor(Math.random() * 10000)}`
    const email = `${username}@${domains[Math.floor(Math.random() * domains.length)]}`
    const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase()

    return { email, transactionId }
}

