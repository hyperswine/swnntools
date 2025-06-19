"use client"

import React, { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Search, Plus, Edit2, Trash2, X, ArrowUpDown, Calendar, SortAsc } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface QdbEntry {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface EntryFormData {
  title: string
  description: string
  tags: string
}

type SortOption = 'newest' | 'oldest' | 'title' | 'updated'

export default function QDatabasePage() {
  const [entries, setEntries] = useState<QdbEntry[]>([])
  const [filteredEntries, setFilteredEntries] = useState<QdbEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<QdbEntry | null>(null)
  const [formData, setFormData] = useState<EntryFormData>({
    title: '',
    description: '',
    tags: ''
  })

  // Load entries from Firebase
  useEffect(() => {
    loadEntries()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k') {
          e.preventDefault()
          document.getElementById('search-input')?.focus()
        } else if (e.key === 'n') {
          e.preventDefault()
          setIsCreateDialogOpen(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Filter and sort entries based on search term and sort option
  useEffect(() => {
    let filtered = entries

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'updated':
          return b.updatedAt.getTime() - a.updatedAt.getTime()
        default:
          return 0
      }
    })

    setFilteredEntries(sorted)
  }, [entries, searchTerm, sortBy])

  const loadEntries = async () => {
    try {
      setIsLoading(true)
      const q = query(collection(db, 'qdb'), orderBy('updatedAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const entriesData: QdbEntry[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        entriesData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        })
      })

      setEntries(entriesData)
    } catch (error) {
      console.error('Error loading entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEntry = async () => {
    if (!formData.title.trim()) return

    try {
      const now = Timestamp.now()
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const docRef = await addDoc(collection(db, 'qdb'), {
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags,
        createdAt: now,
        updatedAt: now
      })

      const newEntry: QdbEntry = {
        id: docRef.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags,
        createdAt: now.toDate(),
        updatedAt: now.toDate()
      }

      setEntries([newEntry, ...entries])
      setFormData({ title: '', description: '', tags: '' })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating entry:', error)
    }
  }

  const handleUpdateEntry = async () => {
    if (!editingEntry || !formData.title.trim()) return

    try {
      const now = Timestamp.now()
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      await updateDoc(doc(db, 'qdb', editingEntry.id), {
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags,
        updatedAt: now
      })

      const updatedEntry: QdbEntry = {
        ...editingEntry,
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags,
        updatedAt: now.toDate()
      }

      setEntries(entries.map(entry =>
        entry.id === editingEntry.id ? updatedEntry : entry
      ))

      setFormData({ title: '', description: '', tags: '' })
      setEditingEntry(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating entry:', error)
    }
  }

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    try {
      await deleteDoc(doc(db, 'qdb', entryId))
      setEntries(entries.filter(entry => entry.id !== entryId))
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  }

  const openEditDialog = (entry: QdbEntry) => {
    setEditingEntry(entry)
    setFormData({
      title: entry.title,
      description: entry.description,
      tags: entry.tags.join(', ')
    })
    setIsEditDialogOpen(true)
  }

  const closeDialogs = () => {
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    setEditingEntry(null)
    setFormData({ title: '', description: '', tags: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Q-Database</h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage your knowledge base with searchable entries
          </p>
          {!isLoading && entries.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {searchTerm ? (
                <>Showing {filteredEntries.length} of {entries.length} entries</>
              ) : (
                <>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search and Add Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search-input"
            placeholder="Search entries by title, description, or tags... (Ctrl+K)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('newest')}>
                <Calendar className="mr-2 h-4 w-4" />
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                <Calendar className="mr-2 h-4 w-4" />
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('title')}>
                <SortAsc className="mr-2 h-4 w-4" />
                Title A-Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('updated')}>
                <Calendar className="mr-2 h-4 w-4" />
                Recently Updated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Entry
                <span className="text-xs opacity-60 ml-1">(Ctrl+N)</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter description..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Enter tags separated by commas..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={closeDialogs}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEntry} disabled={!formData.title.trim()}>
                    Create Entry
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter title..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description..."
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Enter tags separated by commas..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeDialogs}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEntry} disabled={!formData.title.trim()}>
                  Create Entry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Enter tags separated by commas..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={closeDialogs}>
                Cancel
              </Button>
              <Button onClick={handleUpdateEntry} disabled={!formData.title.trim()}>
                Update Entry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex gap-2 mb-3">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && entries.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No entries yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first entry to get started
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Entry
          </Button>
        </div>
      )}

      {/* No Search Results */}
      {!isLoading && entries.length > 0 && filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No matching entries</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms
          </p>
        </div>
      )}      {/* Entries Grid */}
      {!isLoading && filteredEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
              <CardHeader className="flex-shrink-0 pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {entry.title}
                  </CardTitle>
                  <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(entry)}
                      className="h-8 w-8 hover:bg-primary/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col pt-0">
                <CardDescription className="flex-grow mb-4 line-clamp-4 text-sm leading-relaxed">
                  {entry.description || (
                    <span className="italic text-muted-foreground/60">No description</span>
                  )}
                </CardDescription>

                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {entry.tags.slice(0, 4).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                    {entry.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{entry.tags.length - 4}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Timestamp */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Updated: {entry.updatedAt.toLocaleDateString()}</span>
                  <span className="text-muted-foreground/60">
                    {entry.createdAt.toLocaleDateString() !== entry.updatedAt.toLocaleDateString()
                      ? 'Modified'
                      : 'Created'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
