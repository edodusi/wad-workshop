---
theme: themes/unicorn
title: From Headless to Limitless - Storyblok & Symfony Workshop
info: |
  ## From Headless to Limitless: Storyblok & Symfony Workshop
  A comprehensive 2-hour workshop covering Storyblok fundamentals and Symfony integration.

  **Authors:** Edoardo Dusi (Storyblok) & Silas Joisten (SensioLabs)
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
logoHeader: '/storyblok.svg'
website: 'storyblok.com'
---

# From Headless to Limitless
## Storyblok & Symfony Workshop

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover:bg="white hover:bg-opacity-10">
    Building powerful web applications with modern CMS <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="pt-8 text-lg opacity-75">
  **Edoardo Dusi** - Storyblok • **Silas Joisten** - SensioLabs
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/storyblok" target="_blank" alt="GitHub" title="Storyblok on GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---
transition: fade-out
---

# Welcome to the Storyblok & Symfony Workshop! 👋

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

## What we'll cover:

**🧱 Part 1: Storyblok Fundamentals**
- Stories, Blocks, Visual Editor
- Content Delivery API
- Field Types & Relations

**🚀 Part 2: Symfony Integration**
- Official Storyblok Symfony Bundle
- Content Types & Controllers
- Blocks & Templates
- Real-world Implementation

</div>

<div>

## You'll learn to:

✅ Master Storyblok's core concepts\
✅ Navigate the Content Delivery API\
✅ Set up Symfony with Storyblok\
✅ Create content types and blocks\
✅ Build dynamic, content-driven apps\
✅ Handle routing and templates\
✅ Implement best practices

</div>

</div>

---
layout: default
---

# Workshop Agenda

<div class="grid grid-cols-2 gap-6 pt-4">

<div>

## 🧱 Part 1: Storyblok Fundamentals

**Core Concepts**
- Stories & Blocks
- Field Types & Relations
- Visual Editor Experience

**API Deep Dive**
- Content Delivery API
- Key Endpoints & Responses
- Query Parameters & Filtering

</div>

<div>

## 🚀 Part 2: Symfony Integration

**Getting Started**
- Bundle Installation & Setup
- Configuration & Environment

**Building the App**
- Content Types & Controllers
- Blocks & Templates
- Routing & Dynamic Content

**Advanced Features**
- Visual Preview Integration
- Caching & Performance
- Best Practices

</div>

</div>

<div class="pt-4 text-center">

**🎯 Goal:** Build a complete Storyblok-powered Symfony application

*Plus 15 minutes for Q&A and wrap-up*

</div>

---
layout: new-section
sectionImage: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0'
---

# Part 1: Storyblok Fundamentals

Understanding the building blocks of modern content management

---

# What is a Story? 📄

A **Story** is a multi-purpose content entry, with each story's schema defined by its story type (e.g., page, article)

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

## Key Characteristics:

- **Unique URL slug** - `/about-us`, `/blog/my-post`
- **Content structure** - The story's component details and its field data
- **Metadata** - name, creation date, last published date, ...
- **Multilingual** - Support for multiple languages

</div>

<div>

```json
{
  "story": {
    "id": 123456,
    "uuid": "abc-123-def",
    "name": "About Us",
    "slug": "my-post",
    "full_slug": "blog/my-post",
    "content": {
      "component": "page",
      "body": [...]
    },
    "published_at": "2024-01-15T10:00:00.000Z"
  },
  cv: "1749105726",
  rels: []
}
```

</div>

</div>

---

# What is a Block? 🧱

**Blocks** are reusable components. They can be entire content types (stories) or children of other blocks.

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

## Types of Blocks:
\
**📝 Content Type Blocks** - post, article, page\
**🎨 Nestable Blocks** - text, image, hero\
**🔧 Universal Blocks** - forms, CTAs, authors

</div>

<div>

```json
{
  "component": "hero_section",
  "_uid": "26weed33x-23asc-123456-1234567890",
  "headline": "Welcome to our site",
  "description": "This is our amazing homepage",
  "background_image": {
    "id": 123456,
    "filename": "hero-bg.jpg",
    "alt": "Hero background"
  },
  "cta_button": {
    "text": "Get Started",
    "link": "/signup"
  },
  "author": "51eed33d-855f-415c-ac0d-4404e03b89e1",
}
```

</div>

</div>

---

# Field Types in Storyblok 🎛️

Storyblok offers a rich set of field types for structured content.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Basic Fields:
- **Text** - Simple text input
- **Textarea** - Multi-line text
- **Number** - Numeric values
- **Boolean** - True/false toggles
- **DateTime** - Date and time picker

## Advanced Fields:
- **Blocks** - Nestable components
- **Asset** - Images, videos, files
- **Richtext** - WYSIWYG editor
- **Options** - Dropdown selections
- **Custom** - Plugin-based fields

