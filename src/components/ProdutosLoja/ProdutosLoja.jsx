import { useState } from 'react';
import { CartItem } from '../CartItem/CartItem.jsx';
import {
  EmptyProducts,
  ProductList,
  ProductsSection,
  ProductsTitle,
} from './ProdutosLoja.styles.js';

export function ProdutosLoja({ products }) {
  const [items, setItems] = useState(products);

  const handleQuantityChange = (productId, quantity) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    );
  };

  const handleRemove = (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  return (
    <ProductsSection aria-label="Produtos da loja">
      <ProductsTitle>Produtos da loja</ProductsTitle>
      {items.length > 0 ? (
        <ProductList>
          {items.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={product.quantity}
              onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
              onRemove={() => handleRemove(product.id)}
            />
          ))}
        </ProductList>
      ) : (
        <EmptyProducts>Não há produtos para exibir.</EmptyProducts>
      )}
    </ProductsSection>
  );
}
