export const success = (data: any) => ({ success: true, data });
export const failure = (error: any) => ({ success: false, error });