</div>

<div>

```json
{
  "content": {
    "component": "article",
    "text_field": "Simple text",
    "markdown_field": "# Markdown content",
    "number_field": 42,
    "boolean_field": true,
    "datetime_field": "2024-01-15T10:00:00.000Z",
    "blocks_field": [...],
    "asset_field": {...},
    "richtext_field": {
      "type": "doc",
      "content": [...]
    },
    "options_field": {
      "value": "option1",
      "label": "Option 1"
    },
    "custom_field": {
      "value": "custom_data",
      "another_property": "more_data"
    }
  }
}
```

</div>

</div>

---

# The Visual Editor ✨

Real-time editing with instant preview

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

## Key Features:

- **🎯 Click-to-edit** - Direct content editing
- **📱 Responsive** - Preview on different devices
- **🎨 Visual composition** - Drag & drop interface
- **🤖 AI-powered** - Content creation assistance

## Benefits:
- Faster content creation
- Better content preview
- Improved editor experience

</div>

<div>

## How it works:

1. **Bridge setup** - Connect your frontend
2. **Editable regions** - Mark content areas
4. **Publishing** - One-click deployment

<div class="pt-4 text-sm opacity-75">

*We'll implement this with Symfony in Part 2!*

</div>

</div>

</div>

---

# Relations & i18n 🔗

Storyblok supports complex content relationships and internationalization.

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

## Relations:
Storyblok's relations system lets you link content entries together. Instead of duplicating content, you reference existing stories, ensuring consistency and reusability.
- **Single-Story Reference:** Link to one specific story, like an Author for a blog post.
- **Multi-Story Reference:** Link to multiple stories, perfect for a Tags or Categories system.

```json
{
  "author": "some-author-uuid-123",
  "categories": [
    "some-category-uuid-456",
    "some-category-uuid-789"
  ]
}
```

**Resolved automatically** with the right API settings!

</div>

<div>

## Internationalization:

Manage content in multiple languages seamlessly.

- **Language-specific** content versions
- **Fallback strategies** for missing translations
- **Flexible** translation workflows
- **SEO-friendly** localized URLs

*Perfect for global Symfony applications!*

</div>

</div>

---

# Content Delivery API: Key Endpoints 🚀

Essential endpoints for fetching content

## 1. Get All Stories
```bash
GET https://api.storyblok.com/v2/cdn/stories?token=YOUR_TOKEN
```

## 2. Get Single Story
```bash
GET https://api.storyblok.com/v2/cdn/stories/{slug}?token=YOUR_TOKEN
```

## 3. Get Stories with Filters
```bash
GET https://api.storyblok.com/v2/cdn/stories?starts_with=blog&per_page=10&token=YOUR_TOKEN
```

---

# API Response: Stories Collection 📚

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

#### Request:
```javascript
// Fetch 3 stories from page 1
GET /v2/cdn/stories?per_page=3&page=1
```

- *per_page*: Number of items per page (max 100).
- *page*: The 1-based page number to retrieve.

#### Response Structure:
- *stories[]*: Array of story objects
- *cv*: Cache version (timestamp)
- *rels[]*: Array of related story objects
- *links[]*: Array of linked story objects

#### Pagination Details (Headers):
- *Total*: The total number of stories matching the query.
- *Per-Page*: Number of stories returned per page.
- *Total-Pages*: The total number of pages available.

</div>

<div>

```json
{
  "stories": [
    {
      "id": 123456,
      "name": "Home",
      "slug": "home",
      "full_slug": "home", // The full path to the story
      "content": { // The actual content defined by your components
        "_uid": "d4e3c2b1-a0f9-8e7d-6c5b-4a3b2c1d0e9f",
        "component": "page",
        "body": [ /* ... array of block objects ... */ ]
      },
      "published_at": "2024-01-15T10:00:00.000Z",
      "created_at": "2024-01-10T09:00:00.000Z",
      "uuid": "c2b1a0f9-8e7d-6c5b-4a3b2c1d0e9f8d7c",
    }
    // ... more story objects
  ],
  "cv": 1705320000, // Cache version
  "rels": [], // Resolved relations if requested
  "links": [] // Resolved links if requested
}
```

</div>

</div>

---

# Useful Query Parameters 🔍

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

## Content Filtering:
```javascript
// Filter by folder
?starts_with=blog

// Filter by component type
?filter_query[component][in]=blog_post,article

// Full-text search in specific attributes
?search_term=javascript&filter_query[title][like]=*javascript*
```

## Content Resolution:
```javascript
// Resolve relations
?resolve_relations=author,category

// Resolve links (e.g., story links, asset links)
?resolve_links=story|url|asset

// Specify which relation fields to resolve (e.g., 'author_bio' field which links to an 'author' story)
?resolve_relations=post.author_bio,featured_articles.author
```

</div>

<div>

