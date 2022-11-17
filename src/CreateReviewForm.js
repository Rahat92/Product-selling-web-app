const CreateReviewForm = ({ sendReview }) => {
  return (
    <div style={{padding:'0 2rem 1.5rem', marginTop:'0rem'}}>
      <form onSubmit={sendReview}>
      <table>
        <tr>
          <td>Comment</td>
          <td style={{ }}><input required style={{padding:'.3rem'}} placeholder="What's on your mind?" type= 'text' name = 'review' /></td>
        </tr>
        <tr>
          <td>Rating</td>
          <td style={{}}><input required style={{width:'100%', padding:'.3rem', boxSizing:'border-box', margin:'0'}} placeholder='Rating' type= 'number' min='3' max= '5' name = 'rating' /></td>
        </tr>
        <tr>
          <td></td>
          <td><input style={{}} type="submit" value="save" /></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </form>
    </div>
  )
}
export default CreateReviewForm