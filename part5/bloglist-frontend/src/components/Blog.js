import React, { useState } from 'react'

const Blog = ({ blog , updateBlog}) => {

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

 
  const likeBlog = async (event) =>
	{
		event.preventDefault()
    
    const newBlog = blog

    newBlog.likes++
		console.log(newBlog)

		updateBlog(newBlog)

		

	}

  return (

    <div style={blogStyle}>
      
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{buttonText}</button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url} </p>
        <p>{blog.likes} <button onClick={likeBlog}>like</button></p>
        <p>{blog.author}</p>
      </div>

    </div>
  )
}

export default Blog