## Example Combined Query:
```javascript
const CAPI_BASE_URL = 'https://api.storyblok.com/v2/cdn';
const YOUR_TOKEN = 'your_preview_or_public_token';

const params = new URLSearchParams({
  token: YOUR_TOKEN,
  starts_with: 'blog/',
  per_page: '10',
  page: '1',
  sort_by: 'content.publication_date:desc',
  resolve_relations: 'post.author,post.category',
  filter_query: JSON.stringify({
    'content.tags': {
      'in_array': 'tech'
    }
  }),
  version: 'published' // or 'draft'
});

const url = `${CAPI_BASE_URL}/stories?${params.toString()}`;
```

</div>

</div>

---
layout: new-section
sectionImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0'
---

# Part 2: Symfony Integration

Building powerful applications with the Storyblok Symfony Bundle

---

# Why Symfony + Storyblok? 🤝

<div class="grid grid-cols-2 gap-8 pt-8">

<div>

## Symfony Strengths:
- **Mature framework** - Battle-tested
- **Developer experience** - Great tooling
- **Performance** - Built for scale
- **Flexibility** - Adapts to your needs
- **Community** - Strong ecosystem

## Storyblok Benefits:
- **Visual editing** - Content team friendly
- **API-first** - Headless flexibility
- **Developer-friendly** - JSON structure
- **Scalable** - Enterprise-ready
- **Multi-channel** - Web, mobile, IoT

</div>

<div>

## Perfect Together:

✅ **Rapid development** - Get started quickly\
✅ **Content-driven** - Dynamic experiences\
✅ **Team efficiency** - Developers + editors\
✅ **Performance** - Cached, optimized\
✅ **Maintainable** - Clean architecture\
✅ **Scalable** - Grows with your needs

<div class="pt-6 text-center">

**Let's build something amazing! 🚀**

</div>

</div>

</div>

---

# Getting Started: Installation 📦

Setting up Storyblok in your Symfony project is straightforward.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## 1. Create Symfony Project

```bash
symfony new my-storyblok-app
cd my-storyblok-app
```

## 2. Install Storyblok Bundle

```bash
composer require \
  storyblok/php-content-api-client \
  storyblok/symfony-bundle
```

**Symfony Flex** automatically configures everything!

</div>

<div>

## 3. Environment Configuration

Add to your `.env` file:

```bash
###> storyblok/symfony-bundle ###
STORYBLOK_API_BASE_URI=https://api.storyblok.com
STORYBLOK_API_TOKEN=your_access_token
###< storyblok/symfony-bundle ###
```

## 4. Enable Routes

`config/routes/storyblok.yaml`:
```yaml
storyblok_webhook:
    resource: '@StoryblokBundle/config/routes/webhook.php'

storyblok_content_type:
    resource: '@StoryblokBundle/config/routes/content_type.php'
```

</div>

</div>

---

# Configuration Deep Dive ⚙️

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Basic Configuration

`config/packages/storyblok.yaml`:
```yaml
storyblok:
    base_uri: '%env(STORYBLOK_API_BASE_URI)%'
    token: '%env(STORYBLOK_API_TOKEN)%'
    auto_resolve_relations: true
    version: published # or draft
```

## Advanced Options

```yaml
storyblok:
    # ... basic config
    controller:
        cache:
            public: true
            max_age: 3600
            smax_age: 3600
            must_revalidate: true
        ascending_redirect_fallback: true
    blocks_template_path: 'blocks'
```

</div>

<div>

## Key Configuration Options:

- **`auto_resolve_relations`** - Automatically resolve linked content
- **`version`** - Use `draft` for preview, `published` for production
- **`cache`** - HTTP caching directives
- **`ascending_redirect_fallback`** - Graceful 404 handling
- **`blocks_template_path`** - Custom template directory

## Environment-Specific

```yaml
when@prod:
    storyblok:
        controller:
            cache:
                public: true
                max_age: 3600
```

</div>

</div>

---

# Creating Content Types 📄

<div class="grid grid-cols-2 gap-8 pt-2">

<div>

## Page Content Type

`src/ContentType/Page.php`:
```php
<?php

declare(strict_types=1);

namespace App\ContentType;

use Storyblok\Bundle\ContentType\ContentType;

final readonly class Page extends ContentType
{
    public string $uuid;
    public string $name;
    public string $slug;
    public array $body;
    public \DateTimeImmutable $publishedAt;

    public function __construct(array $values)
    {
        $this->uuid = $values['uuid'];
        $this->name = $values['name'];
        $this->slug = $values['full_slug'];
        $this->body = $values['content']['body'] ?? [];
        $this->publishedAt = new \DateTimeImmutable(
            $values['published_at']
        );
    }
}
```

</div>

<div>

## Best Practices:

