export default defineEventHandler(async (event) => {
  const response = await auth.handler(toWebRequest(event));
  return sendWebResponse(event, response);
});
