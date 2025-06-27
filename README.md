# From Headless to Limitless: Storyblok Workshop

A comprehensive 30-minute workshop covering Storyblok fundamentals, APIs, and JavaScript implementation using Slidev.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- pnpm package manager
- A Storyblok account (free tier available)

### Running the Presentation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3030`
   - Use arrow keys or space to navigate slides
   - Press `f` for fullscreen
   - Press `o` for presenter mode with notes

### Building for Production

```bash
# Build static files
pnpm build

# Export as PDF
pnpm export
```

## 📚 Workshop Content

### Part 1: Storyblok Fundamentals (10 minutes)
- **Stories**: The fundamental content unit
- **Blocks**: Reusable components and field types
- **Visual Editor**: Real-time editing capabilities
- **Relations**: Connecting content across your project
- **i18n**: Multi-language content management

### Part 2: API Deep Dive (10 minutes)
- **Getting Started**: Account setup and tokens
- **Content Delivery API**: Key endpoints and responses
- **Management API**: Programmatic content management
- **Query Parameters**: Filtering and optimization
- **JSON Structure**: Understanding response formats

### Part 3: JavaScript Implementation (10 minutes)
- **storyblok-js-client**: Official JavaScript client
- **Real-world Examples**: Blog implementation
- **Visual Editor Integration**: Live editing setup
- **Best Practices**: Performance and security

## 🛠️ Code Examples

The `snippets/` directory contains three practical examples:

### 1. BlogManager Class (`snippets/blog-manager.js`)
A comprehensive blog management system demonstrating:
- Content fetching with pagination
- Search and filtering
- Relations handling
- Error management
- Performance optimization

```javascript
import BlogManager from './snippets/blog-manager.js'

const blog = new BlogManager('your-token')
const posts = await blog.getPosts(1, 10)
```

### 2. Visual Editor Integration (`snippets/visual-editor.js`)
Complete visual editor setup for live editing:
- Bridge initialization
- Real-time content updates
- Editor mode detection
- Component updates

```javascript
import VisualEditor from './snippets/visual-editor.js'

const editor = new VisualEditor('your-preview-token')
// Automatically handles editor mode and live updates
```

### 3. Simple Frontend App (`snippets/simple-app.html`)
A complete HTML/JavaScript application showing:
- Blog post listing with pagination
- Search functionality
- Category and author filtering
- Responsive design
- Error handling

## 🔧 Storyblok Setup

