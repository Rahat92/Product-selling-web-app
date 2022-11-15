const CreateReviewForm = ({ sendReview }) => {
  return (
    <form onSubmit={sendReview}>
      <table>
        <tr>
          <td>Comment</td>
          <td><input required style={{width: '100%'}} placeholder='What do you think about this product?' type= 'text' name = 'review' /></td>
        </tr>
        <tr>
          <td>Rating</td>
          <td><input required style={{width:'100%'}} placeholder='review' type= 'number' min='3' max= '5' name = 'rating' /></td>
        </tr>
        <tr>
          <td colSpan= {2}><input style={{width: '100%'}} type="submit" value="save" /></td>
        </tr>
      </table>
    </form>
  )
}
export default CreateReviewForm