export const menuTabs = [
  {
    path: "/admin/users",
    tabs: [
      {
        label: "Нераспределенные",
        name: "users",
      },
      {
        label: "Студенты",
        name: "students",
      },
      {
        label: "Преподаватели",
        name: "teachers",
      },
      {
        label: "Администраторы",
        name: "admins",
      },
    ],
  },
  {
    path: "/admin/library",
    tabs: [
      {
        label: "Книги",
        name: "library",
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
        label: "Статьи",
        name: "articles",
      },
      {
        label: "Курсовые",
        name: "courseworks",
      },
    ],
  },
  {
    path: "/admin/internships",
    tabs: [{ label: "Практики", name: "internships" }],
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
