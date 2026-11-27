import { useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import {
  CartItemContainer,
  ItemImage,
  ItemImageFallback,
  ItemInfo,
  ItemName,
  ItemPrice,
  ItemShipping,
  QuantitySelect,
  RemoveButton,
} from './CartItem.styles.js';

export function CartItem({
  product,
  quantity,
  initialQuantity = 1,
  onQuantityChange,
  onRemove,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(initialQuantity);
  const currentQuantity = quantity ?? localQuantity;

  const handleQuantityChange = (event) => {
    const nextQuantity = Number(event.target.value);
    if (quantity === undefined) setLocalQuantity(nextQuantity);
    onQuantityChange?.(nextQuantity);
  };

  return (
    <CartItemContainer aria-label={`Produto ${product.name}`}>
      {product.image && !imageFailed ? (
        <ItemImage
          src={product.image}
          alt={product.imageAlt ?? product.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <ItemImageFallback aria-hidden="true">
          {product.name?.trim().charAt(0).toUpperCase() || '?'}
        </ItemImageFallback>
      )}
      <ItemInfo>
        <ItemName title={product.name}>{product.name}</ItemName>
        <ItemShipping>{product.shippingLabel ?? 'Free Shipping'}</ItemShipping>
        <ItemPrice>{product.price}</ItemPrice>
      </ItemInfo>
      <QuantitySelect
        aria-label={`Quantidade de ${product.name}`}
        value={currentQuantity}
        onChange={handleQuantityChange}
      >
        {Array.from({ length: Math.max(10, currentQuantity) }, (_, index) => index + 1).map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </QuantitySelect>
      <RemoveButton
        type="button"
        aria-label={`Remover ${product.name} do carrinho`}
        onClick={onRemove}
      >
        <Icon name="trash" size={14} strokeWidth={2} />
      </RemoveButton>
    </CartItemContainer>
  );
}
