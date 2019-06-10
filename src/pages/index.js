import React from 'react';
import ReactGA from 'react-ga';
import { first } from 'underscore';
import { graphql } from 'gatsby'

import config from '../config/index';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import HomeBanner from '../components/HomeBanner';
import ProductsList from '../components/ProductsList';
import HomeAbout from '../components/HomeAbout';


export default class IndexPage extends React.Component {
  componentDidMount () {
    ReactGA.pageview ('/');
  }

  render () {
    const {
      data: {allContentfulProduct: products, contentfulHome: home},
    } = this.props;
    const currencies = first(currency.edges).node;
    console.log('currencies', currencies);

    return (
      <Layout>
        <Seo
          title="Latest punjabi suits collection"
          description="Latest Punjabi Traditional Suits"
          url={config.siteUrl}
        />
        <HomeBanner data={home} />
        <ProductsList products={products.edges} />
        <HomeAbout data={home} />
      </Layout>
    );
  }
}

export const indexQuery = graphql`
  query Products {
    allContentfulProduct(
      filter: { status: { eq: "active" } }
      sort: { fields: [listingOrder], order: ASC }
    ) {
      edges {
        node {
          id
          title
          slug
          color
          originalPrice
          discountPrice
          featuredImage {
            title
            sizes(maxWidth: 550) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
    contentfulHome {
      homeSliderTitle
      homeSliderSubTitle
      homeSliderImage {
        title
        sizes(maxWidth: 550) {
          ...GatsbyContentfulSizes
        }
      }
      homeIntro {
        childMarkdownRemark {
          html
        }
      }
    }
    allDataJson {
      edges {
        node {
          GBP_CAD {
            val
          }
          GBP_INR {
            val
          }
        }
      }
    }
  }
`;
