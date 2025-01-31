import { createContext, useReducer } from "react"

const initialState = {
  capacity: '',
  maxPrice: '',
  startDate: '',
  endDate: '',
  selectedAmenities: [],
  isInitial: true,
  applied: false
}

export const FiltersContext = createContext()

const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'CAPACITY':
      return { ...state, capacity: action.payload, isInitial: false }
    case 'MAX_PRICE':
      return { ...state, maxPrice: action.payload, isInitial: false }
    case 'START_DATE':
      return { ...state, startDate: action.payload, isInitial: false }
    case 'END_DATE':
      return { ...state, endDate: action.payload, isInitial: false }
    case 'ADD_AMENITY':
      if(!state.selectedAmenities.includes(action.payload)) {
        return { ...state, selectedAmenities: [...state.selectedAmenities, action.payload], isInitial: false }
      }
    case 'REMOVE_AMENITY':
      return { ...state, selectedAmenities: state.selectedAmenities.filter(item => item !== action.payload), isInitial: false }
    case 'CLEAR_AMENITIES':
      return { ...state, selectedAmenities: [], isInitial: false }
    case 'RESET_FILTERS':
      return { ...initialState }
    case 'APPLIED':
      return { ...state, applied: action.payload }  
    default:
      return state
  } 
}

export function FiltersProvider({children}) {
  const [filters, dispatch] = useReducer(filtersReducer, initialState)
  
  const setCapacity = (capacity) => {
    dispatch({ type: 'CAPACITY', payload: capacity})
  }
  const setMaxPrice = (maxPrice) => {
    dispatch({ type: 'MAX_PRICE', payload: maxPrice })
  }
  const setStartDate = (startDate) => {
    dispatch({ type: 'START_DATE', payload: startDate })
  }
  const setEndDate = (endDate) => {
    dispatch({ type: 'END_DATE', payload: endDate })
  }
  const addAmenity = (item) => {
    dispatch({ type: 'ADD_AMENITY', payload: item })
  }
  const removeAmenity = (item) => {
    dispatch({ type: 'REMOVE_AMENITY', payload: item })
  }
  const clearAmenities = () => {
    dispatch({ type: 'CLEAR_AMENITIES' })
  }
  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }
  const setApplied = (applied) => {
    dispatch({ type: 'APPLIED', payload: applied })
  }
  
  return (
    <FiltersContext.Provider 
      value={{ filters,  setCapacity, setMaxPrice, setStartDate, setEndDate, addAmenity, 
                removeAmenity, clearAmenities, resetFilters, setApplied }}>
      { children }
    </FiltersContext.Provider>
  )
}