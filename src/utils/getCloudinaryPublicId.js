module.exports = getCloudinaryPublicId = (sucureUrl) => {
    const words = sucureUrl.split("/")
    const result = words[7].concat("/", words[8], "/", words[9].split(".")[0])
    return result
}
