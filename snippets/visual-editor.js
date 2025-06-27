/**
 * Visual Editor Integration for Storyblok
 * Enables live editing and preview capabilities
 */

class VisualEditor {
  constructor(token) {
    this.token = token
    this.isEditorMode = this.checkEditorMode()
    this.initializeBridge()
  }

  /**
   * Check if we're in Storyblok editor mode
   * @returns {boolean}
   */
  checkEditorMode() {
    if (typeof window === 'undefined') return false
    
    return window.location.search.includes('_storyblok') ||
           window.location.search.includes('_storyblok_tk') ||
           window.parent !== window
  }

  /**
   * Initialize the Storyblok bridge for live editing
   */
  initializeBridge() {
    if (!this.isEditorMode) return

    // Load the bridge script if not already loaded
    if (!window.storyblok) {
      this.loadBridgeScript()
    } else {
      this.setupBridge()
    }
  }

  /**
   * Dynamically load the Storyblok bridge script
   */
  loadBridgeScript() {
    const script = document.createElement('script')
    script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js'
    script.onload = () => this.setupBridge()
    document.head.appendChild(script)
  }

  /**
   * Setup the bridge communication
   */
  setupBridge() {
    if (!window.storyblok) return

    // Initialize the bridge
    window.storyblok.init({
      accessToken: this.token
    })

    // Listen for content changes
    window.storyblok.on(['change', 'published'], (event) => {
      console.log('Content changed:', event)
      this.handleContentChange(event)
    })

    // Listen for real-time input changes
    window.storyblok.on('input', (event) => {
      console.log('Real-time input:', event)
      this.handleRealtimeInput(event)
    })

    // Listen for story loading
    window.storyblok.on('enterEditmode', (event) => {
      console.log('Entered edit mode:', event)
      this.handleEnterEditMode(event)
    })

    console.log('Storyblok Visual Editor initialized')
  }

  /**
   * Handle content changes (draft saves, publishing)
   * @param {Object} event - Event data
   */
  handleContentChange(event) {
    if (event.action === 'change') {
      // Update the page content without reload
      this.updatePageContent(event.story.content)
    } else if (event.action === 'published') {
      // Optionally reload for published content
      window.location.reload()
    }
  }

  /**
   * Handle real-time input changes
   * @param {Object} event - Event data
   */
  handleRealtimeInput(event) {
    if (!event.story?.content) return

    // Update content in real-time
    this.updatePageContent(event.story.content)
  }

  /**
   * Handle entering edit mode
   * @param {Object} event - Event data
   */
  handleEnterEditMode(event) {
    // Add visual indicators for editable areas
    this.highlightEditableAreas()
    
    // Show editor-specific UI elements
    this.showEditorUI()
  }

  /**
   * Update page content dynamically
   * @param {Object} content - New content data
   */
  updatePageContent(content) {
    // Find all elements with data-blok-uid attributes
    const editableElements = document.querySelectorAll('[data-blok-uid]')
    
    editableElements.forEach(element => {
      const uid = element.getAttribute('data-blok-uid')
      const componentData = this.findComponentByUid(content, uid)
      
      if (componentData) {
        this.updateElementContent(element, componentData)
      }
    })
  }

  /**
   * Find component by UID in nested content structure
   * @param {Object} content - Content object
   * @param {string} uid - Component UID
   * @returns {Object|null} Component data
   */
  findComponentByUid(content, uid) {
    if (content._uid === uid) {
      return content
    }

    // Search in body array
    if (content.body && Array.isArray(content.body)) {
      for (const item of content.body) {
        const found = this.findComponentByUid(item, uid)
        if (found) return found
      }
    }

    // Search in other potential nested structures
    for (const key in content) {
      if (typeof content[key] === 'object' && content[key] !== null) {
        if (Array.isArray(content[key])) {
          for (const item of content[key]) {
            if (typeof item === 'object' && item._uid) {
              const found = this.findComponentByUid(item, uid)
              if (found) return found
            }
          }
        } else if (content[key]._uid) {
          const found = this.findComponentByUid(content[key], uid)
          if (found) return found
        }
      }
    }

    return null
  }

  /**
   * Update element content with new data
   * @param {HTMLElement} element - DOM element
   * @param {Object} componentData - New component data
   */
  updateElementContent(element, componentData) {
    const componentType = componentData.component

    switch (componentType) {
      case 'hero':
        this.updateHeroComponent(element, componentData)
        break
      case 'text_block':
        this.updateTextComponent(element, componentData)
        break
      case 'image_block':
        this.updateImageComponent(element, componentData)
        break
      case 'blog_post':
        this.updateBlogPostComponent(element, componentData)
        break
      default:
        this.updateGenericComponent(element, componentData)
    }
  }