✅ Use `readonly` for immutability\
✅ Type hint everything\
✅ Handle optional fields gracefully\
✅ Add helper methods for complex logic\
✅ Keep constructors simple

*Content Types are the foundation of your Storyblok-Symfony app!*

</div>

</div>

---

# Content Type Controllers 🎮

Controllers handle HTTP requests for your content types using attributes.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Page Controller

`src/Controller/PageController.php`:
```php
<?php

namespace App\Controller;

use App\ContentType\Page;
use Storyblok\Bundle\ContentType\Attribute\AsContentTypeController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[AsContentTypeController(contentType: Page::class)]
final class PageController extends AbstractController
{
    public function __invoke(Request $request, Page $page): Response
    {
        return $this->render('page.html.twig', [
            'page' => $page,
        ]);
    }
}
```

</div>

<div>

## Controller Features:

- **Automatic registration** - No manual routing
- **Dependency injection** - Page object injected
- **Type safety** - Full IDE support
- **Flexible responses** - Return any Response

## Specialized Controllers:

```php
#[AsContentTypeController(
    contentType: Page::class,
    slug: 'legal/imprint'
)]
final class ImprintController
{
    public function __invoke(Request $request): Response
    {
        // Handle specific slug differently
        return new Response('Legal imprint page');
    }
}
```

*Specific slug controllers override generic ones!*

</div>

</div>

---

# Creating Blocks 🧱

Blocks are reusable components that can be nested and combined.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Teaser Block

`src/Block/Teaser.php`:
```php
<?php

namespace App\Block;

use Storyblok\Bundle\Block\Attribute\AsBlock;

#[AsBlock(name: 'teaser', template: 'blocks/teaser.html.twig')]
final readonly class Teaser
{
    public string $headline;
    public string $description;

    public function __construct(array $values)
    {
        $this->headline = $values['headline'] ?? '';
        $this->description = $values['description'] ?? '';
    }
}
```

</div>

<div>

## Feature Block

`src/Block/Feature.php`:
```php
#[AsBlock(name: 'feature')]
final readonly class Feature
{
    public string $name;
    public bool $highlighted;

    public function __construct(array $values)
    {
        $this->name = $values['name'] ?? '';
        $this->highlighted = $values['highlighted'] ?? false;
    }
}
```

</div>

</div>

---

# More Blocks & Features 🔧

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Grid Block

`src/Block/Grid.php`:
```php
#[AsBlock(name: 'grid')]
final readonly class Grid
{
    public array $columns;

    public function __construct(array $values)
    {
        $this->columns = $values['columns'] ?? [];
    }
}
```

</div>

<div>

## Block Features:

- **Automatic registration** - `#[AsBlock]` attribute
- **Template mapping** - Defaults to `blocks/{name}.html.twig`
- **Nested content** - Blocks can contain other blocks
- **Type safety** - Full PHP typing support

## Custom Template Path:

```yaml
# config/packages/storyblok.yaml
storyblok:
    blocks_template_path: 'components'
```

</div>

</div>

---

# Templates & Rendering 🎨

Twig templates bring your content to life with the `render_block` filter.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Base Template

`templates/base.html.twig`:
```twig
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Storyblok App{% endblock %}</title>
    {% block stylesheets %}{% endblock %}
</head>
<body>
    <div class="container">
        {% block body %}{% endblock %}
    </div>
    {% block javascripts %}{% endblock %}
</body>
</html>
```

</div>

<div>

## Page Template

`templates/page.html.twig`:
```twig
{% extends 'base.html.twig' %}

{% block title %}{{ page.name }}{% endblock %}

{% block body %}
    <h1>{{ page.name }}</h1>

    {% for block in page.body %}
        {% if block is not null %}
            {{ block|render_block }}
        {% endif %}
    {% endfor %}
{% endblock %}
```

**The `render_block` filter handles all the magic! ✨**

</div>

</div>

---

# Block Templates 🎭

Creating templates for your blocks with clean, semantic markup.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Teaser Block Template

`templates/blocks/teaser.html.twig`:
```twig
<div class="teaser">
    <h2>{{ block.headline }}</h2>
    <p>{{ block.description }}</p>
</div>
```

</div>

<div>

## Feature Block Template

`templates/blocks/feature.html.twig`:
```twig
<div class="feature {{ block.highlighted ? 'featured' : '' }}">
    <span>{{ block.name }}</span>
</div>
```

</div>

</div>

---

# Nested Block Rendering 🔄

The Grid block demonstrates how to render nested blocks automatically.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Grid Block Template

`templates/blocks/grid.html.twig`:
```twig
<div class="grid">
    {% for column in block.columns %}
        <div class="grid-column">
            {{ column|render_block }}
        </div>
    {% endfor %}
</div>
```

**Nested blocks are rendered recursively!**

</div>

<div>

## How It Works:

