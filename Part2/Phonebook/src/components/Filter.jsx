const Filter = ({ search, searchChange }) => {
    return (
      <input 
        placeholder='Search name' 
        value={search}
        onChange={searchChange}  
      />
    )
}

export default Filter
