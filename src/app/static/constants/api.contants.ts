export const SERVER_API_URL = 'http://localhost:8080';

export const AUTH_API = {
    BASE: `${SERVER_API_URL}/api/authenticate`
}

export const HH_AUTH_ADMIN = {
    BASE: `${SERVER_API_URL}/api/users`
}

export const HH_RESTAURANT = {
    BASE: `${SERVER_API_URL}/api/restaurants`
}

export const HH_ADDRESS = {
    BASE: `${SERVER_API_URL}/api/addresses`
}

export const HH_CUSTOMER = {
    BASE: `${SERVER_API_URL}/api/customers`,
    LOGIN: ` ${SERVER_API_URL}/api/customers/login`
}

export const HH_SOCIAL_MEDIA = {
    BASE: `${SERVER_API_URL}/api/social-medias`
}

export const HH_TIME_MANAGER = {
    BASE: `${SERVER_API_URL}/api/time-managers`
}

export const HH_STAFF = {
    BASE: `${SERVER_API_URL}/api/staff`,
    BYUSERID: `${SERVER_API_URL}/api/staff/user`,
    BYUSERACCOUNTID: `${SERVER_API_URL}/api/staff/user-id`
}

export const HH_STAFF_ACCOUNT = {
    BASE: `${SERVER_API_URL}/api/staff/account`,
}

export const HH_ACCOUNT = {
    BASE: `${SERVER_API_URL}/api/user`
}

export const HH_PRODUCT = {
    BASE: `${SERVER_API_URL}/api/products`,
    BYCATEGORY: `${SERVER_API_URL}/api/products/category`
}
export const HH_PRODUCT_TYPE = {
    BASE: `${SERVER_API_URL}/api/product-types`
}
export const HH_CATEGORY = {
    BASE: `${SERVER_API_URL}/api/categories`,
    BYPRODUCTYPE: `${SERVER_API_URL}/api/categories/ptype`
}

export const HH_CART = {
    BASE: `${SERVER_API_URL}/api/carts`,
    CHECKCART: `${SERVER_API_URL}/api/carts/exist`,
    BYCUTOMERID: `${SERVER_API_URL}/api/carts/customer`
}
// order
export const HH_ORDER = {
    BASE: `${SERVER_API_URL}/api/happy-orders`,
    BYSTATUSID: `${SERVER_API_URL}/api/happy-orders/status`
}

// Status
export const HH_COUPON = {
    BASE: `${SERVER_API_URL}/api/coupons`
}

// ORDER STATUS
export const HH_ORDER_STATUS = {
    BASE: `${SERVER_API_URL}/api/order-statuses`
}

// sale order
export const HH_SALE_ORDER = {
    BASE: `${SERVER_API_URL}/api/sale-orders`,
    BYORDERID: `${SERVER_API_URL}/api/sale-orders/order`
}
