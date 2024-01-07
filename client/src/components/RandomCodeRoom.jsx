export default function RandomCodeRoom (size) {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let valorAleatorio = '';

    for (let i = 0; i < size; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        valorAleatorio += caracteres.charAt(indiceAleatorio);
    }

    return valorAleatorio;
}