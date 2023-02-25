const getEnvVar = (name) => {
    return (window)?.configs?.[name] || process.env[name]
}

const getEnvironment = () => {
    return {
        title: getEnvVar('VUE_APP_TITLE'),
        apiBaseUrl: getEnvVar('VUE_APP_API_URL'),
        apiTimeout: Number(getEnvVar('VUE_APP_API_TIMEOUT')),
        locale: getEnvVar('VUE_APP_LOCALE'),
    }
}

export default getEnvironment