### 1. Create a Storyblok Account
1. Visit [storyblok.com](https://www.storyblok.com)
2. Sign up for a free account
3. Create a new space

### 2. Get Your Tokens

#### Content Delivery API Token (Public)
- Navigate to Settings → Access Tokens
- Copy the "Preview" token for development
- Use "Public" token for production

#### Management API Token (Private)
- Go to Account Settings → Personal Access Tokens
- Create a new token with appropriate permissions
- **Never expose this in frontend code!**

### 3. Content Structure Examples

#### Blog Post Schema
```json
{
  "component": "blog_post",
  "title": "Text",
  "excerpt": "Textarea", 
  "content": "Markdown",
  "featured_image": "Asset",
  "author": "Single-Option (Stories from authors/)",
  "category": "Single-Option (Stories from categories/)",
  "tags": "Multi-Option",
  "featured": "Boolean",
  "published_at": "Datetime"
}
```

#### Author Schema
```json
{
  "component": "author",
  "name": "Text",
  "bio": "Textarea",
  "avatar": "Asset",
  "social_links": "Blocks"
}
```

## 📖 Essential API Endpoints

### Content Delivery API
```javascript
// Get all stories
GET https://api.storyblok.com/v2/cdn/stories?token=YOUR_TOKEN

// Get single story
GET https://api.storyblok.com/v2/cdn/stories/{slug}?token=YOUR_TOKEN

// Get filtered stories
GET https://api.storyblok.com/v2/cdn/stories?starts_with=blog&per_page=10&token=YOUR_TOKEN
```

### Common Query Parameters
- `starts_with=blog` - Filter by folder
- `resolve_relations=author,category` - Include related content
- `version=published` - Published content only
- `per_page=10&page=1` - Pagination
- `search_term=javascript` - Full-text search

## 🎯 JavaScript Client Usage

### Installation
```bash
npm install storyblok-js-client
```

### Basic Setup
```javascript
import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
  accessToken: 'your-preview-token',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})
```

### Common Patterns
```javascript
// Get all blog posts
const { data } = await Storyblok.get('cdn/stories', {
  starts_with: 'blog',
  resolve_relations: 'author',
  version: 'published'
})

// Get single post
const { data } = await Storyblok.get('cdn/stories/blog/my-post', {
  resolve_relations: 'author,category'
})

// Search posts
const { data } = await Storyblok.get('cdn/stories', {
  starts_with: 'blog',
  search_term: 'javascript'
})
```

## 🎨 Visual Editor Setup

### 1. Add Bridge Script
```html
<script src="https://app.storyblok.com/f/storyblok-v2-latest.js"></script>
```

### 2. Initialize Bridge
```javascript
if (window.storyblok) {
  window.storyblok.on(['change', 'published'], () => {
    location.reload()
  })
  
  window.storyblok.init({
    accessToken: 'your-preview-token'
  })
}
```

### 3. Add Editor Attributes
```html
<div data-blok-c='{"component":"hero","_uid":"abc-123"}' 
     data-blok-uid="abc-123">
  <h1 data-field="title">{{ title }}</h1>
</div>
```

## 🔒 Security Best Practices

### Environment Variables
```javascript
// ✅ Good: Use environment variables
const token = process.env.STORYBLOK_TOKEN

// ❌ Bad: Hardcoded tokens
const token = 'abc-123-secret-token'
```

### Token Types
- **Preview Token**: Safe for frontend, shows draft content
- **Public Token**: Safe for frontend, published content only  
- **Management Token**: Server-side only, full API access

### Rate Limiting
- CDN API: 1000 requests/hour (free tier)
- Management API: 500 requests/hour
- Implement caching to reduce API calls

## 🚀 Performance Tips

### 1. Use Caching
```javascript
const Storyblok = new StoryblokClient({
  accessToken: 'your-token',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
})
```

### 2. Selective Relations
```javascript
// ✅ Good: Only resolve needed relations
resolve_relations: 'author'

// ❌ Bad: Over-resolving
resolve_relations: 'author,category,tags,related,comments'
```

### 3. Pagination
```javascript
// Always paginate large datasets
const { data } = await Storyblok.get('cdn/stories', {
  starts_with: 'blog',
  per_page: 25,
  page: currentPage
})
```

## 🤝 Workshop Follow-up

### Next Steps
1. **Create your first space** and add some content
2. **Try the examples** with your own token
3. **Experiment with components** and field types
4. **Set up the visual editor** for live editing
5. **Build a simple project** using the patterns shown

### Resources
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [API Reference](https://www.storyblok.com/docs/api)
- [JavaScript Client Docs](https://github.com/storyblok/storyblok-js-client)
- [Community Discord](https://discord.gg/storyblok)
- [Developer Hub](https://www.storyblok.com/developers)

### Support
- [Help Center](https://help.storyblok.com)
- [GitHub Issues](https://github.com/storyblok)
- [Community Forum](https://www.storyblok.com/community)

## 📝 Notes for Presenters

### Timing Guide
- **0-10 min**: Fundamentals overview
- **10-20 min**: API exploration with live examples
- **20-30 min**: JavaScript implementation demo

### Demo Tips
1. Have a prepared Storyblok space with sample content
2. Use live coding for JavaScript examples
3. Show the visual editor in action
4. Demonstrate real API responses
5. Keep code examples simple and focused

### Interactive Elements
- Live API calls during presentation
- Visual editor demonstration
- Q&A throughout each section
- Hands-on coding time

## 🎉 Workshop Goals

By the end of this workshop, attendees will:
- ✅ Understand Storyblok's core concepts
- ✅ Know how to use the Content Delivery API
- ✅ Be able to implement basic content fetching
- ✅ Understand visual editor integration
- ✅ Have practical examples to build upon

---

**Ready to explore the limitless possibilities with Storyblok?** 🚀

Start your presentation with `pnpm dev` and let's dive in!