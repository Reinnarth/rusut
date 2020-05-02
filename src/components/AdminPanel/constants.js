export const menuTabs = [
  {
    path: "/admin/users",
    tabs: [
      {
        label: "Users",
        name: "users",
      },
      {
        label: "Students",
        name: "students",
      },
      {
        label: "Student groups",
        name: "groups",
      },
      {
        label: "Teachers",
        name: "teachers",
      },
    ],
  },
  {
    path: "/admin/library",
    tabs: [
      {
        label: "Books",
        name: "books",
      },
      {
        label: "Authors",
        name: "authors",
      },
      {
        label: "Subject",
        name: "subject",
      },
    ],
  },
  {
    path: "/admin/learning-activities",
    tabs: [
      {
        label: "Articles",
        name: "articles",
      },
      {
        label: "Courseworks",
        name: "courseworks",
      },
      {
        label: "Practice",
        name: "practice",
      },
    ],
  },
];

export const roles = [
  {
    nameRole: "ROLE_USER",
    tab: "users",
  },
  {
    nameRole: "ROLE_STUDENT",
    tab: "students",
  },
  {
    nameRole: "ROLE_TEACHER",
    tab: "teachers",
  },
  {
    nameRole: "ROLE_ADMIN",
    tab: "admins",
  },
];
