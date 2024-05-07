const PersonForm = (props) => {
    return (
      <form onSubmit={props.submit}>
        <div>
          <input 
            placeholder='Name' 
            value={props.name}
            onChange={props.nameChange}  
          />
        </div>
        <div>
          <input 
            placeholder='Phone'
            value={props.phone}
            onChange={props.phoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
