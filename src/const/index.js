import { 
  delete_one_user_fail, 
  delete_one_user_request, 
  delete_one_user_success, 
  get_single_user_fail, 
  get_single_user_request, 
  get_single_user_success, 
  register_user_success, 
  register_user_request, 
  update_user_role_fail, 
  update_user_role_request, 
  update_user_role_success, 
  register_user_fail, 
  log_in_request,
  log_in_success,
  log_in_fail,
  log_out_request,
  log_out_success,
  log_out_fail
} from "../userConstant";
export const DELETE_ONE_USER_FAIL = delete_one_user_fail;
export const DELETE_ONE_USER_REQUEST = delete_one_user_request;
export const DELETE_ONE_USER_SUCCESS = delete_one_user_success;
export const GET_SINGLE_USER_FAIL = get_single_user_fail;
export const GET_SINGLE_USER_REQUEST = get_single_user_request;
export const GET_SINGLE_USER_SUCCESS = get_single_user_success;
export const REGISTER_USER_FAIL = register_user_fail;
export const REGISTER_USER_SUCCESS = register_user_success;
export const REGISTER_USER_REQUEST = register_user_request;
export const UPDATE_USER_ROLE_REQUEST = update_user_role_request;
export const UPDATE_USER_ROLE_SUCCESS = update_user_role_success;
export const UPDATE_USER_ROLE_FAIL = update_user_role_fail;

export const LOG_IN_REQUEST = log_in_request;
export const LOG_IN_SUCCESS = log_in_success;
export const LOG_IN_FAIL = log_in_fail;

export const LOG_OUT_REQUEST = log_out_request;
export const LOG_OUT_SUCCESS = log_out_success;
export const LOG_OUT_FAIL = log_out_fail;



export const increaseNum = 'INCREASE_NUMBER';
export const createUserReviewRequest = 'CREATE_USER_REVIEW_REQUEST';
export const createUserReviewSuccess = 'CREATE_USER_REVIEW_SUCCESS';
export const createUserReviewFail = 'CREATE_USER_REVIEW_FAIL';
export const decreaseNum = 'DECREASE_NUMBER';
export const fetchAllProduct = 'FETCH_ALL_PRODUCT';
export const deleteAProduct = 'DELETE_PRODUCT';
export const getAProduct = 'GET_PRODUCT';
export const editSingleProduct = 'eidt_single_product';
export const handleInputChange = 'handle_input_change';
export const createProduct = 'CREATE_NEW_PRODUCT';
export const createASingleProduct = 'CREATE_SINGLE_PRODUCT';
export const tracsortvalue = 'SORT_VALUE';
export const getMeRequest = 'GET_ME_REQUEST';
export const getMeSuccess = 'GET_ME_SUCCESS';
export const getMeFail = 'GET_ME_FAIL';
export const createMyReviewRequest = 'CREATE_MY_REVIEW_REQUEST';
export const createMyReviewSuccess = 'CREATE_MY_REVIEW_SUCCESS';
export const createMyReviewFail = 'CREATE_MY_REVIEW_FAIL';
export const getProductReviewRequest = 'GET_PRODUCT_REVIEW_REQUEST';
export const getProductReviewSuccess = 'GET_PRODUCT_REVIEW_SUCCESS';
export const getProductReviewFail = 'GET_PRODUCT_REVIEW_FAIL';
export const deleteReviewRequest = 'DELETE_REVIEW_REQUEST';
export const deleteReviewSuccess = 'DELETE_REVIEW_SUCCESS';
export const deleteReviewFail = 'DELETE_REVIEW_FAIL';
export const getAllActiveUserRequest = 'GET_ALL_ACTIVE_USER_REQUEST';
export const getAllActiveUserSuccess = 'GET_ALL_ACTIVE_USER_SUCCESS';
export const getAllActiveUserFail = 'GET_ALL_ACTIVE_USER_FAIL';
export const updateReviewRequest = 'UPDATE_REVIEW_REQUEST';
export const updateReviewSuccess = 'UPDATE_REVIEW_SUCCESS';
export const updateReviewFail = 'UPDATE_REVIEW_FAIL';
export const UPDATE_MY_PROFILE_REQUEST = 'UPDATE_MY_PROFILE_REQUEST';
export const UPDATE_MY_PROFILE_SUCCESS = 'UPDATE_MY_PROFILE_SUCCESS';
export const UPDATE_MY_PROFILE_FAIL = 'UPDATE_MY_PROFILE_FAIL';
export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAIL = 'EDIT_PRODUCT_FAIL';


////// for experiment////////
export const createProductNameAndPrice = 'CREATE_PRODUCT_NAME_AND_PRICE';
export const getProductNameAndPrice = 'GET_PRODUCT_NAME_AND_PRICE';
export const CLEARERROR = 'CLEARERROR'