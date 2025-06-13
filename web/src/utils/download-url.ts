export const downloadUrl = async (reportUrl: string) => {
  const link = document.createElement('a')

  link.href = reportUrl
  link.download = ''

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}
