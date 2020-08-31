export const APP_DATA = {
  TOKEN_EXPIRE_TIME: 3600,
  ROLE_USER_ID: 3,
  GMAP_IMAGE_URL: 'https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=20&size=400x400&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=XXX',
  GMAP_USER_KEY: 'XXX',

  TOASTER_DEFAULTS: {
    timeOut: 10000,
    positionClass: "toast-bottom-center",
    preventDuplicates: true,
    progressBar: true,
    progressAnimation: "decreasing"
  }
}

export const ALL_ROLES = {
  ROLE_ADMIN: 'admin',
  ROLE_USER: 'user'
};

export const AVAILABLE_ROUTES = {
  USER: [
    "/login",
    "/register",
    "/projects",
    "/projects/list",
    "/projects/create",
    "/projects/view/",
    "/purchase"
  ],

  ADMIN:[
    "/admin"
  ]
}


export const DEFAULT_PAGES = {
  USER: "/projects",
  ADMIN: "/admin"
}

export const TOASTER_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning"
}

export const APP_MSGS = {
  ERROR: {
    UNAUTHORIZED_ENTRY: "Unauthorized entry..",
    SOMETHING_WENT_WRONG: "Something went wrong..",
    FAILED_TO_COLLECT_DATA: "Failed to collect data..",
    FAILED_TO_CREATE_PROJECT: "Failed to create project..",
    NO_RESULTS_FOUND: "No results found",

    GEO_FAILED_REASON: "Geocoder failed due to: "
  },
  SUCCESS: {
    REGISTRATION_DONE: "Successfully Registered..",
    PROJECT_RETREIVED_DONE: "Project retrived successfully..",
    PROJECT_CREATED_DONE: "Project created successfully..",
    PAYMENT_DONE: "Payment successfull.."
  }
}