  /**
   * Update hero component
   * @param {HTMLElement} element - DOM element
   * @param {Object} data - Component data
   */
  updateHeroComponent(element, data) {
    const titleEl = element.querySelector('[data-field="title"]')
    const subtitleEl = element.querySelector('[data-field="subtitle"]')
    const imageEl = element.querySelector('[data-field="background_image"]')

    if (titleEl && data.title) {
      titleEl.textContent = data.title
    }
    if (subtitleEl && data.subtitle) {
      subtitleEl.textContent = data.subtitle
    }
    if (imageEl && data.background_image?.filename) {
      imageEl.src = data.background_image.filename
      imageEl.alt = data.background_image.alt || ''
    }
  }

  /**
   * Update text component
   * @param {HTMLElement} element - DOM element
   * @param {Object} data - Component data
   */
  updateTextComponent(element, data) {
    const textEl = element.querySelector('[data-field="text"]')
    if (textEl && data.text) {
      textEl.innerHTML = data.text
    }
  }

  /**
   * Update image component
   * @param {HTMLElement} element - DOM element
   * @param {Object} data - Component data
   */
  updateImageComponent(element, data) {
    const imgEl = element.querySelector('img')
    if (imgEl && data.image?.filename) {
      imgEl.src = data.image.filename
      imgEl.alt = data.image.alt || ''
    }
  }

  /**
   * Update blog post component
   * @param {HTMLElement} element - DOM element
   * @param {Object} data - Component data
   */
  updateBlogPostComponent(element, data) {
    const titleEl = element.querySelector('[data-field="title"]')
    const contentEl = element.querySelector('[data-field="content"]')
    const authorEl = element.querySelector('[data-field="author"]')

    if (titleEl && data.title) {
      titleEl.textContent = data.title
    }
    if (contentEl && data.content) {
      contentEl.innerHTML = data.content
    }
    if (authorEl && data.author?.name) {
      authorEl.textContent = data.author.name
    }
  }

  /**
   * Generic component update fallback
   * @param {HTMLElement} element - DOM element
   * @param {Object} data - Component data
   */
  updateGenericComponent(element, data) {
    // Update all elements with data-field attributes
    const fieldElements = element.querySelectorAll('[data-field]')
    
    fieldElements.forEach(fieldEl => {
      const fieldName = fieldEl.getAttribute('data-field')
      if (data[fieldName]) {
        if (fieldEl.tagName === 'IMG') {
          if (typeof data[fieldName] === 'object' && data[fieldName].filename) {
            fieldEl.src = data[fieldName].filename
            fieldEl.alt = data[fieldName].alt || ''
          }
        } else {
          fieldEl.textContent = data[fieldName]
        }
      }
    })
  }

  /**
   * Highlight editable areas in the editor
   */
  highlightEditableAreas() {
    const editableElements = document.querySelectorAll('[data-blok-uid]')
    
    editableElements.forEach(element => {
      element.style.outline = '2px dashed #00b3b0'
      element.style.outlineOffset = '2px'
      element.setAttribute('title', 'Click to edit in Storyblok')
    })
  }

  /**
   * Show editor-specific UI elements
   */
  showEditorUI() {
    // Add visual indicators that we're in edit mode
    const indicator = document.createElement('div')
    indicator.id = 'storyblok-editor-indicator'
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #00b3b0;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-family: sans-serif;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `
    indicator.textContent = '✏️ Edit Mode Active'
    document.body.appendChild(indicator)
  }

  /**
   * Add editor attributes to an element
   * @param {HTMLElement} element - DOM element
   * @param {Object} componentData - Component data
   * @returns {HTMLElement} Enhanced element
   */
  static addEditorAttributes(element, componentData) {
    if (!componentData || !componentData._uid) return element

    element.setAttribute('data-blok-c', JSON.stringify(componentData))
    element.setAttribute('data-blok-uid', componentData._uid)
    
    return element
  }

  /**
   * Create a Storyblok-ready element
   * @param {string} tagName - HTML tag name
   * @param {Object} componentData - Component data
   * @param {Object} attributes - Additional attributes
   * @returns {HTMLElement} Enhanced element
   */
  static createElement(tagName, componentData, attributes = {}) {
    const element = document.createElement(tagName)
    
    // Add regular attributes
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })

    // Add Storyblok editor attributes if in editor mode
    if (componentData && componentData._uid) {
      VisualEditor.addEditorAttributes(element, componentData)
    }

    return element
  }

  /**
   * Utility to check if we're in preview mode
   * @returns {boolean}
   */
  static isPreviewMode() {
    return typeof window !== 'undefined' && 
           window.location.search.includes('_storyblok_tk')
  }

  /**
   * Utility to get the appropriate version parameter
   * @returns {string}
   */
  static getVersion() {
    return VisualEditor.isPreviewMode() || this.checkEditorMode() ? 'draft' : 'published'
  }
}

export default VisualEditor