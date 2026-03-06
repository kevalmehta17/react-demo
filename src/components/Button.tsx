
const Button = ({ type, label, onClick }) => {
  return (
    <div>
      <button type={type} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default Button
