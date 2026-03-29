// Shopify Storefront API fetch wrapper and queries

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(
    'https://' + SHOPIFY_CONFIG.storeDomain + '/api/' + SHOPIFY_CONFIG.apiVersion + '/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query: query, variables: variables }),
    }
  );

  if (!response.ok) {
    throw new Error('Shopify API error: ' + response.status);
  }

  var json = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map(function(e) { return e.message; }).join(', '));
  }

  return json.data;
}

// Fetch all products with full detail
async function fetchAllProducts() {
  var query = `{
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          availableForSale
          productType
          tags
          options {
            id
            name
            values
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          collections(first: 10) {
            edges {
              node {
                title
                handle
              }
            }
          }
        }
      }
    }
  }`;

  var data = await shopifyFetch(query);
  return data.products.edges.map(function(e) { return e.node; });
}

// Fetch all collections with their products
async function fetchCollections() {
  var query = `{
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          products(first: 50) {
            edges {
              node {
                handle
              }
            }
          }
        }
      }
    }
  }`;

  var data = await shopifyFetch(query);
  return data.collections.edges.map(function(e) { return e.node; });
}

// Format a Shopify Money amount for display
function formatMoney(amount, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode || 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

// Get a resized Shopify CDN image URL
function shopifyImageUrl(url, width) {
  if (!url) return '';
  // Shopify CDN supports _WIDTHx suffix before extension
  return url.replace(/(\.\w+)(\?|$)/, '_' + width + 'x$1$2');
}
