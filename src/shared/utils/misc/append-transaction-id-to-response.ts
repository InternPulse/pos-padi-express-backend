/* eslint-disable no-param-reassign */
function appendTxRefToResponse(payload: any, value: string) {
  if (!payload.meta) {
    payload.meta = {}
  }
  payload.meta.txRef = value
  return payload
}

export default appendTxRefToResponse
