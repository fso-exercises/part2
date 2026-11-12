import Input from './Input'

const Filter = ({ query, onQueryChange }) => {
  return (
      <Input
          value={query}
          text='filter shown with'
          onChange={onQueryChange}
      />
  )
}

export default Filter
