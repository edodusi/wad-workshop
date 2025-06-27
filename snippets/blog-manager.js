import StoryblokClient from 'storyblok-js-client'

/**
 * BlogManager - A comprehensive example of using Storyblok JS Client
 * Demonstrates best practices for content fetching, error handling, and caching
 */
class BlogManager {
  constructor(token, options = {}) {
    this.storyblok = new StoryblokClient({
      accessToken: token,
      cache: {
        clear: 'auto',
        type: 'memory'
      },
      ...options
    })
  }

  /**
   * Get paginated blog posts with author and category relations
   * @param {number} page - Page number (1-based)
   * @param {number} perPage - Posts per page (max 100)
   * @returns {Promise<{posts: Array, total: number, hasNext: boolean}>}
   */
  async getPosts(page = 1, perPage = 10) {
    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'blog',
        resolve_relations: 'author,category',
        sort_by: 'published_at:desc',
        per_page: perPage,
        page: page,
        version: 'published'
      })
      
      return {
        posts: data.stories,
        total: parseInt(data.headers?.total || 0),
        hasNext: data.stories.length === perPage
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw new Error(`Failed to fetch blog posts: ${error.message}`)
    }
  }

  /**
   * Get a single blog post by slug
   * @param {string} slug - Post slug
   * @returns {Promise<Object>} Story object
   */
  async getPost(slug) {
    try {
      const { data } = await this.storyblok.get(`cdn/stories/blog/${slug}`, {
        resolve_relations: 'author,category,related_posts',
        version: 'published'
      })
      return data.story
    } catch (error) {
      if (error.response?.status === 404) {
        return null
      }
      console.error('Error fetching post:', error)
      throw new Error(`Failed to fetch post: ${error.message}`)
    }
  }

  /**
   * Get posts by category
   * @param {string} categorySlug - Category slug
   * @returns {Promise<Array>} Array of stories
   */
  async getPostsByCategory(categorySlug) {
    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'blog',
        filter_query: {
          'category.full_slug': {
            'in': `categories/${categorySlug}`
          }
        },
        resolve_relations: 'author,category',
        sort_by: 'published_at:desc',
        version: 'published'
      })
      return data.stories
    } catch (error) {
      console.error('Error fetching posts by category:', error)
      throw new Error(`Failed to fetch posts by category: ${error.message}`)
    }
  }

  /**
   * Get posts by author
   * @param {string} authorSlug - Author slug
   * @returns {Promise<Array>} Array of stories
   */
  async getPostsByAuthor(authorSlug) {
    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'blog',
        filter_query: {
          'author.full_slug': {
            'in': `authors/${authorSlug}`
          }
        },
        resolve_relations: 'author,category',
        sort_by: 'published_at:desc',
        version: 'published'
      })
      return data.stories
    } catch (error) {
      console.error('Error fetching posts by author:', error)
      throw new Error(`Failed to fetch posts by author: ${error.message}`)
    }
  }

  /**
   * Search posts by term
   * @param {string} query - Search query
   * @param {number} limit - Maximum results
   * @returns {Promise<Array>} Array of matching stories
   */
  async searchPosts(query, limit = 20) {
    if (!query || query.trim().length < 2) {
      return []
    }

    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'blog',
        search_term: query.trim(),
        per_page: limit,
        resolve_relations: 'author,category',
        version: 'published'
      })
      return data.stories
    } catch (error) {
      console.error('Error searching posts:', error)
      throw new Error(`Failed to search posts: ${error.message}`)
    }
  }

  /**
   * Get featured posts (posts with featured flag)
   * @param {number} limit - Maximum results
   * @returns {Promise<Array>} Array of featured stories
   */
  async getFeaturedPosts(limit = 5) {
    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'blog',
        filter_query: {
          'featured': {
            'is': 'true'
          }
        },
        resolve_relations: 'author,category',
        sort_by: 'published_at:desc',
        per_page: limit,
        version: 'published'
      })
      return data.stories
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      throw new Error(`Failed to fetch featured posts: ${error.message}`)
    }
  }

  /**
   * Get all categories
   * @returns {Promise<Array>} Array of category stories
   */
  async getCategories() {
    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'categories',
        version: 'published',
        sort_by: 'name:asc'
      })
      return data.stories
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error(`Failed to fetch categories: ${error.message}`)
    }
  }

  /**
   * Get all authors
   * @returns {Promise<Array>} Array of author stories
   */
  async getAuthors() {
    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'authors',
        version: 'published',
        sort_by: 'name:asc'
      })
      return data.stories
    } catch (error) {
      console.error('Error fetching authors:', error)
      throw new Error(`Failed to fetch authors: ${error.message}`)
    }
  }

  /**
   * Get related posts based on tags or categories
   * @param {Object} currentPost - Current post object
   * @param {number} limit - Maximum results
   * @returns {Promise<Array>} Array of related stories
   */
  async getRelatedPosts(currentPost, limit = 3) {
    if (!currentPost || !currentPost.tag_list || currentPost.tag_list.length === 0) {
      return []
    }

    try {
      const { data } = await this.storyblok.get('cdn/stories', {
        starts_with: 'blog',
        excluding_ids: currentPost.id.toString(),
        filter_query: {
          'tag_list': {
            'any_in_array': currentPost.tag_list.join(',')
          }
        },
        resolve_relations: 'author,category',
        sort_by: 'published_at:desc',
        per_page: limit,
        version: 'published'
      })
      return data.stories
    } catch (error) {
      console.error('Error fetching related posts:', error)
      return []
    }
  }

  /**
   * Get blog statistics
   * @returns {Promise<Object>} Statistics object
   */
  async getBlogStats() {
    try {
      const [postsResponse, categoriesResponse, authorsResponse] = await Promise.all([
        this.storyblok.get('cdn/stories', {
          starts_with: 'blog',
          version: 'published',
          per_page: 1
        }),
        this.getCategories(),
        this.getAuthors()
      ])

      return {
        totalPosts: parseInt(postsResponse.data.headers?.total || 0),
        totalCategories: categoriesResponse.length,
        totalAuthors: authorsResponse.length,
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching blog stats:', error)
      return {
        totalPosts: 0,
        totalCategories: 0,
        totalAuthors: 0,
        lastUpdated: new Date().toISOString()
      }
    }
  }

  /**
   * Utility method to format post data for display
   * @param {Object} post - Raw post object from API
   * @returns {Object} Formatted post object
   */
  formatPost(post) {
    return {
      id: post.id,
      slug: post.slug,
      title: post.content.title,
      excerpt: post.content.excerpt || post.content.intro || '',
      content: post.content.content || post.content.body || '',
      author: post.content.author ? {
        name: post.content.author.name,
        slug: post.content.author.slug,
        avatar: post.content.author.content?.avatar?.filename
      } : null,
      category: post.content.category ? {
        name: post.content.category.name,
        slug: post.content.category.slug,
        color: post.content.category.content?.color
      } : null,
      tags: post.tag_list || [],
      featuredImage: post.content.featured_image?.filename,
      publishedAt: post.published_at,
      readingTime: this.calculateReadingTime(post.content.content || ''),
      url: `/blog/${post.slug}`
    }
  }

  /**
   * Calculate estimated reading time
   * @param {string} content - Post content
   * @returns {number} Reading time in minutes
   */
  calculateReadingTime(content) {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, '') // Strip HTML tags
    const wordCount = textContent.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  /**
   * Clear the client cache
   */
  clearCache() {
    this.storyblok.flushCache()
  }
}

export default BlogManager