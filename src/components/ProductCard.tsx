import type { TProduct } from "../@types/productTypes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductCard ({ product }: { product : TProduct }) {

    const { t } = useTranslation(); 
    const out = product.stock === 0;

    return (
        
    )
}; 