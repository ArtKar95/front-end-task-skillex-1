import { Rating } from 'react-simple-star-rating';
import './index.scss';

const ProductCard = ({ product }) => {
  return (
    <div className='product-card' data-testid='product-card'>
      <div className='product-card__image-container'>
        <img
          src={product.imageUrl}
          alt={product.name}
          className='product-card__image-container__image'
          loading='lazy'
        />
        <div className='product-card__image-container__overlay'>
          <button className='product-card__image-container__overlay__button'>
            Quick View
          </button>
        </div>
      </div>

      <div className='product-card__info'>
        <h3 className='product-card__info__name'>{product.name}</h3>
        <p className='product-card__info__brand'>{product.brand}</p>
        <p className='product-card__info__category'>{product.category}</p>

        <div className='product-card__info__rating'>
          <Rating
            readonly
            initialValue={product.rating}
            size={20}
            allowFraction={true}
          />
          <span className='product-card__info__rating__value'>
            ({product.rating})
          </span>
        </div>

        <div className='product-card__info__price'>
          <span className='product-card__info__price__value'>
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button disabled className='product-card__info__add-to-cart-btn'>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
