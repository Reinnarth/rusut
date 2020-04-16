const rules = {
  ROLE_USER: {
    static: ["waiting-page:visit"],
  },
  ROLE_STUDENT: {
    static: [
      "users:getSelf",
      "users:editSelf",
      "home-page:visit",
      "semester-page:visit",
      "library-page:visit",
      "learning-activities-page:visit",
      "learning-activities:add",
      "subjects-page:visit",
    ],
    dynamic: {
      "learning-activities:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      "learning-activities:delete": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  ROLE_TEACHER: {
    static: [
      "users:getSelf",
      "users:editSelf",
      "semester:setMark",
      "home-page:visit",
      "semester-page:visit",
      "library-page:visit",
      "library:add",
      "learning-activities-page:visit",
      "subjects-page:visit",
    ],
    dynamic: {
      "library:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      "library:delete": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      "semester:changeMark": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  ROLE_ADMIN: {
    static: [
      "users:getSelf",
      "users:editSelf",
      "users:get",
      "users:edit",
      "users:delete",
      "users:changeStudyGroup",
      "home-page:visit",
      "semester-page:visit",
      "library-page:visit",
      "library:add",
      "library:edit",
      "library:delete",
      "roles:edit",
      "studygroup:edit",
      "learning-activities-page:visit",
      "learning-activities:edit",
      "learning-activities:delete",
      "subjects-page:visit",
      "subjects:add",
      "subjects:edit",
      "subjects:delete",
      "admin-page:visit",
    ],
  },
};

export default rules;
