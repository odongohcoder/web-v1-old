import React from 'react';
import { graphql } from 'gatsby';
import ReactGA from 'react-ga';

import config from '../config';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import BlogItem from '../components/BlogItem';
import Seo from '../components/Seo';

// export const blogQuery = graphql`
//   query Blogs {
//     allMediumPost(sort: { fields: [createdAt], order: DESC }) {
//       edges {
//         node {
//           id
//           title
//           uniqueSlug
//           virtuals {
//             subtitle
//             totalClapCount
//             previewImage {
//               imageId
//             }
//           }
//           author {
//             name
//           }
//           createdAt
//           updatedAt
//         }
//       }
//     }
//   }
// `;

export default class Blog extends React.Component {
  componentDidMount() {
    ReactGA.pageview('/blog');
  }

  render() {
    const { data } = this.props;
    // const posts = data.allMediumPost.edges;
    const posts = [];

    return (
      <Layout>
        <div className="container">
          <Seo
            title="News"
            description="ebox latest news"
            url={`${config.siteUrl}/blog`}
            keywords="blogs, latest updates, latest news"
          />
          <Heading>Our Latest News</Heading>
          <div className="columns is-multiline is-gapless">
            <div className="column is-half">
              {posts.map(({ node }) => (
                <BlogItem data={node} key={node.id} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