- **Grid contains columns** - Each column is a block
- **Recursive rendering** - `render_block` calls itself
- **Infinite nesting** - Blocks can contain other blocks
- **Type safety** - Each block has its own template
- **Clean markup** - Semantic HTML structure

## Benefits:

✅ **Flexible layouts** - Any combination possible\
✅ **Reusable components** - Mix and match blocks\
✅ **Editor-friendly** - Visual drag-and-drop\
✅ **Developer-friendly** - Clean, maintainable code

</div>

</div>

---

# Routing & Homepage Handling 🛣️

Handle routing patterns and homepage redirects elegantly.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Homepage Controller

`src/Controller/HomepageController.php`:
```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Attribute\Route;

final class HomepageController extends AbstractController
{
    #[Route('/', name: 'homepage', priority: 100)]
    public function index(): RedirectResponse
    {
        return $this->redirectToRoute(
            'storyblok_content_type',
            ['slug' => 'home']
        );
    }
}
```

This redirects `/` to `/home` where your Storyblok content lives.

</div>

<div>

## Routing Features:

- **Automatic routes** - Content Type controllers get routes
- **Dynamic slugs** - Based on Storyblok full_slug
- **Internationalization** - Multi-language URLs
- **Fallback handling** - Graceful 404s with `ascending_redirect_fallback`

## Route Structure:

```
/ → /home (redirect)
/home → PageController
/about → PageController
/blog/my-post → BlogPostController
/products/shoes → ProductController
```

**Routes are generated automatically based on Storyblok content structure! 🔄**

</div>

</div>

---

# Rich Text Rendering 📝

Handle rich text content with the built-in Twig filter.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Rich Text Field

In your Content Type:
```php
final readonly class Article extends ContentType
{
    public array $richTextContent;

    public function __construct(array $values)
    {
        $this->richTextContent = $values['content']['rich_text'] ?? [];
    }
}
```

## Template Usage

```twig
<div class="article-content">
    {{ article.richTextContent|rich_text }}
</div>
```

**That's it! The filter handles all TipTap rendering. ✨**

</div>

<div>

## Rich Text Features:

- **TipTap integration** - Modern rich text editor
- **Block rendering** - Embedded Storyblok blocks work automatically
- **HTML output** - Clean, semantic markup
- **Extensible** - Add custom node types

</div>

</div>

---

# Rich Text JSON Structure 📋

Understanding the TipTap document format for rich text content.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Example Rich Text JSON:

```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "This is rich text with "
        },
        {
          "type": "text",
          "text": "bold text",
          "marks": [{"type": "bold"}]
        }
      ]
    }
  ]
}
```

</div>

<div>

## JSON Structure:

- **Document root** - `type: "doc"`
- **Content array** - Contains all nodes
- **Paragraph nodes** - Text containers
- **Text nodes** - Actual content
- **Marks array** - Formatting (bold, italic, etc.)

## Supported Elements:

✅ **Headings** - H1 through H6\
✅ **Paragraphs** - Regular text\
✅ **Lists** - Ordered and unordered\
✅ **Links** - Internal and external\
✅ **Images** - From Storyblok assets\
✅ **Blocks** - Embedded components

</div>

</div>

---

# Visual Editor Setup ⚙️

Configure your Symfony project for visual preview with Storyblok.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## 1. Configure Storyblok Settings

In Storyblok: **Settings > Visual Editor**

Set default environment to your local dev server:
```
https://localhost:8000
```

💡 **HTTPS required** - Use Symfony CLI:
```bash
symfony server:start
```

## 2. Set Story Real Path

Open your home story → **Config** → Set **Real path** to `/`

</div>

<div>

## 3. Environment Configuration

Set draft mode for development:

`.env.dev`:
```bash
STORYBLOK_VERSION=draft
```

`config/packages/storyblok.yaml`:
```yaml
storyblok:
    version: '%env(STORYBLOK_VERSION)%'
```

## Benefits:

✅ **Real-time editing** - See changes instantly\
✅ **HTTPS support** - Secure connection\
✅ **Environment-specific** - Draft vs published

</div>

</div>

---

# Visual Editor Bridge 🌉

Implement the EditableInterface for interactive content editing.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Update Your Blocks

Make blocks implement `EditableInterface`:

```php
<?php

namespace App\Block;

use Storyblok\Api\Domain\Type\Editable;
use Storyblok\Bundle\Block\Attribute\AsBlock;
use Storyblok\Bundle\Editable\EditableInterface;
use Storyblok\Bundle\Editable\EditableTrait;

#[AsBlock(name: 'teaser')]
final readonly class Teaser implements EditableInterface
{
    use EditableTrait;

    public function __construct(array $values)
    {
        $editable = null;
        if (\array_key_exists('_editable', $values)) {
            $editable = new Editable($values['_editable']);
        }
        $this->editable = $editable;

        // Your existing properties...
    }
}
```

</div>

<div>

