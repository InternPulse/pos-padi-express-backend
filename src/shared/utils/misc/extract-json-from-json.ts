import logger from "../../../core/logging/logger"
import ApiError from "../ApiError"

/* eslint-disable prefer-destructuring */
export default function extractJsonFromJson(jsonData: any) {
  try {
    const data = jsonData.data
    const customer = data.customer

    const paymentDetails = {
      status: jsonData.status,
      message: "Payment details retrieved successfully.",
      payment: {
        id: `PAY-${data.id}`,
        customer_name: customer.name,
        customer_email: customer.email,
        amount: data.amount,
        status: data.status,
      },
    }
    logger.info("Util: payment details extracted successfully")
    return paymentDetails
  } catch (e) {
    logger.error(e, "Extract Payment Details")
    throw new ApiError("server error", 500)
  }
}
