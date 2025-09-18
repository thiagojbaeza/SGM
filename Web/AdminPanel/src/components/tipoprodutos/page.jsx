
export default function TipoProdutos() {
    return (
        <div onClick={() => window.localStorage.setItem("logado", "true")}>
            Tipo de Produtos
        </div>
    )  
}