## Update Content Types

Same pattern for content types:

```php
<?php

namespace App\ContentType;

use Storyblok\Bundle\ContentType\ContentType;
use Storyblok\Bundle\Editable\EditableInterface;
use Storyblok\Bundle\Editable\EditableTrait;

final readonly class Page extends ContentType
    implements EditableInterface
{
    use EditableTrait;

    public function __construct(array $values)
    {
        $editable = null;
        if (\array_key_exists('_editable', $values)) {
            $editable = new Editable($values['_editable']);
        }
        $this->editable = $editable;

        // Your existing constructor logic...
    }
}
```

</div>

</div>

---

# Bridge Scripts & Attributes 🔗

Connect your templates to the visual editor.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Add Bridge Scripts

In your base template:

```twig
<!DOCTYPE html>
<html>
<head>
    <!-- ... -->
</head>
<body>
    <!-- ... -->

    {% block storyblok_scripts %}
        {{ storyblok_js_bridge_scripts() }}
    {% endblock %}
</body>
</html>
```

The `storyblok_js_bridge_scripts()` function:
- Automatically loads bridge only in draft mode
- Handles script loading and initialization
- No manual script tags needed!

</div>

<div>

## Use Storyblok Attributes

Make content editable with the filter:

```twig
<div {{ page|storyblok_attributes }}>
    <h1>{{ page.name }}</h1>

    {% for block in page.body %}
        <div {{ block|storyblok_attributes }}>
            {{ block|render_block }}
        </div>
    {% endfor %}
</div>
```

The `storyblok_attributes` filter:
- Adds `data-blok-c` and `data-blok-uid` attributes
- Only active in draft mode
- Makes content click-to-edit

**🎉 That's it! Your content is now editable in the visual editor!**

</div>

</div>

---

# Internationalization 🌍

Handle multi-language content with Storyblok's field-level translation.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Setup in Storyblok

**1. Add Languages**
- Go to **Settings** > **Internationalization** > **Languages**
- Add languages like `it` (Italian), `es` (Spanish), etc.

**2. Configure Content Types**
- In your content type schema
- Set fields as **translatable** (title, content, etc.)
- Use AI Translations for quick setup

**3. Create Translated Content**
- Edit each story
- Select target language
- Provide translated content

</div>

<div>

## Multilingual Routing

`config/routes/storyblok.yaml`:
```yaml
storyblok_webhook:
    resource: '@StoryblokBundle/config/routes/webhook.php'

storyblok_content_type:
    resource: '@StoryblokBundle/config/routes/content_type.php'
    prefix:
        # Order matters (first match wins)
        it: '/it'
        es: '/es'
        en: ''  # Default language, no prefix
```

**URL Examples:**
- `/home` → English (default)
- `/it/home` → Italian
- `/es/home` → Spanish

</div>

</div>

---

# Using Locale in Controllers 🗣️

Access current locale in your controllers and templates.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Controller Usage

```php
<?php

namespace App\Controller;

use App\ContentType\Page;
use Storyblok\Bundle\ContentType\Attribute\AsContentTypeController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[AsContentTypeController(contentType: Page::class)]
final class PageController extends AbstractController
{
    public function __invoke(Request $request, Page $page): Response
    {
        $locale = $request->getLocale(); // Current locale

        return $this->render('page.html.twig', [
            'page' => $page,
            'locale' => $locale,
        ]);
    }
}
```

</div>

<div>

## Template Usage

```twig
{% extends 'base.html.twig' %}

{% block body %}
    <div class="locale-indicator">
        Current language: {{ locale|upper }}
    </div>

    <h1>{{ page.name }}</h1>

    {% for block in page.body %}
        <div {{ block|storyblok_attributes }}>
            {{ block|render_block }}
        </div>
    {% endfor %}
{% endblock %}
```

## Features:

✅ **Automatic routing** - Bundle handles locale detection\
✅ **Content fetching** - Right language content loaded\
✅ **Fallback support** - Default language if missing\
✅ **SEO-friendly** - Clean URLs with locale prefixes

</div>

</div>

---

# Content Modeling 📝

Learn to handle different content types, references, and API interactions.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Article Content Type

`src/ContentType/Article.php`:
```php
<?php

namespace App\ContentType;

use Storyblok\Bundle\ContentType\ContentType;

final readonly class Article extends ContentType
{
    public string $uuid;
    public string $name;
    public string $slug;
    public string $title;
    public array $content;
    public \DateTimeImmutable $publishedAt;

    public function __construct(array $values)
    {
        $this->uuid = $values['uuid'];
        $this->name = $values['name'];
        $this->slug = $values['full_slug'];
        $this->title = $values['content']['title'] ?? '';
        $this->content = $values['content']['content'] ?? [];
        $this->publishedAt = new \DateTimeImmutable(
            $values['published_at']
        );
    }
}
```

