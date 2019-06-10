import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Trail } from 'react-spring';
import { filter } from 'underscore';

import ProductItem from './ProductItem';
import Heading from './Heading';
import Categories from '../components/Categories';

const Container = styled.section`
  position: relative;
`;

class ProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false, activeCategory: null };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 200);
  }

  toggleCategory = (category) => (
    this.setState({ activeCategory: category })
  )

  render() {
    const { title, products } = this.props;
    const { isOpen, activeCategory } = this.state;
    const keys = products.map(item => item.node.id);
    // console.log('products', products);

    if (activeCategory === null) {
      const filterProducts = products
    } else {
      const filterProducts = filter(
        products,
        item => item.category === activeCategory,
      );
    }

    return (
      <Container className="section">
        <Heading>{title}</Heading>
        <Categories toggleCategory={this.toggleCategory} active={activeCategory} />
        <div className="columns is-multiline">
          <Trail
            native
            from={{ opacity: 0 }}
            to={{ opacity: isOpen ? 1 : 0.25 }}
            keys={keys}
          >
            {products.map(({ node }) => styles => (
              <ProductItem key={node.id} item={node} styles={styles} />
            ))}
          </Trail>
        </div>
      </Container>
    );
  }
}

ProductsList.defaultProps = {
  title: 'New arrivals',
  products: [],
};

ProductsList.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
};

export default ProductsList;
