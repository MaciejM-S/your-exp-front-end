import axios from "axios"
import { baseUrl } from ".."


const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
}

export default function addComment(comment, setCommentError, commentsId, setUploadingComment, setComment, setDate) {
  
  if (!comment) {
    setCommentError('enter a comment')
    return setUploadingComment(false)
  }

  axios.post(baseUrl + '/addComment', { comment, commentsId }, config).then(
    () => {
      setUploadingComment(false)
      setCommentError('you have added comment')
      setComment('')
      setDate(new Date().getTime());
    }
  )



}