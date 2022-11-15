const UpdateReviewForm = ({ updateMyReview, editReview, reviewEditCancel }) => {
  return (
    <form onSubmit={updateMyReview}>
      <table>
        <tr>
          <td>Update comment</td>
          <td><input style={{padding:'.3rem', width: '90%', color:'green', fontSize:'1.5rem', marginBottom:'1rem'}} type = 'text' name = 'review' defaultValue={editReview.review} /></td>
        </tr>
        <tr>
          <td>Update review</td>
          <td><input style={{padding:'.3rem', width: '90%', color:'green', fontSize:'1.5rem'}} type = 'number' min='3' max= '5' name='rating' defaultValue={editReview.rating}/></td>
        </tr>
        <tr>
          <td><button type = 'button' onClick={reviewEditCancel}>cancel</button></td>
          <td><input type = 'submit' value={'update'} /></td>
        </tr>
      </table>
      {/* <span style={{fontWeight:'700'}}>Update comment</span> &nbsp; &nbsp;
      <input style={{padding:'.3rem', color:'green', fontSize:'1.5rem', marginBottom:'1rem'}} type = 'text' name = 'review' defaultValue={editReview.review} /> <br />
      <span style={{fontWeight:'700'}}>Update review</span> &nbsp; &nbsp;
      <input style={{padding:'.3rem', color:'green', fontSize:'1.5rem'}} type = 'number' min='3' max= '5' name='rating' defaultValue={editReview.rating}/> <br />
      <button type = 'button' onClick={reviewEditCancel}>cancel</button>
      <input type = 'submit' value={'update'} /> */}
    </form>
  )
}
export default UpdateReviewForm;