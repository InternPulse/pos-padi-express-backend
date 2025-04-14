export default function generateRandomSku(): string {
  const prefix = "SKU"
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase() // Generate a random alphanumeric string
  const timestamp = Date.now().toString(36).substring(0, 4).toUpperCase() // Include a short timestamp for uniqueness

  return `${prefix}-${randomPart}-${timestamp}`
}
