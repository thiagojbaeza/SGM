import { createBrowserRouter } from "react-router-dom";
import Produtos from "../components/produtos/page";
import TipoProdutos from "../components/tipoprodutos/page";
import Usuarios from "../components/usuarios/page";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/produtos",
        element: <Produtos/>
    },
    {
        path: "/tipoprodutos",
        element: <TipoProdutos />
    },
    {
        path: "/usuarios",
        element: <Usuarios />
    }
]);