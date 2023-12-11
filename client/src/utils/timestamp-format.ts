export const formatTimestamp = (timestamp?: number): string => {
  const date = new Date(timestamp ?? 0)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}
