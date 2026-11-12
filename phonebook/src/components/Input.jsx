const Input = ({ text, value, onChange }) => {
  return (
      <div>
        {`${text} `}
        <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
      </div>
  )
}

export default Input
