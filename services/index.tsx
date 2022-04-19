import { request, gql } from 'graphql-request'

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
        query GetPosts {
            postsConnection {
            edges {
                node {
                createdAt
                excerpt
                slug
                title
                featuredImage {
                    url
                }
                author {
                    bio
                    name
                    id
                    photo {
                    url
                    }
                }
                categories {
                    name
                    slug
                }
                }
            }
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges
}

export const getPostDetails = async (slug:string) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                createdAt
                excerpt
                slug
                title
                featuredImage {
                    url
                }
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `

    const result = await request(graphqlAPI, query, { slug })

    return result.post
}

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_DESC
                first: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.posts
}

export const getSimilarPosts = async (categories:Array<String>, slug:string) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {
                    slug_not: $slug,
                    AND: {
                        categories_some: {
                            slug_in: $categories
                        }
                    }
                }
                first: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, { categories, slug })

    return result.posts
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories() {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.categories
}

export const submitComment = async (commentObj: any) => {
    const result = await fetch('/api/comments', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentObj)
    })

    return result.json()
}

export const getComments = async (slug: string) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } } ) {
                name
                createdAt
                comment
            }
        }
    `

    const result = await request(graphqlAPI, query, { slug })

    return result.comments
}

export const getFeaturedPosts = async () => {
    const query = gql`
        query GetFeaturedPosts {
            posts(where: { featuredPost: true }) {
                author {
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                title
                slug
                createdAt
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.posts
}

export const getCategoryPost = async (slug:string) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                        }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                }
            }
        }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
  }