export const getUsers = async() => {
    const result = await fetch("https://mocki.io/v1/fe7ebfbd-fe73-449a-8408-1cd4eb79395e")
    return result.json()
}