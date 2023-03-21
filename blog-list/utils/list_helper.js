const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const init = 0
  
  const sumOfLikes = likes.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    init
  );

  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)

  const result = likes.reduce(
    (iMax, currentValue, currentIndex, arr) =>
    currentValue > arr[iMax] ? currentIndex: iMax, 0
  ); 

  return(blogs[result])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}