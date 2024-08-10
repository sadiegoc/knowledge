import msgToast from './msg'

export const baseUrl = 'http://localhost:8888'

export function showError (e) {
    if (e && e.response && e.response.data) {
        msgToast.error(e.response.data)
    } else if (typeof e === 'string') {
        msgToast.error(e)
    } else {
        msgToast.error()
    }
}

export function showSuccess (e) {
    if (e && e.response && e.response.data) {
        msgToast.success(e.response.data)
    } else if (typeof e === 'string') {
        msgToast.success(e)
    } else {
        msgToast.success()
    }
}