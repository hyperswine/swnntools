import { db } from './firebase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'

export interface Category {
  id: string
  name: string
  objects: string[]
  morphisms: Morphism[]
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface Morphism {
  id: string
  from: string
  to: string
  name: string
}

export interface Functor {
  id: string
  name: string
  source: string
  target: string
  objectMap: Record<string, string>
  morphismMap: Record<string, string>
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

const CATEGORIES_COLLECTION = 'categories'
const FUNCTORS_COLLECTION = 'functors'

// Category persistence functions
export const saveCategory = async (category: Category): Promise<void> => {
  try {
    const categoryDoc = doc(db, CATEGORIES_COLLECTION, category.id)
    await setDoc(categoryDoc, {
      ...category,
      updatedAt: serverTimestamp()
    }, { merge: true })
  } catch (error) {
    console.error('Error saving category:', error)
    throw error
  }
}

export const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const categoryDoc = doc(db, CATEGORIES_COLLECTION, id)
    const docSnap = await getDoc(categoryDoc)

    if (docSnap.exists()) {
      return docSnap.data() as Category
    }
    return null
  } catch (error) {
    console.error('Error getting category:', error)
    throw error
  }
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categoriesCollection = collection(db, CATEGORIES_COLLECTION)
    const querySnapshot = await getDocs(categoriesCollection)

    return querySnapshot.docs.map(doc => doc.data() as Category)
  } catch (error) {
    console.error('Error getting categories:', error)
    throw error
  }
}

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const categoryDoc = doc(db, CATEGORIES_COLLECTION, id)
    await deleteDoc(categoryDoc)
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}

// Functor persistence functions
export const saveFunctor = async (functor: Functor): Promise<void> => {
  try {
    const functorDoc = doc(db, FUNCTORS_COLLECTION, functor.id)
    await setDoc(functorDoc, {
      ...functor,
      updatedAt: serverTimestamp()
    }, { merge: true })
  } catch (error) {
    console.error('Error saving functor:', error)
    throw error
  }
}

export const getFunctor = async (id: string): Promise<Functor | null> => {
  try {
    const functorDoc = doc(db, FUNCTORS_COLLECTION, id)
    const docSnap = await getDoc(functorDoc)

    if (docSnap.exists()) {
      return docSnap.data() as Functor
    }
    return null
  } catch (error) {
    console.error('Error getting functor:', error)
    throw error
  }
}

export const getAllFunctors = async (): Promise<Functor[]> => {
  try {
    const functorsCollection = collection(db, FUNCTORS_COLLECTION)
    const querySnapshot = await getDocs(functorsCollection)

    return querySnapshot.docs.map(doc => doc.data() as Functor)
  } catch (error) {
    console.error('Error getting functors:', error)
    throw error
  }
}

export const deleteFunctor = async (id: string): Promise<void> => {
  try {
    const functorDoc = doc(db, FUNCTORS_COLLECTION, id)
    await deleteDoc(functorDoc)
  } catch (error) {
    console.error('Error deleting functor:', error)
    throw error
  }
}

// Bulk operations
export const saveAllData = async (categories: Category[], functors: Functor[]): Promise<void> => {
  try {
    const savePromises = [
      ...categories.map(category => saveCategory(category)),
      ...functors.map(functor => saveFunctor(functor))
    ]

    await Promise.all(savePromises)
  } catch (error) {
    console.error('Error saving all data:', error)
    throw error
  }
}

export const loadAllData = async (): Promise<{ categories: Category[], functors: Functor[] }> => {
  try {
    const [categories, functors] = await Promise.all([
      getAllCategories(),
      getAllFunctors()
    ])

    return { categories, functors }
  } catch (error) {
    console.error('Error loading all data:', error)
    throw error
  }
}
