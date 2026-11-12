import Input from './Input'

const PersonForm = (props) => {
  const onSubmit = (event) => {
    event.preventDefault()
    props.onSubmit()
  }

  return (
      <form onSubmit={onSubmit}>
        <Input
            text='name:'
            value={props.name}
            onChange={props.onNameChange}
        />
        <Input
            text='number:'
            value={props.number}
            onChange={props.onNumberChange}
        />
        <button type="submit">add</button>
      </form>
  )
}

export default PersonForm
