export default function success<T>(data: T, message: string, meta?: any) {
  return { success: true, message, data, meta }
}
