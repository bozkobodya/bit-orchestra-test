import {localStorageFormEmailKey, localStorageFormNameKey} from "../../../utils/constants";

const textConstants = {
    title: 'Leave a Review',
    subTitle: 'Your email address will not be published. Required fields are marked *',
    commentInputPlaceholder: 'Comment *',
    nameInputPlaceholder: 'Name *',
    emailItInputPlaceholder: 'Email *',
    phoneItInputPlaceholder: 'Phone (optional)',
    saveFromDataInBrowser: 'Save my name, email, and website in this browser for the next time I comment',
    submit: 'POST REVIEW'
};
const textareaMinRows = 3;

const generateInitialFormData = () => (
    {
        name: localStorage.getItem(localStorageFormNameKey) ?? '',
        email: localStorage.getItem(localStorageFormEmailKey) ?? '',
        comment: '',
        phone: ''
    }
);

export { textConstants, textareaMinRows, generateInitialFormData };