---
layout: cover
---

# Introduction Storyblok

---
layout: content
---

## What is a Story? 📄

A **Story** is a multi-purpose content entry, with each story's schema defined by its story type (e.g., page, article)

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

<v-clicks>

- **Unique URL slug** - `/about-us`, `/blog/my-post`
- **Content structure** - The story's component details and its field data
- **Metadata** - name, creation date, last published date, ...
- **Multilingual** - Support for multiple languages

</v-clicks>

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
layout: content
---

## What is a Block? 🧱

**Blocks** are reusable components. They can be entire content types (stories) or children of other blocks.

<div class="grid grid-cols-2 gap-8 pt-4">

<div class="mt-12">

<v-clicks>

1. **📝 Content Type Blocks** - post, article, page
2. **🎨 Nestable Blocks** - text, image, hero
3. **🔧 Universal Blocks** - forms, CTAs, authors

</v-clicks>

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
layout: content
---

## What is a Folder? 📂

---
layout: content
---

## What is a Content Type? 📑