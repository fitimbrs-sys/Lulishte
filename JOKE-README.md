# 🎭 Random Joke Generator

A modern, fun, and interactive joke generator web application that fetches random jokes from an external API with filtering options and local statistics tracking.

## ✨ Features

### Core Features
- **Random Joke Generator**: Fetch jokes from JokeAPI with just one click
- **Multiple Categories**: Choose from General, Programming, and Knock-Knock jokes
- **Joke Type Filter**: Filter between single-line and two-part jokes
- **Safe Mode**: Toggle to ensure jokes are family-friendly
- **Two-Part Jokes**: Hide/show punchlines for two-part jokes
- **Toast Notifications**: Real-time feedback for user actions

### User Features
- **Copy to Clipboard**: Easily copy jokes to share them
- **Share Functionality**: Share jokes directly using device sharing APIs
- **Joke History**: Keep track of last 20 jokes viewed
- **Statistics Tracking**: Monitor jokes fetched, copied, and shared
- **Local Storage**: All data persists between sessions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Technical Features
- **External API Integration**: Uses JokeAPI (https://jokeapi.dev/)
- **Error Handling**: Graceful error messages and fallbacks
- **Performance Optimized**: Lightweight, no heavy dependencies
- **Modern JavaScript**: ES6+ with async/await
- **Accessibility**: Semantic HTML and keyboard-friendly

## 🎨 Design

- **Color Scheme**: Purple and pink gradient theme
- **Smooth Animations**: Fade-in, slide-in, and smooth transitions
- **Modern UI**: Card-based layout with intuitive controls
- **Custom Scrollbar**: Styled scrollbar for history section
- **Interactive Buttons**: Hover effects and visual feedback

## 📁 Files

- **joke-generator.html** - Main HTML structure
- **joke-styles.css** - Complete styling and responsive design
- **joke-script.js** - JavaScript functionality and API integration
- **JOKE-README.md** - This documentation

## 🚀 How to Use

1. Open `joke-generator.html` in your web browser
2. Click "Get New Joke" to fetch a random joke
3. Use filters to customize joke selection:
   - **Category**: Choose between General, Programming, or Knock-Knock
   - **Type**: Filter by Single or Two-Part jokes
   - **Safe Mode**: Toggle for family-friendly content
4. **Show Punchline**: For two-part jokes, click to reveal the punchline
5. **Copy Joke**: Click the copy icon to copy to clipboard
6. **Share Joke**: Click the share icon to share via your device's share menu
7. **View History**: See last 20 jokes you've viewed
8. **Clear History**: Remove all jokes from history

## 🔌 API Integration

### JokeAPI
- **Base URL**: `https://v2.jokeapi.dev/joke`
- **Endpoints Used**:
  - `/Any` - Random joke from any category
  - `/{category}` - Jokes from specific category
- **Parameters**:
  - `type` - "single" or "twopart"
  - `safe-mode` - Filter explicit content

### Example API Call:
```javascript
fetch('https://v2.jokeapi.dev/joke/programming?type=single&safe-mode')
```

## 📊 Local Storage

The app uses localStorage to persist:

### Joke History
- Stores last 20 jokes viewed
- Key: `jokeHistory`
- Data: Array of joke objects with timestamps

### Statistics
- Stores user interaction counts
- Key: `jokeStats`
- Data: Object with jokesCount, copiedCount, sharedCount

## 🎯 Functions Reference

### Core Functions
```javascript
getJoke()                    // Fetch new joke based on filters
togglePunchline()           // Show/hide punchline for two-part jokes
copyJoke()                  // Copy current joke to clipboard
shareJoke()                 // Share joke via device share or clipboard
updateCategory()            // Update and fetch with new category
updateJokeType()           // Update and fetch with new type filter
toggleSafeMode()           // Toggle safe mode and fetch
```

### History Functions
```javascript
addToHistory(joke)         // Add joke to history
renderHistory()            // Render history list in UI
selectHistoryJoke(id)      // Load joke from history
clearHistory()             // Clear all history
saveHistory()              // Save history to localStorage
loadHistory()              // Load history from localStorage
```

### Statistics Functions
```javascript
updateStats(type)          // Increment statistics counter
renderStats()              // Update statistics display
saveStats()                // Save stats to localStorage
loadStats()                // Load stats from localStorage
```

### Utility Functions
```javascript
displayJoke(joke)          // Display joke in UI
displayErrorJoke()         // Display error message
showToast(message, type)   // Show toast notification
escapeHtml(text)           // Escape HTML special characters
```

## 🎨 Customization

### Change Colors
Edit the CSS variables in `joke-styles.css`:
```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #f093fb;
    /* ... more colors ... */
}
```

### Add New Categories
Update the category select in HTML:
```html
<select id="jokeCategory">
    <option value="knock-knock">Knock Knock</option>
    <option value="dark">Dark</option>
    <!-- Add more categories -->
</select>
```

### Modify API Endpoints
Change the API_BASE variable in JavaScript:
```javascript
const API_BASE = 'https://your-api-endpoint.com';
```

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with all features
- **Tablet** (≤768px): Optimized grid, touch-friendly buttons
- **Mobile** (≤480px): Single column layout, larger touch targets

## ⚡ Performance

- **No External Dependencies**: Pure HTML, CSS, JavaScript
- **Lightweight**: Only uses native browser APIs
- **Fast Loading**: Font Awesome loaded from CDN
- **Efficient Storage**: Limits history to 20 items
- **Smooth Animations**: GPU-accelerated CSS transitions

## 🔒 Security

- **Input Sanitization**: HTML escaping for all user content
- **Safe API Calls**: Uses fetch with error handling
- **No Sensitive Data**: Only stores public joke data locally
- **XSS Protection**: DOM methods prevent injection

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Limitations

- Requires internet connection for API calls
- JokeAPI might have rate limiting
- Some categories may have limited joke availability
- History limited to 20 items to manage storage

## 📈 Future Enhancements

- [ ] Favorite jokes feature
- [ ] Joke categories customization
- [ ] Dark mode theme
- [ ] Multiple language support
- [ ] Offline mode with cached jokes
- [ ] Advanced filtering (by difficulty, length)
- [ ] User ratings and reviews
- [ ] Custom joke submission
- [ ] Export jokes as PDF
- [ ] Social media integration

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Contributions are welcome!

## 📄 License

This project is free to use and modify for personal and commercial projects.

## 🔗 Resources

- [JokeAPI Documentation](https://jokeapi.dev/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Font Awesome Icons](https://fontawesome.com/)

---

Made with 😂 for joke lovers. **Get Your Daily Dose of Laughter!**