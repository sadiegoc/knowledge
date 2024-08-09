import { toast } from 'vue3-toastify'

const msg = {
    success () {
        toast.success("Operação realizada com sucesso!")
    },
    error () {
        toast.error("Oops... erro inesperado.")
    }
}

export default msg