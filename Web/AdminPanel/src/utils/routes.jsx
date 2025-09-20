import { createBrowserRouter } from "react-router-dom";
import Produtos from "../components/produtos/page";
import TipoProdutos from "../components/tipoprodutos/page";


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
    }
]);