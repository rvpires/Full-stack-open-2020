import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [details, setDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const toggleDetails = () => {
    if (details === true) {
      setDetails(false)
      setButtonText('view')
    }

    else if (details === false) {
      setDetails(true)
      setButtonText('hide')
    }
  }

  const showWhenVisible = { display: details ? '' : 'none' }


  return (


    <div style={blogStyle}>
      
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{buttonText}</button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url} </p>
        <p>{blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>

    </div>

  )
}

export default Blog