</div>

<div>

## Article Controller

`src/Controller/ArticleController.php`:
```php
<?php

namespace App\Controller;

use App\ContentType\Article;
use Storyblok\Bundle\ContentType\Attribute\AsContentTypeController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[AsContentTypeController(contentType: Article::class)]
final class ArticleController extends AbstractController
{
    public function __invoke(Request $request, Article $article): Response
    {
        return $this->render('article.html.twig', [
            'article' => $article,
        ]);
    }
}
```

## Article Template

`templates/article.html.twig`:
```twig
{% extends 'base.html.twig' %}

{% block title %}{{ article.title }}{% endblock %}

{% block body %}
    <article>
        <h1>{{ article.title }}</h1>
        <div class="content">
            {{ article.content|rich_text }}
        </div>
    </article>
{% endblock %}
```

</div>

</div>

---

# Content Lists & API Usage 📋

Fetch and display collections of content using the Stories API.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Article Overview Controller

`src/Controller/ArticleOverviewController.php`:
```php
<?php

namespace App\Controller;

use App\ContentType\ArticleOverview;
use Storyblok\Api\StoriesApiInterface;
use Storyblok\Api\Request\StoriesRequest;
use Storyblok\Bundle\ContentType\Attribute\AsContentTypeController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[AsContentTypeController(contentType: ArticleOverview::class)]
final class ArticleOverviewController extends AbstractController
{
    public function __construct(
        private readonly StoriesApiInterface $storiesApi
    ) {
    }

    public function __invoke(
        Request $request,
        ArticleOverview $articleOverview
    ): Response {
        $response = $this->storiesApi->allByContentType(
            'article',
            new StoriesRequest(language: $request->getLocale())
        );

        return $this->render('article_overview.html.twig', [
            'articleOverview' => $articleOverview,
            'articles' => $response->stories,
        ]);
    }
}
```

</div>

<div>

## Article Overview Template

`templates/article_overview.html.twig`:
```twig
{% extends 'base.html.twig' %}

{% block title %}Articles{% endblock %}

{% block body %}
    <h1>Articles</h1>
    <ul>
        {% for article in articles %}
            {% if article.full_slug is defined %}
                <li>
                    <a href="/{{ article.full_slug }}">
                        {{ article.name }}
                    </a>
                </li>
            {% endif %}
        {% endfor %}
    </ul>
{% endblock %}
```

## Key Features:

✅ **API Injection** - Use `StoriesApiInterface`\
✅ **Type filtering** - Get content by type\
✅ **Locale support** - Automatic language handling\
✅ **Template loops** - Display collections easily

</div>

</div>

---

# Story References & Relations 🔗

Handle referenced stories with automatic relation resolution.

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Featured Articles Block

`src/Block/FeaturedArticles.php`:
```php
<?php

namespace App\Block;

use Storyblok\Bundle\Block\Attribute\AsBlock;

#[AsBlock(name: 'featured-articles')]
final readonly class FeaturedArticles
{
    public array $articles;

    public function __construct(array $values)
    {
        $this->articles = $values['articles'] ?? [];
    }
}
```

## Block Template

`templates/blocks/featured_articles.html.twig`:
```twig
<section class="featured-articles">
    <h2>Featured Articles</h2>
    <ul>
        {% for article in block.articles %}
            {% if article.full_slug is defined %}
                <li>
                    <a href="/{{ article.full_slug }}">
                        {{ article.name }}
                    </a>
                </li>
            {% endif %}
        {% endfor %}
    </ul>
</section>
```

</div>

<div>

## Resolve Relations in Controller

Update PageController to handle references:
```php
use Storyblok\Api\StoriesApiInterface;
use Storyblok\Api\Request\StoryRequest;
use Storyblok\Api\Domain\Value\Resolver\RelationCollection;

#[AsContentTypeController(contentType: Page::class)]
final class PageController extends AbstractController
{
    public function __construct(
        private readonly StoriesApiInterface $storiesApi
    ) {
    }

    public function __invoke(Request $request, Page $page): Response
    {
        // Resolve featured article references
        $response = $this->storiesApi->bySlug(
            $page->slug,
            new StoryRequest(
                language: $request->getLocale(),
                withRelations: new RelationCollection([
                    'featured-articles.articles'
                ])
            )
        );

        $resolvedPage = new Page($response->story);

        return $this->render('page.html.twig', [
            'page' => $resolvedPage,
        ]);
    }
}
```

**⚠️ Limit: Maximum 50 relations per request**

</div>

</div>

---

# Advanced Features 🚀

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## Webhooks

Handle content changes automatically:

```php
<?php

namespace App\Webhook;

use Storyblok\Bundle\Webhook\Event;
use Storyblok\Bundle\Webhook\Handler\WebhookHandlerInterface;

final class CachePurgeHandler implements WebhookHandlerInterface
{
    public function handle(Event $event, array $payload): void
    {
        // Clear cache when content changes
        if ($event->equals(Event::StoryPublished)) {
            $this->cachePool->clear();
        }
    }

    public function supports(Event $event): bool
    {
        return $event->equalsOneOf([
            Event::StoryPublished,
            Event::StoryUnpublished,
            Event::StoryDeleted,
        ]);
    }
}
```

</div>

<div>

## Caching Strategy

```yaml
# config/packages/storyblok.yaml
when@prod:
    storyblok:
        controller:
            cache:
                public: true
                max_age: 3600
                smax_age: 3600
                must_revalidate: true
```

## Performance Tips:

✅ **Enable HTTP caching** in production\
✅ **Use webhooks** to invalidate cache\
✅ **Resolve relations** selectively\
✅ **Optimize images** with Storyblok Image Service\
✅ **Use CDN** for static assets

## Debugging:

- **Symfony Profiler** integration included
- **API request logging** built-in
- **Cache debugging** tools available

</div>

</div>

---

# Best Practices 💡

<div class="grid grid-cols-2 gap-8 pt-6">

<div>

## 🏗️ Architecture:

- **Separation of concerns** - Content Types, Blocks, Controllers
- **Type safety** - Use PHP 8+ features
- **Immutability** - Readonly properties
- **Single responsibility** - One purpose per class

## 🚀 Performance:

- **HTTP caching** - Essential for production
- **Selective relations** - Only resolve what you need
- **Image optimization** - Use Storyblok Image Service
- **CDN integration** - Serve assets globally

## 🔒 Security:

- **Environment variables** - Keep tokens secure
- **Webhook signatures** - Verify incoming requests
- **Input validation** - Never trust external data

</div>

<div>

## 🎯 Content Strategy:

- **Component reusability** - Design for flexibility
- **Content modeling** - Think about relationships
- **Editor experience** - Make it intuitive
- **Preview environments** - Test before publishing

## 🧪 Testing:

```php
class PageControllerTest extends WebTestCase
{
    public function testHomePage(): void
    {
        $client = static::createClient();
        $client->request('GET', '/home');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Home');
    }
}
```

## 📈 Monitoring:

- **Symfony Profiler** - Development debugging
- **API rate limits** - Monitor usage
- **Error tracking** - Catch issues early

</div>

</div>

---

# What We Built Today 🎉

<div class="grid grid-cols-2 gap-8 pt-8">

<div>

## Part 1 Achievements:

✅ **Mastered Storyblok concepts**
- Stories, Blocks, and Field Types
- Visual Editor understanding
- API structure and responses
- Relations and internationalization

✅ **API expertise gained**
- Content Delivery API endpoints
- Query parameters and filtering
- Response structure knowledge

</div>

<div>

## Part 2 Achievements:

✅ **Built a complete Symfony app**
- Bundle installation and setup
- Content Types and Controllers
- Blocks and Templates
- Dynamic routing

✅ **Advanced features implemented**
- Visual Editor integration
- Rich text rendering
- Caching and performance
- Best practices applied

</div>

</div>

<div class="pt-8 text-center">

**🚀 You now have the skills to build production-ready Storyblok + Symfony applications!**

</div>

---

# Next Steps & Resources 📚

<div class="grid grid-cols-2 gap-8 pt-8">

<div>

## 📖 Learn More

**Storyblok Resources:**
- [Official Documentation](https://www.storyblok.com/docs)
- [API Reference](https://www.storyblok.com/docs/api)
- [Community Forum](https://www.storyblok.com/community)
- [GitHub Examples](https://github.com/storyblok)

**Symfony Resources:**
- [Symfony Documentation](https://symfony.com/doc)
- [Bundle Repository](https://github.com/storyblok/symfony-bundle)
- [SensioLabs](https://sensiolabs.com)

</div>

<div>

## 🛠️ Start Building

**Your next project could include:**
- Multi-language content sites
- E-commerce with dynamic content
- Corporate websites with CMS
- Landing page builders
- API-driven applications

**Advanced Topics to Explore:**
- Custom field types
- Advanced caching strategies
- Microservice architectures
- GraphQL integration
- Mobile app APIs

</div>

</div>

<div class="pt-8 text-center">

**Thank you for joining us! 🙏**

*Questions? Let's discuss your implementation ideas!*

</div>

---
layout: center
class: text-center
---

# Questions & Answers 🙋‍♀️

Ready to build amazing content-driven applications?

<div class="pt-8 text-lg opacity-75">
Let's explore the limitless possibilities of Storyblok + Symfony!
</div>

<div class="pt-6">
**Edoardo Dusi** - Storyblok • **Silas Joisten** - SensioLabs
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://storyblok.com" target="_blank" alt="Storyblok" title="Visit Storyblok"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    🚀
  </a>
</div>
