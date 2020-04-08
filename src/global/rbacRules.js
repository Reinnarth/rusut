const rules = {
  student: {
    static: [
      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "semester-page:visit",
      "library-page:visit",
    ],
    dynamic: {
      "posts:list": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
      "posts:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  teacher: {
    static: [
      "posts:list",
      "posts:create",
      "users:getSelf",
      "home-page:visit",
      "semester-page:visit",
      "library-page:visit",
    ],
    dynamic: {
      "posts:edit": ({ userId, postOwnerId }) => {
        if (!userId || !postOwnerId) return false;
        return userId === postOwnerId;
      },
    },
  },
  admin: {
    static: [
      "posts:list",
      "posts:create",
      "posts:edit",
      "posts:delete",
      "users:get",
      "users:getSelf",
      "home-page:visit",
      "semester-page:visit",
      "library-page:visit",
    ],
  },
};

export default rules;
