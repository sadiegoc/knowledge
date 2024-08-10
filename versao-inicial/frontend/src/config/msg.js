import { toast } from 'vue3-toastify'

const msg = {
    success (success) {
        const msg = success || "Operação realizada com sucesso!"
        toast.success(msg)
    },
    error (error) {
        const msg = error || "Oops... erro inesperado."
        toast.error(msg);
    }
}

export default msg