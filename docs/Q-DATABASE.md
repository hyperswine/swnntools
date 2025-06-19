# Q-Database Documentation

## Overview
The Q-Database is a modern, Firebase-powered knowledge management system built with Next.js, React, and Tailwind CSS. It provides a clean, searchable interface for managing your personal knowledge base with full CRUD capabilities.

## Features

### 🔍 **Search & Filter**
- **Real-time search**: Search across titles, descriptions, and tags
- **Advanced sorting**: Sort by newest, oldest, title (A-Z), or recently updated
- **Keyboard shortcut**: Press `Ctrl+K` (or `Cmd+K` on Mac) to focus the search input

### 📝 **Entry Management**
- **Create entries**: Add new knowledge entries with title, description, and tags
- **Edit entries**: Update existing entries with inline editing
- **Delete entries**: Remove entries with confirmation dialog
- **Keyboard shortcut**: Press `Ctrl+N` (or `Cmd+N` on Mac) to create a new entry

### 🏷️ **Tagging System**
- **Flexible tags**: Add multiple tags separated by commas
- **Tag display**: Shows up to 4 tags per card, with overflow indicator
- **Tag search**: Search functionality includes tag matching

### 🎨 **Modern UI/UX**
- **Responsive grid**: Adapts from 1 column on mobile to 4 columns on large screens
- **Smooth animations**: Hover effects, transitions, and loading states
- **Skeleton loading**: Beautiful loading placeholders while data loads
- **Empty states**: Helpful messaging when no entries exist or search returns no results

## Data Structure

Each entry in the database contains:
- **id**: Unique identifier (auto-generated)
- **title**: Entry title (required)
- **description**: Entry description (optional)
- **tags**: Array of tags (optional)
- **createdAt**: Creation timestamp
- **updatedAt**: Last modification timestamp

## Firebase Setup

The application uses Firestore with the collection name `qdb`. Make sure your Firebase configuration is properly set up in:
- `lib/firebase.ts`
- Environment variables for Firebase config

### Required Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

## Usage Tips

1. **Creating Entries**: Click "Add Entry" or use `Ctrl+N` to quickly create new entries
2. **Organizing with Tags**: Use descriptive tags to categorize your knowledge (e.g., "javascript", "tutorial", "reference")
3. **Searching**: Use the search bar to find entries by any text in title, description, or tags
4. **Sorting**: Use the sort dropdown to organize entries by date or alphabetically
5. **Editing**: Hover over any card to see edit/delete buttons, or click to edit inline

## Keyboard Shortcuts

- `Ctrl+K` / `Cmd+K`: Focus search input
- `Ctrl+N` / `Cmd+N`: Create new entry
- `Escape`: Close dialog windows

## Technical Details

### Components Used
- **UI Components**: Shadcn/ui components for consistent design
- **Icons**: Lucide React icons
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React hooks (useState, useEffect)
- **Database**: Firebase Firestore

### Performance Features
- **Optimistic updates**: UI updates immediately, syncs with database
- **Efficient queries**: Firestore queries with proper indexing
- **Responsive design**: Mobile-first approach with breakpoint-based layouts
- **Loading states**: Skeleton screens during data fetching

## Future Enhancements

Potential features for future development:
- [ ] Export functionality (JSON, CSV)
- [ ] Import from other formats
- [ ] Full-text search with highlighting
- [ ] Categories/folders organization
- [ ] Collaboration features
- [ ] Advanced filtering options
- [ ] Data analytics and insights
- [ ] Offline support with sync

## Troubleshooting

### Common Issues
1. **Firebase connection errors**: Check environment variables and Firebase configuration
2. **Search not working**: Ensure proper text normalization and filtering logic
3. **Styling issues**: Verify Tailwind CSS classes and component imports

### Development
- Run `pnpm dev` to start the development server
- Visit `http://localhost:3000/q-database` to access the interface
- Check browser console for any errors or warnings
