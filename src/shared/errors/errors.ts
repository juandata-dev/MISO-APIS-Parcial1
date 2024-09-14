/* eslint-disable prettier/prettier */
export function BusinessException(mensaje: string, tipo: number) {
    this.mensaje = mensaje;
    this.type = tipo;
}

export enum BusinessError {
    NOT_FOUND,
    PRECONDITION_FAILED,
    BAD_REQUEST
}
