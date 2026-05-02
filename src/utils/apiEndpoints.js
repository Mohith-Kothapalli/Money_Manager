const BASE_URL = 'http://localhost:8080/api/v1.0';

const CC_name="dl6djl1mt";

const API_ENDPOINTS = {
    LOGIN: '/login',
    REGISTER: '/register',
    GET_USER_INFO:"/profile",
    GET_API_CATEGORIES:"/categories",
    ADD_CATEGORIES:"/categories",
    UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES:"/incomes",
    CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
    ADD_INCOMES:"/incomes",
    DELETE_INCOME:(incomeId)=>`/incomes/${incomeId}`,
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSES: "/expenses",
    APPYL_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CC_name}/image/upload`
}

export { BASE_URL, API_ENDPOINTS };